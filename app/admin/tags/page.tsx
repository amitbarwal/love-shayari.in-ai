import { prisma } from "@/lib/prisma";
import { TagList } from "@/components/admin/TagList";

export default async function TagsPage() {
    const tags = await prisma.tag.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { posts: true }
            }
        }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-playfair font-bold text-gray-900">Tags</h1>
                <p className="text-gray-500 mt-1">Manage keywords used to label your content.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden">
                <TagList initialTags={tags} />
            </div>
        </div>
    );
}
