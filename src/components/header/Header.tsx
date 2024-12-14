import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="max-w-[1260px] w-full m-auto px-[30px]">
      <Link href={"/"}>book store</Link>
    </header>
  );
};

export default Header;
