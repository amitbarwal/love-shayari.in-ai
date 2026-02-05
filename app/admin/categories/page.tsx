import { prisma } from "@/lib/prisma";
import { CategoryList } from "@/components/admin/CategoryList";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
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
                <h1 className="text-3xl font-playfair font-bold text-gray-900">Categories</h1>
                <p className="text-gray-500 mt-1">Organize your shayari and jokes into segments.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden">
                        <CategoryList initialCategories={categories} />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-8 h-fit">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Add New Category</h2>
                    <form className="space-y-4">
                        {/* This will be handled by a client component for better UX */}
                        <p className="text-sm text-gray-500 italic">Use the "Add" button in the list for a quick add, or we'll implement a dedicated form here.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
