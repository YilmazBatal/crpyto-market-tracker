"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/cryptocurrencies", label: "Cryptocurrencies" },
  { href: "/exchanges", label: "Exchanges" },
  { href: "/nfts", label: "NFTs" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/watchlist", label: "Watchlist" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
        >
          <motion.span
            className={
              pathname === link.href ? "font-bold" : "text-primary"
            }
          >
            {link.label}
          </motion.span>
          {pathname === link.href && (
            <motion.div
              className="absolute inset-0 bg-accent rounded-md z-[-1]"
              layoutId="navbar-active"
              initial={{ width: "0%", left: "50%" }}
              animate={{ width: "100%", left: "0%" }}
              exit={{ width: "0%", left: "50%" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}