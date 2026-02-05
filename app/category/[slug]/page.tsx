import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowRight, Heart } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            posts: {
                where: { published: true },
                orderBy: { createdAt: "desc" },
                include: {
                    author: { select: { name: true } }
                }
            }
        }
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-rose-50/20">
            {/* Category Hero */}
            <div className="bg-white border-b border-rose-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full text-rose-600 text-xs font-bold uppercase tracking-widest mb-6">
                        <Heart className="w-3.5 h-3.5 fill-rose-600" />
                        Category
                    </div>
                    <h1 className="text-5xl md:text-6xl font-playfair font-bold text-gray-900 mb-6 capitalize">{category.name}</h1>
                    {category.description && (
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{category.description}</p>
                    )}
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {category.posts.map((post: any) => (
                        <article key={post.id} className="group bg-white rounded-[2rem] overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500 hover:-translate-y-2">
                            {post.featuredImage && (
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img
                                        src={post.featuredImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs font-bold text-rose-500 uppercase tracking-tighter mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {post.author?.name || "Anonymous"}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition truncate-2-lines">{post.title}</h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt || "Explore the beautiful words and deep feelings in this shayari collection."}
                                </p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-gray-900 font-bold group/btn"
                                >
                                    Read Full Shayari
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform text-rose-600" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {category.posts.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-rose-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h2>
                        <p className="text-gray-500 leading-relaxed">We're currently curating the best {category.name} for you. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
