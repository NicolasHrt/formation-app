import { Layout } from "lucide-react";

interface Template {
  id: string;
  name: string;
}

const templates: Template[] = [
  {
    id: "default",
    name: "Classique",
  },
  {
    id: "modern",
    name: "Moderne",
  },
  {
    id: "minimal",
    name: "Minimaliste",
  },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
        <Layout className="w-5 h-5" />
        Choisir un template
      </h3>
      <select
        value={selectedTemplate}
        onChange={(e) => onTemplateChange(e.target.value)}
        className="w-full p-2 border rounded-lg"
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
