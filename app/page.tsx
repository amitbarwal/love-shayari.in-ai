import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Heart, Calendar, User, Sparkles } from "lucide-react";

export const revalidate = 60; // ISR

export default async function Home() {
  // Fetch site settings
  const settings = await prisma.settings.findUnique({
    where: { id: "singleton" }
  });

  // Fetch featured post
  const featuredPost = await prisma.post.findFirst({
    where: { published: true, featuredImage: { not: null } },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      author: { select: { name: true } }
    }
  });

  // Fetch latest posts
  const latestPosts = await prisma.post.findMany({
    where: { published: true, id: { not: featuredPost?.id } },
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      author: { select: { name: true } }
    }
  });

  // Fetch sections by category
  const categorySections = await prisma.category.findMany({
    take: 4,
    orderBy: { posts: { _count: 'desc' } },
    include: {
      posts: {
        take: 4,
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true } } }
      }
    }
  });

  return (
    <div className="bg-rose-50/20">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-rose-600 text-xs font-bold uppercase tracking-widest shadow-sm border border-rose-100 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 fill-rose-600" />
          The Ultimate Collection
        </div>
        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-gray-900 mb-8 leading-[1.1] max-w-4xl tracking-tight">
          Express Your <span className="text-rose-600 italic">Love</span> Through Every Word
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
          {settings?.siteDescription || "Dive into a beautiful collection of Love Shayari, Jokes, and Quotes curated for your deepest emotions."}
        </p>

        {/* Dynamic Theme Gradient Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/latest" className="bg-rose-600 text-white px-10 py-5 rounded-[2rem] font-bold shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all hover:scale-105 active:scale-95">
            Explore Latest Shayari
          </Link>
          <Link href="/admin" className="bg-white text-gray-900 border border-rose-100 px-10 py-5 rounded-[2rem] font-bold hover:bg-rose-50 transition-all hover:scale-105 active:scale-95 shadow-sm">
            Admin Dashboard
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 divide-y divide-rose-100 space-y-32">

        {/* Featured Card */}
        {featuredPost && (
          <section className="transition-all">
            <Link href={`/blog/${featuredPost.slug}`} className="group relative block aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl bg-white">
              {featuredPost.featuredImage ? (
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-rose-50 flex items-center justify-center">
                  <Heart className="w-32 h-32 text-rose-100 fill-rose-100/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-16">
                <div className="bg-rose-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-6 shadow-lg shadow-rose-900/20">
                  {featuredPost.category.name}
                </div>
                <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6 group-hover:text-rose-200 transition">
                  {featuredPost.title}
                </h2>
                <div className="flex items-center gap-6 text-white/70 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-400" />
                    {featuredPost.author?.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-rose-400" />
                    {new Date(featuredPost.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Latest Grid */}
        <section className="pt-32">
          <div className="flex items-end justify-between mb-16 px-4 md:px-0">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-2">Editor's Picks</h2>
              <p className="text-gray-500 font-medium tracking-tight">Hand-picked shayaris from our top authors</p>
            </div>
            <Link href="/latest" className="hidden md:flex items-center gap-2 text-rose-600 font-bold hover:gap-4 transition-all">
              Browse All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestPosts.map(post => (
              <article key={post.id} className="group bg-white rounded-[2.5rem] p-4 border border-rose-50 hover:shadow-2xl hover:shadow-rose-100/50 transition-all duration-500 flex flex-col h-full">
                <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-rose-50 block mb-6">
                  {post.featuredImage ? (
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-rose-200"><Heart className="w-12 h-12" /></div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-rose-600 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    {post.category.name}
                  </div>
                </Link>
                <div className="px-4 pb-4 flex flex-col flex-1">
                  <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt || "Dive into the depth of words with this soul-stirring shayari collection."}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-rose-50">
                    <div className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-tighter">
                      <User className="w-3 h-3 text-rose-300" />
                      {post.author?.name}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categorized Sections */}
        {categorySections.map((cat, idx) => (
          <section key={cat.id} className="pt-32">
            <div className={cn(
              "flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8",
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            )}>
              <div className={idx % 2 === 1 ? "md:text-right" : ""}>
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">{cat.name}</h2>
                <p className="text-gray-500 font-medium max-w-md">{cat.description || `The most touching collection of ${cat.name} ever written.`}</p>
              </div>
              <Link
                href={`/category/${cat.slug}`}
                className="bg-rose-50 text-rose-600 px-8 py-3.5 rounded-2xl font-bold hover:bg-rose-100 transition shadow-sm inline-flex items-center gap-2"
              >
                See all {cat.name}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cat.posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block space-y-4">
                  <div className="aspect-square bg-white border border-rose-50 rounded-[2rem] p-3 shadow-sm group-hover:shadow-lg transition-all duration-500">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-rose-50 relative">
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-rose-200"><Heart className="w-10 h-10" /></div>
                      )}
                      <div className="absolute inset-0 bg-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="px-2">
                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition truncate leading-tight">{post.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 font-medium italic">By {post.author?.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Newsletter / CTA Section */}
        <section className="pt-32 pb-20">
          <div className="bg-gradient-to-br from-rose-600 to-pink-700 rounded-[3rem] p-8 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-rose-900/20">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <Heart className="w-64 h-64 rotate-12" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Stay Connected to the Soul</h2>
              <p className="text-rose-100 text-lg mb-10 leading-relaxed uppercase tracking-widest text-xs font-bold">Join 10,000+ readers who receive our weekly curated shayari</p>
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-[2rem] flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your heart's email"
                  className="bg-transparent text-white placeholder:text-rose-200 px-6 py-4 flex-1 outline-none font-medium"
                />
                <button className="bg-white text-rose-600 px-10 py-4 rounded-[1.5rem] font-bold shadow-xl hover:bg-rose-50 transition active:scale-95 whitespace-nowrap uppercase tracking-tighter">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Utility function used in layout but good to have here if needed
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
  </svg>
);
