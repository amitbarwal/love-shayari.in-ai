import Link from "next/link";
import { Heart, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function Footer() {
    const settings = await prisma.settings.findUnique({
        where: { id: "singleton" }
    });

    const categories = await prisma.category.findMany({
        take: 4,
        orderBy: { posts: { _count: 'desc' } }
    });

    const siteName = settings?.siteName || "Love Shayari";

    return (
        <footer className="bg-gray-950 text-white pt-20 pb-10 border-t border-rose-100/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                        <span className="text-2xl font-bold tracking-tight">{siteName}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        {settings?.siteDescription || "Connect with your emotions. Dive into the ocean of love, sadness, attitude, and motivation."}
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-600 transition group">
                            <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-600 transition group">
                            <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-600 transition group">
                            <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-6 text-rose-500 uppercase tracking-widest text-xs">Navigation</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/" className="hover:text-rose-400 transition">Home</Link></li>
                        <li><Link href="/about" className="hover:text-rose-400 transition">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-rose-400 transition">Contact Us</Link></li>
                        <li><Link href="/privacy" className="hover:text-rose-400 transition">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-6 text-rose-500 uppercase tracking-widest text-xs">Categories</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <Link href={`/category/${cat.slug}`} className="hover:text-rose-400 transition capitalize">
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-6 text-rose-500 uppercase tracking-widest text-xs">Newsletter</h3>
                    <p className="text-sm text-gray-400">Subscribe for weekly dose of feelings.</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-rose-600 hover:bg-rose-700 px-4 rounded-xl transition">
                            <Mail className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
                <p>© {new Date().getFullYear()} {siteName}. {settings?.footerText || "All rights reserved."}</p>
                <div className="flex gap-8">
                    <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
                    <Link href="/cookies" className="hover:text-gray-300">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}
