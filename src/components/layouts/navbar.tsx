"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = ["About", "Features", "How it Works"] as const;

export function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-[#e4ecff] ${scrolled
                ? "bg-white/95 shadow-md py-2"
                : "bg-white/80 py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center h-10">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="CareerSprint by i2i industry"
                            width={200}
                            height={40}
                            className=""
                            priority
                        />
                    </Link>
                </div>
                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-10">

                    {navItems.map((item) => {
                        const sectionId = item.toLowerCase().replace(/ /g, "-");
                        return (
                            <Link
                                key={item}
                                href={`/#${sectionId}`}
                                className="relative text-sm font-medium text-gray-600 hover:text-[#0F6FFF] transition-colors group"
                            >
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        );
                    })}

                    {/* Login */}
                    <Link
                        href="/auth/login"
                        className="text-sm font-semibold text-[#0F6FFF] hover:text-[#0057d3] transition"
                    >
                        Login
                    </Link>

                    {/* Sign Up Button */}
                    <div>
                        <Link
                            href="/auth/register"
                            className="bg-gradient-to-r from-[#FF8A21] to-[#ff6a00] px-6 py-2.5 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition"
                        >
                            Sign Up
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default LandingNavbar;