'USE CLIENT'

import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ModeToggle } from "../mode-toggle";
import { UserNav } from "./user-nav";
import { SettingsDropdown } from "../settings";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-4">
                        <span className="font-bold text-xl">DemoBrokerV2</span>
                    </Link>
                    <div className="hidden lg:block">
                        <NavLinks />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div >
                        <UserNav />
                    </div>
                    <div>
                        <SettingsDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
}