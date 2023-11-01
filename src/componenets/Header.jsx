import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Poppins } from "next/font/google";

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const Header = () => {
  return (
    <div className="px-4 py-5 justify-center items-center gap-4 inline-flex">
      <img
        src="/assets/icons/polymath_icon.svg"
        alt="Your Logo"
        width="24"
        height="24"
      />
      <div className={`${poppins400.className} text-center text-black text-xl`}>
        Polymath
      </div>
    </div>
  );
};

export default Header;
