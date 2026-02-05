"use client";

import { useState } from "react";
import {
    Plus,
    Trash2,
    Layers,
    Search,
    Loader2,
    ExternalLink,
    ChevronRight
} from "lucide-react";
import { createCategory, deleteCategory } from "@/app/actions/taxonomy";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CategoryList({ initialCategories }: { initialCategories: any[] }) {
    const [categories, setCategories] = useState(initialCategories);
    const [loading, setLoading] = useState(false);
    const [newCatName, setNewCatName] = useState("");
    const router = useRouter();

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName.trim()) return;
        setLoading(true);

        try {
            await createCategory({ name: newCatName });
            setNewCatName("");
            router.refresh();
            // In a real app, you'd probably fetch the updated list or use optimistic updates
            // For simplicity, we rely on RSC refresh
        } catch (err) {
            alert("Failed to create category");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category? All posts in it will be unassigned.")) return;
        setLoading(true);
        try {
            await deleteCategory(id);
            router.refresh();
        } catch (err) {
            alert("Failed to delete");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="divide-y divide-rose-50">
            <div className="p-6 bg-rose-50/30">
                <form onSubmit={handleAdd} className="flex gap-4">
                    <input
                        type="text"
                        className="flex-1 px-4 py-3 bg-white border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition"
                        placeholder="Quick add category name..."
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading || !newCatName.trim()}
                        className="px-6 py-3 bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 hover:bg-rose-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                        Add
                    </button>
                </form>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-rose-50/10 border-b border-rose-100">
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider">Category Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider text-center">Posts</th>
                            <th className="px-6 py-4 text-xs font-bold text-rose-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-50">
                        {initialCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-rose-50/20 transition group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 group-hover:text-rose-600 transition">{cat.name}</div>
                                            <div className="text-xs text-gray-400">/{cat.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-bold">
                                        {cat._count?.posts || 0}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/category/${cat.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-rose-600 transition rounded-lg hover:bg-white border border-transparent hover:border-rose-100">
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="p-2 text-gray-400 hover:text-rose-600 transition rounded-lg hover:bg-white border border-transparent hover:border-rose-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {initialCategories.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-gray-400 italic">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
