import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { raleway } from "@/lib/fonts";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#FFC000] text-black">
      <div className="mx-auto max-w-7xl px-4">
        {/* Three-column layout: (mobile menu | logo on md+) | centered nav | actions */}
        <div className="grid h-16 grid-cols-3 items-center">
          {/* Left: MobileMenu on sm; Logo on md+ */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <MobileMenu />
            </div>
            <div className="hidden md:inline-flex">
              <Image
                src="/images/landing/learnpf-logo.svg"
                alt="LearnPF"
                width={132}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </div>
          </div>

          {/* Center: Desktop Navigation (no wrapping) */}
          <nav className="hidden md:flex items-center justify-center gap-12 text-[17px] font-bold font-raleway whitespace-nowrap">
            <span className="text-[17px] font-bold">About PF</span>
            <span className="text-[17px] font-bold" aria-disabled="true">Success Stories</span>
            <span className="text-[17px] font-bold" aria-disabled="true">Resources</span>
            <span className="text-[17px] font-bold">Help Students</span>
          </nav>

          {/* Right: Login (visible on all breakpoints) */}
          <div className="flex items-center gap-3 justify-self-end -mr-24 md:mr-0">
            <Button
              size="sm"
              className="h-8 md:h-9 rounded-full bg-white px-3 md:px-4 text-sm md:text-[17px] font-bold font-raleway text-black
                         shadow-sm transition duration-150
                         hover:bg-white/95 hover:shadow-lg hover:ring-2 hover:ring-black/15
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

