"use client";

import { createPost } from "@/app/actions/admin";
import { useState } from "react";

export function PostForm({ categories }: { categories: { id: string, name: string }[] }) {
    const [loading, setLoading] = useState(false);

    return (
        <form action={createPost} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input name="title" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-lg p-2 border" placeholder="Enter post title" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Slug</label>
                                <input name="slug" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-sm p-2 border" placeholder="auto-generated-from-title" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                {/* TODO: Replace with Tiptap Editor */}
                                <textarea name="content" required rows={15} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-4 border" placeholder="Write your post content here..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                                <textarea name="excerpt" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-900 border-b pb-2 mb-4">SEO Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                                <input name="seoTitle" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                                <textarea name="seoDesc" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-900 border-b pb-2 mb-4">Publishing</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select name="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select name="categoryId" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-2 border">
                                    <option value="">Select Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
                                <input name="featuredImage" type="url" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-sm p-2 border" placeholder="https://" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-rose-600 text-white py-3 px-4 rounded-md hover:bg-rose-700 transition font-medium">
                                {loading ? 'Saving...' : 'Save Post'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
