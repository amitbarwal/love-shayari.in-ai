"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    Loader2,
    Image as ImageIcon,
    Search,
    Globe,
    Trash2,
    ChevronLeft
} from "lucide-react";
import Tiptap from "./Editor";
import { createPost, updatePost, deletePost } from "@/app/actions/posts";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PostForm({
    categories,
    initialData
}: {
    categories: { id: string, name: string }[],
    initialData?: any
}) {
    const isEditing = !!initialData;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        content: initialData?.content || "",
        excerpt: initialData?.excerpt || "",
        featuredImage: initialData?.featuredImage || "",
        seoTitle: initialData?.seoTitle || "",
        seoDesc: initialData?.seoDesc || "",
        published: initialData?.published ?? false,
        categoryId: initialData?.categoryId || "",
        slug: initialData?.slug || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            if (isEditing) {
                await updatePost(initialData.id, formData);
                setSuccess("Post updated successfully!");
            } else {
                await createPost(formData);
                router.push("/admin/posts");
            }
            router.refresh();
        } catch (err) {
            setError("Failed to save post");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        setLoading(true);
        try {
            await deletePost(initialData.id);
            router.push("/admin/posts");
        } catch (err) {
            setError("Failed to delete post");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Link href="/admin/posts" className="flex items-center gap-2 text-gray-500 hover:text-rose-600 transition font-medium">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Posts
                </Link>
                <div className="flex items-center gap-3">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="p-3 text-gray-400 hover:text-rose-600 transition hover:bg-rose-50 rounded-2xl border border-transparent hover:border-rose-100"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isEditing ? "Update Post" : "Publish Post"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm border border-rose-100">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm border border-green-100">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Content Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-8 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">Post Title</label>
                            <input
                                type="text"
                                required
                                className="w-full px-0 py-2 bg-transparent border-b-2 border-rose-50 focus:border-rose-500 outline-none text-3xl font-playfair font-bold text-gray-900 transition"
                                placeholder="Enter post title..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">Content</label>
                            <Tiptap
                                content={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">Excerpt (Brief Summary)</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-3 bg-rose-50/30 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition resize-none"
                                placeholder="Write a short teaser for this post..."
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* SEO Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-8 space-y-6">
                        <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-xs">
                            <Search className="w-4 h-4" />
                            Search Engine Optimization (SEO)
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Meta Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition"
                                    placeholder="Recommended: 50-60 characters"
                                    value={formData.seoTitle}
                                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition resize-none"
                                    placeholder="Recommended: 150-160 characters"
                                    value={formData.seoDesc}
                                    onChange={(e) => setFormData({ ...formData, seoDesc: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Settings Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-8 space-y-6">
                        <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-xs">
                            <Globe className="w-4 h-4" />
                            Publishing Details
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition appearance-none"
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="url"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition"
                                        placeholder="https://images.unsplash.com/..."
                                        value={formData.featuredImage}
                                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                    />
                                </div>
                                {formData.featuredImage && (
                                    <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-rose-100">
                                        <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                                <div>
                                    <div className="font-bold text-rose-900 text-sm">Post Visibility</div>
                                    <div className="text-xs text-rose-600">Visible to all readers</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.published}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
