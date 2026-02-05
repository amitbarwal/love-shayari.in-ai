import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye, FileText, User as UserIcon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            category: true,
            author: {
                select: { name: true }
            }
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-gray-900">All Posts</h1>
                    <p className="text-gray-500 mt-1">Manage your blog articles, shayari, and jokes.</p>
                </div>
                <Link href="/admin/posts/new" className="bg-rose-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-rose-700 transition shadow-lg shadow-rose-100 font-bold">
                    <Plus className="w-5 h-5" />
                    New Post
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-rose-50/50 border-b border-rose-100">
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">Title & Author</th>
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-50">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-rose-50/20 transition group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-rose-300">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 group-hover:text-rose-600 transition truncate max-w-xs">{post.title}</div>
                                            <div className="text-xs text-gray-400 flex items-center gap-1">
                                                <UserIcon className="w-3 h-3" />
                                                {post.author?.name || "Anonymous"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-medium">{post.category.name}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight",
                                        post.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                    )}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/posts/${post.id}`} className="p-2 text-gray-400 hover:text-rose-600 transition rounded-lg hover:bg-white border border-transparent hover:border-rose-100">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <a href={`/blog/${post.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-rose-600 transition rounded-lg hover:bg-white border border-transparent hover:border-rose-100">
                                            <Eye className="w-4 h-4" />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-300">
                                        <FileText className="w-12 h-12" />
                                        <p className="font-medium">No posts found. Create your first shayari post!</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
