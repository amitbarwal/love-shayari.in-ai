import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, Tag, ChevronLeft, Heart, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.post.findUnique({ where: { slug }, include: { category: true } });
    if (!post) return { title: 'Post Not Found' };
    return {
        title: post.seoTitle || `${post.title} - Love Shayari`,
        description: post.seoDesc || post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            category: true,
            tags: true,
            author: { select: { name: true, image: true } }
        }
    });

    if (!post) notFound();

    // Similar posts
    const similarPosts = await prisma.post.findMany({
        where: {
            categoryId: post.categoryId,
            id: { not: post.id },
            published: true
        },
        include: {
            author: { select: { name: true } }
        },
        take: 3
    });

    return (
        <div className="bg-rose-50/20 min-h-screen">
            {/* Progress Bar or similar could go here */}

            <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                {/* Back Link */}
                <Link href={`/category/${post.category.slug}`} className="group inline-flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest mb-10 hover:text-rose-700 transition">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Explore more {post.category.name}
                </Link>

                {/* Title & Meta */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-8 leading-[1.15]">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 border-y border-rose-100 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold shadow-inner">
                                {post.author?.name?.charAt(0) || <Heart className="w-4 h-4" />}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Written by</div>
                                <div className="text-sm text-gray-500 font-medium">{post.author?.name || "Guest Author"}</div>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-rose-100 hidden sm:block" />

                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1.5 font-medium">
                                <Calendar className="w-4 h-4 text-rose-400" />
                                {new Date(post.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <button className="p-2.5 rounded-xl hover:bg-white transition text-gray-400 hover:text-rose-600 border border-transparent hover:border-rose-100">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-200/50 mb-16 aspect-video bg-white border-8 border-white">
                        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-rose prose-lg md:prose-xl max-w-none prose-headings:font-playfair prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-blockquote:border-rose-500 prose-blockquote:bg-rose-50/50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:font-serif prose-blockquote:italic">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Footer Meta */}
                <div className="mt-20 pt-10 border-t border-rose-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: any) => (
                            <span key={tag.id} className="bg-white border border-rose-100 text-rose-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-50 transition cursor-default">
                                #{tag.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-rose-100 hover:bg-rose-700 transition active:scale-95">
                            <Heart className="w-4 h-4" />
                            Give Love
                        </button>
                    </div>
                </div>

                {/* Similar Posts Section */}
                {similarPosts.length > 0 && (
                    <div className="mt-32">
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <h3 className="text-3xl font-bold font-playfair text-gray-900">Discover More Feelings</h3>
                                <p className="text-gray-500 mt-2">Handpicked shayaris just for you</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {similarPosts.map((p: any) => (
                                <Link key={p.id} href={`/blog/${p.slug}`} className="group bg-white p-4 rounded-[2rem] border border-rose-50 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500">
                                    <div className="aspect-[4/3] bg-rose-50 rounded-2xl mb-6 overflow-hidden relative">
                                        {p.featuredImage ? (
                                            <img src={p.featuredImage} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Heart className="w-10 h-10 text-rose-200" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-rose-600 uppercase tracking-widest">
                                            {post.category.name}
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-rose-600 transition line-clamp-2 px-2 pb-2 leading-relaxed">{p.title}</h4>
                                    <div className="flex items-center justify-between px-2 pt-2 border-t border-rose-50 mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                        <span>{p.author?.name}</span>
                                        <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
