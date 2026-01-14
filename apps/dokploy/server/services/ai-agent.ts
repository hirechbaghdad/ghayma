import { z } from 'zod';
import { OpenAI } from 'openai'; // Standard SDK (works with DeepSeek, Gemini via base_url too)
import { createProject } from '../controllers/project'; // Import actual Dokploy controllers
import { createService, deployService } from '../controllers/application';
import { getProjects } from '../controllers/project';

// 1. Setup the AI Client (Use Environment Variables)
const aiClient = new OpenAI({
  apiKey: process.env.AI_API_KEY, 
  baseURL: process.env.AI_BASE_URL || 'https://api.openai.com/v1', // Can be swapped for Gemini/Claude
});

// 2. Define the Tools (The functions the Agent can control)
const TOOLS = {
  get_projects: {
    definition: {
      type: 'function',
      function: {
        name: 'get_projects',
        description: 'List all existing projects to check for duplicates or context.',
        parameters: { type: 'object', properties: {} },
      },
    },
    handler: async () => {
      const projects = await getProjects();
      return JSON.stringify(projects.map(p => ({ id: p.id, name: p.name })));
    },
  },
  create_project: {
    definition: {
      type: 'function',
      function: {
        name: 'create_project',
        description: 'Create a new Project (folder) to hold services.',
        parameters: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'The name of the project (e.g., Atlanexis)' },
          },
          required: ['name'],
        },
      },
    },
    handler: async (args: { name: string }) => {
      return await createProject({ name: args.name });
    },
  },
  create_service_template: {
    definition: {
      type: 'function',
      function: {
        name: 'create_service_template',
        description: 'Deploy a service from a template (e.g., Odoo, PostgreSQL, Redis).',
        parameters: {
          type: 'object',
          properties: {
            projectId: { type: 'string', description: 'The ID of the project to deploy into.' },
            appName: { type: 'string', description: 'Name of the application.' },
            image: { type: 'string', description: 'Docker image (e.g., odoo:16, postgres:15).' },
          },
          required: ['projectId', 'appName', 'image'],
        },
      },
    },
    handler: async (args: any) => {
      // Logic to map template request to Dokploy's internal createService
      const service = await createService({
        name: args.appName,
        projectId: args.projectId,
        image: args.image,
        type: 'docker-image' // or 'template' if you strictly use Dokploy templates
      });
      return service;
    }
  },
  deploy_service: {
    definition: {
      type: 'function',
      function: {
        name: 'deploy_service',
        description: 'Trigger the deployment of a service after creation.',
        parameters: {
          type: 'object',
          properties: {
            serviceId: { type: 'string' }
          },
          required: ['serviceId']
        }
      }
    },
    handler: async (args: { serviceId: string }) => {
      return await deployService(args.serviceId);
    }
  }
};

// 3. The Main Agent Handler
export async function processAgentRequest(userMessage: string, conversationHistory: any[]) {
  // Construct the conversation
  const messages = [
    {
      role: 'system',
      content: `You are the Dokploy AI Agent. You manage a self-hosted PaaS. 
      Your goal is to help the user deploy apps, manage databases, and configure servers.
      
      RULES:
      1. If the user asks to create something, FIRST check if the project exists.
      2. ALWAYS summarize the plan before executing (e.g., "I will create Project 'X' and deploy 'Y'. Confirm?").
      3. Use the provided tools to execute actions when confirmed.
      4. Be concise and technical, act like a CLI terminal output.`
    },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ];

  // First Call: Decision Making
  const response = await aiClient.chat.completions.create({
    model: 'gpt-4o', // or gemini-2.0-flash
    messages: messages as any,
    tools: Object.values(TOOLS).map(t => t.definition) as any,
    tool_choice: 'auto',
  });

  const responseMessage = response.choices[0].message;

  // Check if Agent wants to run a tool
  if (responseMessage.tool_calls) {
    const toolCalls = responseMessage.tool_calls;
    
    // Execute Tools
    const toolResults = [];
    for (const tool of toolCalls) {
      const functionName = tool.function.name;
      const functionArgs = JSON.parse(tool.function.arguments);
      
      // Call the mapped handler
      // @ts-ignore
      const result = await TOOLS[functionName].handler(functionArgs);
      
      toolResults.push({
        tool_call_id: tool.id,
        role: 'tool',
        name: functionName,
        content: JSON.stringify(result),
      });
    }

    // Second Call: Report results back to user
    const finalResponse = await aiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [...messages, responseMessage, ...toolResults] as any,
    });

    return finalResponse.choices[0].message.content;
  }

  return responseMessage.content;
}