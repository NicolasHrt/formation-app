import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  const IconComponent = LucideIcons[name] as LucideIcon;
  return <IconComponent size={size} className={className} />;
}
