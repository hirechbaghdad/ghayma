import { useState, type ReactElement } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ProjectSelectDialog } from "@/components/dashboard/marketplace/project-select-dialog";
import { api } from "@/utils/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch templates - assuming you have this endpoint
  const { data: templates, isLoading } = api.templates.all.useQuery(); 

  const filteredTemplates = templates?.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground">
          Deploy one-click templates to your projects.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search templates..."
          className="pl-8 md:w-[300px] lg:w-[400px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           {/* Simple skeleton loader */}
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates?.map((template) => (
            <Card key={template.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    {/* Assuming template has an image/logo */}
                    {template.logo && (
                        <img src={template.logo} alt={template.name} className="h-10 w-10 object-contain" />
                    )}
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <CardDescription className="line-clamp-3">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                    className="w-full" 
                    variant="secondary"
                    onClick={() => handleTemplateClick(template)}
                >
                  Create
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Logic to handle the deployment */}
      <ProjectSelectDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
}

MarketplacePage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};