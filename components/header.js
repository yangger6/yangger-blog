import React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <div>
            <nav className="flex justify-center items-center h-16 py-2 mb-2 bg-gray-100 w-full border-b">
                <div>
                    <Link href="/">
                        <a href="#" className="px-2 font-black lg:px-0 text-lg">
                            Sheriff's Blog
                        </a>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;
