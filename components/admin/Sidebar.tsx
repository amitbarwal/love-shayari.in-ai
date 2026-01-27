"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, PlusCircle, FolderTree, Tags, Files, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "All Posts", href: "/admin/posts", icon: FileText },
    { name: "New Post", href: "/admin/posts/new", icon: PlusCircle },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Tags", href: "/admin/tags", icon: Tags },
    { name: "Pages", href: "/admin/pages", icon: Files },
    //   { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 overflow-y-auto border-r border-gray-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-rose-500">Admin CRM</h1>
                <p className="text-xs text-gray-400 mt-1">Love Shayari Blog</p>
            </div>
            <nav className="mt-6 px-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-rose-600 text-white"
                                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                    {/* Fallback user info until Auth is fully integrated */}
                    <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold">A</div>
                    <div>
                        <p className="font-medium text-white">Admin</p>
                        <p className="text-xs">Log out</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
