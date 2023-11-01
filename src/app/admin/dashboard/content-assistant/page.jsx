"use client";
import React, { useEffect, useState } from "react";
import HubGenerator from "@/componenets/HubGenerator";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import Link from "next/link";
import { logout } from "@/redux/features/auth/authSlice";
import SIdebarHeader from "@/componenets/SIdebarHeader";
import SubscriptionPopup from "@/componenets/SubscriptionPopup";
const ContentAssistantPage = () => {
  const [sidebarPopup, setSidebarPopup] = useState(false);

  const toggleSidebarPopup = () => {
    setSidebarPopup(!sidebarPopup);
  };
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const profileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const profileClickHandler = () => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col overflow-y-auto gap-5">
      <SIdebarHeader title="Content Asistant" toggleSidebarPopup={toggleSidebarPopup} />
      <div className="flex-1">
        <HubGenerator />
      </div>
      <div className="absolute z-50">
        {sidebarPopup && <SubscriptionPopup onClose={toggleSidebarPopup} />}
      </div>
    </div>
  );
};

export default ContentAssistantPage;
