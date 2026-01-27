import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Heart, Calendar } from "lucide-react";

export const revalidate = 60; // ISR

export default async function Home() {
  // Fetch data
  const featuredPost = await prisma.post.findFirst({
    where: { published: true, featuredImage: { not: null } },
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  const latestPosts = await prisma.post.findMany({
    where: { published: true, id: { not: featuredPost?.id } },
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  const categories = await prisma.category.findMany({
    take: 3,
    orderBy: { posts: { _count: 'desc' } },
    include: {
      posts: {
        take: 4,
        where: { published: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

      {/* Hero Section */}
      {featuredPost ? (
        <section className="relative rounded-3xl overflow-hidden shadow-xl bg-white grid grid-cols-1 lg:grid-cols-2 group">
          <div className="relative h-64 lg:h-auto overflow-hidden">
            {featuredPost.featuredImage ? (
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-rose-100 flex items-center justify-center">
                <Heart className="w-20 h-20 text-rose-300" />
              </div>
            )}
            <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {featuredPost.category.name}
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <h1 className="text-3xl lg:text-5xl font-playfair font-bold text-gray-900 leading-tight mb-4 hover:text-rose-600 transition">
                {featuredPost.title}
              </h1>
            </Link>
            <p className="text-gray-600 mb-8 line-clamp-3 text-lg">
              {featuredPost.excerpt || featuredPost.seoDesc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(featuredPost.createdAt).toLocaleDateString()}
              </span>
              <Link href={`/blog/${featuredPost.slug}`} className="group/btn flex items-center gap-2 text-rose-600 font-bold tracking-wide">
                READ MORE <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-rose-50 rounded-3xl p-12 text-center">
          <h1 className="text-4xl font-playfair font-bold text-gray-800">Welcome to Love Shayari</h1>
          <p className="mt-4 text-gray-600">No posts available yet. Check back soon!</p>
        </section>
      )}

      {/* Latest Posts Grid */}
      <section>
        <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 border-l-4 border-rose-500 pl-4">Latest Updates</h2>
          <Link href="/latest" className="text-rose-600 font-medium hover:text-rose-700">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
              <Link href={`/blog/${post.slug}`} className="relative h-48 block overflow-hidden bg-gray-100 group">
                {post.featuredImage ? (
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-200"><Heart className="w-12 h-12" /></div>
                )}
                <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-xs font-bold text-rose-600 px-2 py-1 rounded">
                  {post.category.name}
                </span>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-2 text-xs text-gray-400 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <Link href={`/blog/${post.slug}`} className="block mb-2">
                  <h3 className="text-xl font-bold text-gray-800 hover:text-rose-600 transition line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categories.map(cat => (
        <section key={cat.id}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 flex items-center gap-3">
              <span className="bg-rose-100 p-2 rounded-full"><Heart className="w-6 h-6 text-rose-600 fill-rose-600" /></span>
              {cat.name}
            </h2>
            <Link href={`/category/${cat.slug}`} className="text-sm font-bold text-rose-600 border border-rose-200 px-4 py-2 rounded-full hover:bg-rose-50 transition">
              Explore {cat.name}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cat.posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-3 relative">
                  {post.featuredImage && (
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-rose-600 transition leading-snug">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      ))}

    </div>
  );
}
