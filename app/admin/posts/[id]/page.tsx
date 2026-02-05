import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/PostForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    const categories = await prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-playfair font-bold text-gray-900">Edit Post</h1>
                <p className="text-gray-500 mt-1">Update your content and SEO settings.</p>
            </div>
            <PostForm categories={categories} initialData={post} />
        </div>
    );
}
