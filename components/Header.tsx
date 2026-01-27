import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Menu, Search, Heart } from "lucide-react";

export async function Header() {
    // Fetch categories for menu
    const categories = await prisma.category.findMany({
        take: 6,
        orderBy: { posts: { _count: 'desc' } }
    });

    return (
        <header className="bg-white border-b border-rose-100 sticky top-0 z-50">
            <div className="bg-rose-600 text-white py-1 px-4 text-center text-xs font-medium">
                Welcome to the world of Love & Feelings ❤️
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Heart className="w-8 h-8 text-rose-600 fill-rose-600 group-hover:scale-110 transition-transform" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
                            Love Shayari
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6 items-center">
                        <Link href="/" className="text-gray-600 hover:text-rose-600 font-medium transition">Home</Link>
                        {categories.map((cat) => (
                            <Link key={cat.id} href={`/category/${cat.slug}`} className="text-gray-600 hover:text-rose-600 font-medium transition capitalize">
                                {cat.name}
                            </Link>
                        ))}
                        <Link href="/about" className="text-gray-600 hover:text-rose-600 font-medium transition">About</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-rose-600 rounded-full p-2 hover:bg-rose-50 transition">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="md:hidden text-gray-500 hover:text-rose-600">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
