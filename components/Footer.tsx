import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                        <span className="text-xl font-bold text-white">Love Shayari</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Connect with your emotions. Dive into the ocean of love, sadness, attitude, and motivation. The best collection of shayaris and quotes.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4 text-rose-500">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/" className="hover:text-rose-400 transition">Home</Link></li>
                        <li><Link href="/about" className="hover:text-rose-400 transition">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-rose-400 transition">Contact Us</Link></li>
                        <li><Link href="/privacy" className="hover:text-rose-400 transition">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4 text-rose-500">Categories</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/category/love-shayari" className="hover:text-rose-400 transition">Love Shayari</Link></li>
                        <li><Link href="/category/sad-shayari" className="hover:text-rose-400 transition">Sad Shayari</Link></li>
                        <li><Link href="/category/attitude-shayari" className="hover:text-rose-400 transition">Attitude Shayari</Link></li>
                        <li><Link href="/category/motivational-shayari" className="hover:text-rose-400 transition">Motivational Shayari</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Love Shayari. All rights reserved.</p>
                <p className="mt-2 text-xs">Designed with ❤️ for You</p>
            </div>
        </footer>
    );
}
