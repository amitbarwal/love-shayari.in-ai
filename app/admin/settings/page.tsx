import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
    const settings = await prisma.settings.upsert({
        where: { id: "singleton" },
        update: {},
        create: {
            id: "singleton",
            siteName: "Love Shayari",
            siteDescription: "Best Collection of Quotes and Shayari",
            themeColor: "#e11d48",
        },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-playfair font-bold text-gray-900">Site Settings</h1>
                <p className="text-gray-500 mt-1">Manage your website's global configuration and theme.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden">
                <div className="p-8">
                    <SettingsForm initialData={settings} />
                </div>
            </div>
        </div>
    );
}
