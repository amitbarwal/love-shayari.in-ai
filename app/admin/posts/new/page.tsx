import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
    const categories = await prisma.category.findMany({ select: { id: true, name: true } });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Post</h1>
            <PostForm categories={categories} />
        </div>
    );
}
