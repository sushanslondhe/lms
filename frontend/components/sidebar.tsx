import Link from "next/link";
import { Home, Users, BookOpen, FileText } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-full border-r">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-semibold">Admin Panel</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            <SidebarItem
              href="/admin/dashboard"
              icon={<Home className="h-5 w-5" />}
              text="Dashboard"
            />
            <SidebarItem
              href="/admin/users"
              icon={<Users className="h-5 w-5" />}
              text="Users"
            />
            <SidebarItem
              href="/admin/learning-paths"
              icon={<BookOpen className="h-5 w-5" />}
              text="Learning Paths"
            />
            <SidebarItem
              href="/admin/modules"
              icon={<FileText className="h-5 w-5" />}
              text="Training Modules"
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
      >
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
}
