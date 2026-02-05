"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(data: any) {
    try {
        await prisma.settings.upsert({
            where: { id: "singleton" },
            update: {
                siteName: data.siteName,
                siteDescription: data.siteDescription,
                themeColor: data.themeColor,
                footerText: data.footerText,
                homeMetaTitle: data.homeMetaTitle,
                homeMetaDescription: data.homeMetaDescription,
            },
            create: {
                id: "singleton",
                ...data,
            },
        });
        // revalidatePath("/", "layout");
        return { success: true };
    } catch (error) {
        console.error("Failed to update settings:", error);
        throw new Error("Failed to update settings");
    }
}
