import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Section {
  id: string;
  title: string;
  fields: {
    id: string;
    label: string;
    type: "text" | "textarea" | "image";
  }[];
}

const sections: Section[] = [
  {
    id: "hero",
    title: "Section Hero",
    fields: [
      { id: "title", label: "Titre", type: "text" },
      { id: "subtitle", label: "Sous-titre", type: "textarea" },
      { id: "cta", label: "Bouton CTA", type: "text" },
    ],
  },
  {
    id: "benefits",
    title: "Avantages",
    fields: [
      { id: "title", label: "Titre de la section", type: "text" },
      { id: "items", label: "Liste des avantages", type: "textarea" },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    fields: [
      { id: "title", label: "Titre de la section", type: "text" },
      { id: "questions", label: "Questions/Réponses", type: "textarea" },
    ],
  },
  {
    id: "pricing",
    title: "Tarifs",
    fields: [
      { id: "title", label: "Titre de la section", type: "text" },
      { id: "plans", label: "Plans tarifaires", type: "textarea" },
    ],
  },
];

interface SidebarProps {
  selectedSection: string;
  onSectionSelect: (section: string) => void;
  content: any;
  onContentChange: (content: any) => void;
}

export function Sidebar({
  selectedSection,
  onSectionSelect,
  content,
  onContentChange,
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["hero"]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFieldChange = (
    sectionId: string,
    fieldId: string,
    value: string
  ) => {
    onContentChange({
      ...content,
      [sectionId]: {
        ...content[sectionId],
        [fieldId]: value,
      },
    });
  };

  return (
    <div className="space-y-4 ">
      {sections.map((section) => (
        <div key={section.id} className="border rounded-lg">
          <button
            className="w-full flex items-center justify-between p-3 bg-gray-50"
            onClick={() => toggleSection(section.id)}
          >
            <span className="font-medium">{section.title}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedSections.includes(section.id) ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSections.includes(section.id) && (
            <div className="p-3 space-y-3">
              {section.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full p-2 border rounded-md"
                      value={content[section.id]?.[field.id] || ""}
                      onChange={(e) =>
                        handleFieldChange(section.id, field.id, e.target.value)
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={content[section.id]?.[field.id] || ""}
                      onChange={(e) =>
                        handleFieldChange(section.id, field.id, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
