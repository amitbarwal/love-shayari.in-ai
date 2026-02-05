"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createPost(data: any) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    try {
        const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const post = await prisma.post.create({
            data: {
                title: data.title,
                slug,
                content: data.content,
                excerpt: data.excerpt,
                featuredImage: data.featuredImage,
                seoTitle: data.seoTitle,
                seoDesc: data.seoDesc,
                published: data.published,
                categoryId: data.categoryId,
                authorId: session.user.id,
            },
        });

        revalidatePath("/admin/posts");
        revalidatePath("/");
        return { success: true, post };
    } catch (error) {
        console.error("Create post error:", error);
        throw new Error("Failed to create post");
    }
}

export async function updatePost(id: string, data: any) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                excerpt: data.excerpt,
                featuredImage: data.featuredImage,
                seoTitle: data.seoTitle,
                seoDesc: data.seoDesc,
                published: data.published,
                categoryId: data.categoryId,
            },
        });

        revalidatePath("/admin/posts");
        revalidatePath(`/blog/${data.slug}`);
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Update post error:", error);
        throw new Error("Failed to update post");
    }
}

export async function deletePost(id: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    try {
        await prisma.post.delete({
            where: { id },
        });

        revalidatePath("/admin/posts");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete post error:", error);
        throw new Error("Failed to delete post");
    }
}
