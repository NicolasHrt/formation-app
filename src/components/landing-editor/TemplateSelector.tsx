import { Layout } from "lucide-react";

interface Template {
  id: string;
  name: string;
  preview: string;
}

const templates: Template[] = [
  {
    id: "default",
    name: "Classique",
    preview: "/templates/default.png",
  },
  {
    id: "modern",
    name: "Moderne",
    preview: "/templates/modern.png",
  },
  {
    id: "minimal",
    name: "Minimaliste",
    preview: "/templates/minimal.png",
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
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`p-3 border rounded-lg text-left ${
              selectedTemplate === template.id
                ? "border-blue-500 bg-blue-50"
                : ""
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="aspect-video bg-gray-100 mb-2 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Preview</span>
            </div>
            <span className="font-medium">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
