import {
  LayoutGrid,
  Users,
  Calendar,
  FileText,
  Settings,
  Github,
  BookOpen,
} from "lucide-react";

export const mainItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Students", href: "/students", icon: Users, badge: 24 },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const externalItems = [
  {
    label: "GitHub Repo",
    href: "https://github.com/bishalghale/bca-association",
    icon: Github,
  },
  {
    label: "Documentation",
    href: "https://docs.bca-association.com",
    icon: BookOpen,
  },
];
