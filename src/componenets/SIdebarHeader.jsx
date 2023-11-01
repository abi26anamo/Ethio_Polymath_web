"use client";
import React, { useEffect, useRef, useState, } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";


const poppins600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const SIdebarHeader = ({ title, toggleSidebarPopup }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [shouldLogout, setShouldLogout] = useState(false);
  const profileRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter()
  const imageSrc = user.user.profilePicture
  const initial = user.user.username == null ? 'A': user.user.username[0]

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (shouldLogout) {
      console.log("calling dispatch func")
      dispatch(logout());
      router.push('/login');
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [shouldLogout, router]);


  const profileClickHandler = () => {
    setShowMenu(!showMenu);
  };

  const draftSectionHandler = () => { 
   router.push("/admin/draft-section")
  }

  const logoutHandler = () => {
    //dispatch(logout());
    setShouldLogout(true);
  };

  return (
    <div className="p-2 flex justify-between items-center">
      <h1
        className={`${poppins600.className} text-2xl 2xl:text-2xl 3xl:text-3xl`}
      >
        {title}
      </h1>
      <div className="flex gap-5 items-center">
        <div className="space-y-1">
          <p>Videos: 1/30</p>
          <div className="w-28 h-1 bg-[#D9D9D9] rounded-full overflow-hidden">
            <div className="w-1/12 h-full bg-[#FE6E6E]"></div>
          </div>
        </div>
        <button
          onClick={toggleSidebarPopup}
          className="bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] text-white py-3 px-8 text-sm rounded-full duration-200"
        >
          Upgrade
        </button>
        <div className="px-6 border rounded-full py-4 flex  hover:cursor-pointer justify-center gap-2 items-center text-sm hover:bg-[#E5E5E5] hover:text-black duration-200"
          onClick={draftSectionHandler}
        >
          <AiFillEdit/>
          <p className="w-90">draft section</p>
        </div>
        <div
          ref={profileRef}
          onClick={profileClickHandler}
          className="h-12 w-12 rounded-full cursor-pointer relative"
        >
          <div className="w-12 h-12 overflow-hidden rounded-full">
            {imageSrc ? (
              <Image width={100} height={100} alt='profile' src={imageSrc} className='w-full h-full object-cover' />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-semibold">
                {initial}
              </div>
            )}
          </div>
          {showMenu && (
            <div className="w-max absolute top-14 right-0 px-4 py-2 bg-white shadow-[0_0px_30px_0px_rgba(0,0,0,0.1)] rounded-3xl flex flex-col justify-center items-start">
              <Link
                href="/admin/settings"
                className="px-3 py-4 text-[#737373] hover:text-[#000000] w-full text-start duration-200"
              >
                Account Settings
              </Link>
              <button
                onClick={logoutHandler}
                className="px-3 py-4 text-[#FB4C4C] hover:text-[#ff2a2a] w-full text-start duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIdebarHeader;
