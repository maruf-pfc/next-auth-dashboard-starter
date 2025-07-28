import {
  LayoutDashboard,
  ClipboardList,
  Folder,
  FileText,
  File,
  Code2,
  Database,
  Settings,
  ServerCog,
  ListTodo,
  Boxes,
} from "lucide-react";

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isRoot: true,
    haveChildren: false,
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    isRoot: true,
    haveChildren: true,
    children: [
      {
        title: "General Tasks",
        url: "/tasks/general",
        icon: ListTodo, // ✅ Added icon
        isRoot: false,
        isChild: true,
        haveChildren: false,
      },
      {
        title: "Project Tasks",
        url: "/tasks/projects",
        icon: Boxes, // ✅ Added icon
        isRoot: false,
        haveChildren: true,
        children: [
          {
            title: "Frontend",
            url: "/tasks/projects/frontend",
            icon: Code2,
            isRoot: false,
            isChild: true,
            haveChildren: false,
          },
          {
            title: "Backend",
            url: "/tasks/projects/backend",
            icon: Database,
            isRoot: false,
            haveChildren: true,
            children: [
              {
                title: "DevOps",
                url: "/tasks/projects/backend/devops",
                icon: ServerCog,
                isRoot: false,
                haveChildren: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Resources",
    icon: Folder,
    haveChildren: true,
    isRoot: true,
    children: [
      {
        title: "Docs",
        url: "/resources/docs",
        icon: FileText,
        isRoot: false,
        haveChildren: false,
      },
      {
        title: "Files",
        url: "/resources/files",
        icon: File,
        isRoot: false,
        haveChildren: false,
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    isRoot: true,
    haveChildren: false,
  },
];
