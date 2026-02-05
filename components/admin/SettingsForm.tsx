"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Palette, Globe, Search } from "lucide-react";
import { updateSettings } from "@/app/actions/settings";

export function SettingsForm({ initialData }: { initialData: any }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        siteName: initialData.siteName || "",
        siteDescription: initialData.siteDescription || "",
        themeColor: initialData.themeColor || "#e11d48",
        footerText: initialData.footerText || "",
        homeMetaTitle: initialData.homeMetaTitle || "",
        homeMetaDescription: initialData.homeMetaDescription || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await updateSettings(formData);
            setSuccess("Settings updated successfully!");
            router.refresh();
        } catch (err) {
            setError("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
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

            {/* Basic Info */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-xs">
                    <Globe className="w-4 h-4" />
                    General Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition"
                            value={formData.siteName}
                            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition"
                            value={formData.footerText}
                            onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition resize-none"
                            value={formData.siteDescription}
                            onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                        />
                    </div>
                </div>
            </section>

            {/* Theme Settings */}
            <section className="space-y-6 pt-6 border-t border-rose-50">
                <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-xs">
                    <Palette className="w-4 h-4" />
                    Branding & Theme
                </div>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl shadow-inner border border-rose-100 transition-colors duration-500" style={{ backgroundColor: formData.themeColor }} />
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color (Theme Color)</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition"
                                value={formData.themeColor}
                                onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                                placeholder="#e11d48"
                            />
                            <input
                                type="color"
                                className="h-12 w-12 rounded-xl cursor-pointer bg-transparent border-none"
                                value={formData.themeColor}
                                onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Settings */}
            <section className="space-y-6 pt-6 border-t border-rose-50">
                <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-xs">
                    <Search className="w-4 h-4" />
                    Home Page SEO
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition"
                            value={formData.homeMetaTitle}
                            onChange={(e) => setFormData({ ...formData, homeMetaTitle: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition resize-none"
                            value={formData.homeMetaDescription}
                            onChange={(e) => setFormData({ ...formData, homeMetaDescription: e.target.value })}
                        />
                    </div>
                </div>
            </section>

            <div className="pt-6 border-t border-rose-50 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 transition flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Settings
                </button>
            </div>
        </form>
    );
}
