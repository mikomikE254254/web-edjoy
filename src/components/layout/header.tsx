import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="p-4 md:px-6 bg-gray-50 border-b">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
            </Button>
            <div className="text-2xl font-bold">
                <Link href="/">Nextgen</Link>
            </div>
            <nav className="ml-auto hidden md:flex gap-6 items-center">
                <Link href="/men" className="hover:underline text-sm">Men</Link>
                <Link href="/women" className="hover:underline text-sm">Women</Link>
                <Link href="/children" className="hover:underline text-sm">Children</Link>
            </nav>
            <Input className="ml-4 px-3 py-2 rounded-lg border max-w-[200px] hidden sm:block" placeholder="Search" />
        </div>
    </header>
  );
}
