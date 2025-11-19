"use client";

import { useState } from "react";
import Image from "next/image";
import { raleway } from "@/lib/fonts";

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger (top-left on mobile) */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-black/10 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Full-width dropdown panel (shows logo + items) */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-30 md:hidden border-t border-black/10 bg-[#FFC000]">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="inline-flex items-center mb-3">
              <Image
                src="/images/landing/learnpf-logo.svg"
                alt="LearnPF"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </div>

            <nav className="space-y-3">
              <span
                className="block px-2 py-2 rounded-lg text-[17px] font-bold font-raleway"
              >
                About PF
              </span>
              <span
                className="block px-2 py-2 rounded-lg text-[17px] font-bold font-raleway"
                aria-disabled="true"
              >
                Success Stories
              </span>
              <span
                className="block px-2 py-2 rounded-lg text-[17px] font-bold font-raleway"
                aria-disabled="true"
              >
                Resources
              </span>
              <span
                className="block px-2 py-2 rounded-lg text-[17px] font-bold font-raleway"
              >
                Help Students
              </span>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

