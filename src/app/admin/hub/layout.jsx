"use client";
import Sidebar from "@/componenets/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import React from "react";
import { Poppins } from "next/font/google";
import Header from "@/componenets/Header";

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const HubLayout = ({ children }) => {
  const currentRoute = usePathname();
  const router = useRouter();
  const urlparams = useParams();
  const { name } = urlparams;

  const homepageClickHandler = () => {
    if (window.confirm("Do you want to exit?")) {
      router.push("/admin/dashboard");
    } else {
      console.log("CANCELED");
    }
  };
  return (
    <section className="flex min-h-screen">
      <div className={`flex flex-col h-auto w-64 ${poppins400.className}`}>
        <div className="">
          <button onClick={homepageClickHandler}>
            <Header />
          </button>
          {currentRoute !== `/admin/hub/settings/${name}` && (
            <div className="px-4 py-8 flex flex-col gap-8 text-sm">
              <Link
                href={`/admin/hub/settings/basic-settings/${name}`}
                className={`${
                  currentRoute === `/admin/hub/settings/basic-settings/${name}`
                    ? ""
                    : "text-[#C4C4C4]"
                } flex gap-3 items-center`}
              >
                Basic Settings
              </Link>
              <Link
                href={`/admin/hub/settings/episode-settings/${name}`}
                className={`${
                  currentRoute.includes(
                    `/admin/hub/settings/episode-settings/${name}`
                  )
                    ? ""
                    : "text-[#C4C4C4]"
                } flex gap-3 items-center`}
              >
                Episode Settings
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 px-4 py-3">{children}</div>
    </section>
  );
};

export default HubLayout;
