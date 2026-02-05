import { prisma } from "@/lib/prisma";
import { UsersTable } from "@/components/admin/UsersTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UsersPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "ADMIN") {
        redirect("/admin");
    }

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">Manage authors and administrators.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden">
                <UsersTable initialUsers={users} />
            </div>
        </div>
    );
}
