import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex max-w-[1260px] w-full m-auto px-[30px] justify-between py-[20px]">
      <Link href={"/"}>book store</Link>
      <nav>
        <Link href={"/books/create"} className="text-gray-500 hover:text-black transition-all">Create</Link>
      </nav>
    </header>
  );
};

export default Header;
