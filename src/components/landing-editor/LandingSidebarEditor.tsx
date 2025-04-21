import { PencilRuler } from "lucide-react";

export function LandingSidebarEditor() {
  return (
    <div className="space-y-4 ">
      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
        <PencilRuler className="w-5 h-5" />
        Modifier le contenu
      </h3>
    </div>
  );
}
