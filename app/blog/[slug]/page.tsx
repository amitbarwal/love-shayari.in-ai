import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await prisma.post.findUnique({ where: { slug: params.slug }, include: { category: true } });
    if (!post) return { title: 'Post Not Found' };
    return {
        title: post.seoTitle || post.title,
        description: post.seoDesc || post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        include: { category: true, tags: true }
    });

    if (!post) notFound();

    // Similar posts
    const similarPosts = await prisma.post.findMany({
        where: {
            categoryId: post.categoryId,
            id: { not: post.id },
            published: true
        },
        take: 3
    });

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-rose-600">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/category/${post.category.slug}`} className="hover:text-rose-600">{post.category.name}</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium truncate">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-10 text-center">
                <Link href={`/category/${post.category.slug}`} className="inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    {post.category.name}
                </Link>
                <h1 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    {/* <span>By Admin</span> */}
                </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
                <div className="rounded-2xl overflow-hidden shadow-lg mb-12 aspect-video bg-gray-100">
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-rose mx-auto">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2 justify-center">
                    {post.tags.map(tag => (
                        <span key={tag.id} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}

            {/* Similar Posts */}
            {similarPosts.length > 0 && (
                <div className="mt-20 border-t border-gray-100 pt-12">
                    <h3 className="text-2xl font-bold font-playfair mb-8">You might also like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {similarPosts.map(p => (
                            <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                                <div className="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                                    {p.featuredImage && <img src={p.featuredImage} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />}
                                </div>
                                <h4 className="font-bold text-gray-800 group-hover:text-rose-600">{p.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
