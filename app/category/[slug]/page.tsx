import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart } from "lucide-react";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const category = await prisma.category.findUnique({
        where: { slug: params.slug },
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!category) notFound();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block p-4 rounded-full bg-rose-50 mb-6">
                    <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
                </span>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 capitalize">
                    {category.name}
                </h1>
                <p className="text-gray-600 text-lg">
                    {category.description || `Browse our collection of ${category.name}`}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.posts.map(post => (
                    <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col group">
                        <Link href={`/blog/${post.slug}`} className="h-56 bg-gray-100 block overflow-hidden relative">
                            {post.featuredImage && (
                                <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            )}
                        </Link>
                        <div className="p-6 flex-1 flex flex-col">
                            <Link href={`/blog/${post.slug}`} className="block mb-2">
                                <h2 className="text-xl font-bold text-gray-800 group-hover:text-rose-600 transition">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto">
                                <Link href={`/blog/${post.slug}`} className="text-rose-600 font-bold text-sm hover:underline">
                                    Read Shayari
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {category.posts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No posts found in this category yet.
                </div>
            )}
        </div>
    );
}
