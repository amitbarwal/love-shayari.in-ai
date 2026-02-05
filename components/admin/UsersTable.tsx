"use client";

import { useState } from "react";
import { User, Mail, Shield, MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UsersTable({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = useState(initialUsers);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-rose-50/50 border-b border-rose-100">
                        <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-rose-50/20 transition group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                                        {user.name?.charAt(0) || <User className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight",
                                    user.role === "ADMIN" ? "bg-rose-600 text-white" : "bg-rose-100 text-rose-600"
                                )}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 text-gray-400 hover:text-rose-600 transition rounded-lg hover:bg-white">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
