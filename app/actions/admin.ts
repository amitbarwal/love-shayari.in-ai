"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

// --- Categories ---
export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string || name.toLowerCase().replace(/\s+/g, '-');
    const description = formData.get("description") as string;

    try {
        await prisma.category.create({
            data: { name, slug, description }
        });
        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Failed to create category:", error);
        return { success: false, error: "Failed to create category" };
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({ where: { id } });
        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete" };
    }
}

// --- Tags ---
export async function createTag(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string || name.toLowerCase().replace(/\s+/g, '-');

    try {
        await prisma.tag.create({ data: { name, slug } });
        revalidatePath("/admin/tags");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create tag" };
    }
}

export async function deleteTag(id: string) {
    try {
        await prisma.tag.delete({ where: { id } });
        revalidatePath("/admin/tags");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete" };
    }
}

// --- Posts ---
export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string || title.toLowerCase().replace(/\s+/g, '-');
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const status = formData.get("status") as string; // 'published' or 'draft'

    // Minimal validation
    if (!title || !categoryId) return { success: false, error: "Missing fields" };

    try {
        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                categoryId,
                published: status === 'published',
            }
        });
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to create post" };
    }

    revalidatePath("/admin/posts");
    redirect("/admin/posts");
}
