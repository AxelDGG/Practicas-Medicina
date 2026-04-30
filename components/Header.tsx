"use client";
import Link from "next/link";
import LangToggle from "./LangToggle";
import { T, useLang } from "@/lib/i18n";

export default function Header() {
  const [lang] = useLang();
  return (
    <header className="w-full border-b border-line/60 bg-cream/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-ink hover:opacity-80 transition-opacity"
        >
          {T.brand[lang]}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/correcciones"
            className="text-xs text-muted hover:text-ink transition-colors"
          >
            {T.corrections[lang]}
          </Link>
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
