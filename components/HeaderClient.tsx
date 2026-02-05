"use client";

import { useState } from "react";
import { Menu, X, Heart, Search, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export function HeaderClient({ categories, siteName }: { categories: any[], siteName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Heart className="w-8 h-8 text-rose-600 fill-rose-600 group-hover:scale-110 transition-transform" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
                            {siteName}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 items-center">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="text-gray-600 hover:text-rose-600 font-bold transition-colors capitalize text-sm tracking-wide"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex text-gray-500 hover:text-rose-600 rounded-full p-2.5 hover:bg-rose-50 transition">
                            <Search className="w-5 h-5" />
                        </button>

                        {session ? (
                            <div className="flex items-center gap-2 border-l border-rose-100 pl-4 ml-2">
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-100 transition"
                                >
                                    <LayoutDashboard className="w-3.5 h-3.5" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 text-gray-400 hover:text-rose-600 transition"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-rose-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-rose-100 hover:bg-rose-700 transition"
                            >
                                Sign In
                            </Link>
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-500 hover:text-rose-600 p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "md:hidden fixed inset-x-0 top-[112px] bg-white border-b border-rose-100 p-6 z-40 transition-all duration-300 shadow-xl",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
            )}>
                <nav className="flex flex-col gap-4">
                    <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-900 font-bold hover:text-rose-600">Home</Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-900 font-bold hover:text-rose-600 capitalize"
                        >
                            {cat.name}
                        </Link>
                    ))}
                    {!session && (
                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 text-rose-600 font-bold border-t border-rose-50 pt-4"
                        >
                            Join the Community
                        </Link>
                    )}
                </nav>
            </div>
        </>
    );
}
