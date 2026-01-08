import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api } from "@/utils/api"; 
import { toast } from "sonner";
import { useRouter } from "next/router";

// Schema for creating a new project
const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
});

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTemplate: any; // Type this according to your Template interface
}

export const ProjectSelectDialog = ({ isOpen, onOpenChange, selectedTemplate }: Props) => {
  const router = useRouter();
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  // Queries and Mutations
  const { data: projects } = api.project.all.useQuery();
  const createProject = api.project.create.useMutation();
  // Assuming there is a mutation to deploy a template or create a service from it
  // You might need to adjust this mutation based on your existing codebase
  const deployTemplate = api.service.createFromTemplate.useMutation(); 

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleConfirm = async () => {
    try {
      let targetProjectId = selectedProjectId;

      // 1. If "Create New", create the project first
      if (mode === "new") {
        const values = form.getValues();
        if (!values.name) {
            form.setError("name", { message: "Name is required" });
            return;
        }
        
        const newProject = await createProject.mutateAsync({
          name: values.name,
          description: values.description,
        });
        targetProjectId = newProject.projectId;
      }

      if (!targetProjectId) {
        toast.error("Please select or create a project");
        return;
      }

      // 2. Deploy the template to the target project
      // Note: You might want to redirect to the project page instead if the template requires ENV configuration
      await deployTemplate.mutateAsync({
        projectId: targetProjectId,
        templateId: selectedTemplate.id,
        // Add other required fields from selectedTemplate
      });

      toast.success(`Template deployed to project!`);
      onOpenChange(false);
      
      // Redirect to the project to see the new service
      router.push(`/dashboard/projects/${targetProjectId}`);

    } catch (error: any) {
      toast.error(error.message || "Failed to deploy template");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deploy {selectedTemplate?.name}</DialogTitle>
          <DialogDescription>
            Choose where you want to deploy this template.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <RadioGroup 
            defaultValue="existing" 
            onValueChange={(v) => setMode(v as "existing" | "new")}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="existing" id="existing" className="peer sr-only" />
              <Label
                htmlFor="existing"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Existing Project
              </Label>
            </div>
            <div>
              <RadioGroupItem value="new" id="new" className="peer sr-only" />
              <Label
                htmlFor="new"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Create New
              </Label>
            </div>
          </RadioGroup>

          {mode === "existing" ? (
            <div className="flex flex-col gap-2">
              <Label>Select Project</Label>
              <Select onValueChange={setSelectedProjectId} value={selectedProjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects?.map((project) => (
                    <SelectItem key={project.projectId} value={project.projectId}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My New Project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            isLoading={createProject.isLoading || deployTemplate.isLoading}
          >
            Deploy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};