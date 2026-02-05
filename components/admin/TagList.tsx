"use client";

import { useState } from "react";
import { Plus, Trash2, Tag, Loader2 } from "lucide-react";
import { createTag, deleteTag } from "@/app/actions/taxonomy";
import { useRouter } from "next/navigation";

export function TagList({ initialTags }: { initialTags: any[] }) {
    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState("");
    const router = useRouter();

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;
        setLoading(true);
        try {
            await createTag(newName);
            setNewName("");
            router.refresh();
        } catch (err) {
            alert("Failed to create tag");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this tag?")) return;
        setLoading(true);
        try {
            await deleteTag(id);
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
                        placeholder="Add new tag keyword..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading || !newName.trim()}
                        className="px-6 py-3 bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 hover:bg-rose-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                        Add Tag
                    </button>
                </form>
            </div>

            <div className="p-8">
                <div className="flex flex-wrap gap-4">
                    {initialTags.map((tag) => (
                        <div
                            key={tag.id}
                            className="flex items-center gap-2 bg-white border border-rose-100 px-4 py-2 rounded-2xl group hover:border-rose-300 transition shadow-sm"
                        >
                            <Tag className="w-3.5 h-3.5 text-rose-400 group-hover:text-rose-600" />
                            <span className="text-sm font-medium text-gray-700">{tag.name}</span>
                            <span className="text-[10px] font-bold text-rose-300 bg-rose-50 px-1.5 py-0.5 rounded-full">
                                {tag._count?.posts || 0}
                            </span>
                            <button
                                onClick={() => handleDelete(tag.id)}
                                className="ml-2 text-gray-300 hover:text-rose-600 transition"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                    {initialTags.length === 0 && (
                        <p className="text-gray-400 italic text-sm">No tags created yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
