import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center gap-4 max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="text-2xl font-bold">Nextgen</div>
      <nav className="ml-auto hidden md:flex gap-6">
        <Link href="/men" className="hover:underline">Men</Link>
        <Link href="/women" className="hover:underline">Women</Link>
        <Link href="/children" className="hover:underline">Children</Link>
      </nav>
      <input className="ml-4 px-3 py-2 rounded-lg border hidden sm:block" placeholder="Search" />
      <Button variant="ghost" size="icon" className="md:hidden ml-auto">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </header>
  );
}
