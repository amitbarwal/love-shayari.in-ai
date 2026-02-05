"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Category Actions
export async function createCategory(data: any) {
    try {
        const slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        await prisma.category.create({
            data: {
                name: data.name,
                slug,
                description: data.description,
                image: data.image,
                seoTitle: data.seoTitle,
                seoDesc: data.seoDesc,
            },
        });
        revalidatePath("/admin/categories");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        throw new Error("Failed to create category");
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({ where: { id } });
        revalidatePath("/admin/categories");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        throw new Error("Failed to delete category");
    }
}

// Tag Actions
export async function createTag(name: string) {
    try {
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        await prisma.tag.create({
            data: { name, slug },
        });
        revalidatePath("/admin/tags");
        return { success: true };
    } catch (error) {
        throw new Error("Failed to create tag");
    }
}

export async function deleteTag(id: string) {
    try {
        await prisma.tag.delete({ where: { id } });
        revalidatePath("/admin/tags");
        return { success: true };
    } catch (error) {
        throw new Error("Failed to delete tag");
    }
}
