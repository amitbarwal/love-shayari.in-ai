import { prisma } from "@/lib/prisma";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
    const settings = await prisma.settings.findUnique({
        where: { id: "singleton" }
    });

    const categories = await prisma.category.findMany({
        take: 6,
        orderBy: { posts: { _count: 'desc' } }
    });

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {settings?.siteDescription || "Welcome to the world of Love & Feelings ❤️"}
            </div>
            <HeaderClient categories={categories} siteName={settings?.siteName || "Love Shayari"} />
        </header>
    );
}
