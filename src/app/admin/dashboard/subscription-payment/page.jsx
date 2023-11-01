"use client";
import SIdebarHeader from "@/componenets/SIdebarHeader";
import SubscriptionPopup from "@/componenets/SubscriptionPopup";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import Link from "next/link";

const poppins600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const SubscriptionPaymentPage = () => {
  const [sidebarPopup, setSidebarPopup] = useState(false);
  const [stripeConnection, setStripeConnection] = useState(false);
  const [subscriptionState, setSubscriptionState] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("monthly");
  const toggleSidebarPopup = () => {
    setSidebarPopup(!sidebarPopup);
  };

  const stripeConnectionHandler = () => {
    setStripeConnection(!stripeConnection);
  };

  const subscriptionOnHandler = (name) => {
    setSubscriptionState(name);
  };

  const selectedSubscriptionHandler = (name) => {
    setSelectedSubscription(name);
  };
  return (
    <div className="flex-1 flex flex-col">
      <SIdebarHeader
        title="Subscription and Payment"
        toggleSidebarPopup={toggleSidebarPopup}
      />
      <div className="flex justify-between px-2 pb-2 pt-4">
        <h1 className={`${poppins600.className} text-xl`}>
          Subscription Management
        </h1>
        {subscriptionState && (
          <div className="flex items-center gap-10">
            <Link
              href="/admin/dashboard/subscription-payment/archived"
              onClick={() => subscriptionOnHandler("archived")}
              className={classNames(
                "rounded-full text-sm text-[#4B4B4B] hover:text-[#808080] duration-200",
                {
                  "text-[#4B4B4B]": subscriptionState === "archived",
                }
              )}
            >
              Archived
            </Link>
            <Link
              href="/admin/dashboard/subscription-payment/settings"
              onClick={() => subscriptionOnHandler("subscriptionsettings")}
              className={classNames(
                "rounded-full text-sm text-[#4B4B4B] hover:text-[#808080] duration-200",
                {
                  "text-[#4B4B4B]":
                    subscriptionState === "subscriptionsettings",
                }
              )}
            >
              Subscription Settings
            </Link>

            <Link
              href=""
              onClick={() => subscriptionOnHandler("stripelogin")}
              className={classNames(
                "rounded-full text-sm text-[#4B4B4B] hover:text-[#808080] duration-200",
                {
                  "text-[#4B4B4B]": subscriptionState === "stripelogin",
                }
              )}
            >
              Stripe Login Page
            </Link>
            <Link
              href="/admin/dashboard/subscription-payment/create"
              onClick={() => subscriptionOnHandler("createsubscription")}
              className={classNames("py-3 px-4 rounded-full text-sm", {
                "bg-[#9D8AFF] text-white hover:bg-[#6e51ff] hover:text-white duration-200":
                  subscriptionState === "createsubscription",
              })}
            >
              Create Subscription
            </Link>
          </div>
        )}
      </div>
      <div className="flex-1">
        {!stripeConnection && (
          <div className="h-full flex flex-col justify-center items-center space-y-4">
            <p className={`${poppins400.className} text-base text-[#C4C4C4]`}>
              You have not linked with Stripe yet
            </p>
            <button
              onClick={stripeConnectionHandler}
              className="py-3 px-10 text-[#4B4B4B] border border-[#C4C4C4] rounded-full hover:bg-[#2e2e2e] hover:text-white text-sm duration-200"
            >
              Link with Stripe
            </button>
          </div>
        )}
        {stripeConnection && !subscriptionState && (
          <div className="h-full flex flex-col justify-center items-center space-y-4">
            <p className={`${poppins400.className} text-base text-[#C4C4C4]`}>
              You don’t have any subscription now.
            </p>
            <button
              onClick={() => subscriptionOnHandler("createsubscription")}
              className="py-3 px-10 text-white border border-[#C4C4C4] rounded-full bg-[#9D8AFF] hover:bg-[#6e51ff] hover:text-white text-sm duration-200"
            >
              Create Subscription
            </button>
          </div>
        )}
        {subscriptionState === "createsubscription" && (
          <div className="flex gap-4 justify-center py-10">
            <div
              // onClick={() => selectedSubscriptionHandler('yearly')}
              className={`w-1/4 shadow-[0_0px_20px_0px_rgba(0,0,0,0.05)] p-8 rounded-3xl space-y-2 text-center cursor-pointer ${
                selectedSubscription === "yearly" ? "bg-[#FBFBFF]" : ""
              } transition-all delay-150`}
            >
              <p className={`${poppins600.className} text-xl`}>
                1 Month Premium Subscription
              </p>
              <p
                className={`"${poppins600.className}" text-sm text-[#C4C4C4]  pb-2`}
              >
                Join our monthly subscription and enjoy exclusive access to our
                premium content, personalized recommendations, and member-only
                resources.
              </p>
              <p className="text-5xl pt-3 pb-0">$88</p>
              <p className="text-[#C4C4C4]">every month</p>
              <ul className="text-left space-y-4 py-3">
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Get exclusive access to premium content</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Join a community of like-minded individuals</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Access member-only resources and tools</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>
                    Choose from flexible subscription options to fit your needs
                    and budget
                  </span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Experience a seamless and user-friendly platform</span>
                </li>
              </ul>
            </div>
            <div
              // onClick={() => selectedSubscriptionHandler('monthly')}
              className={`w-1/4 shadow-[0_0px_20px_0px_rgba(0,0,0,0.05)] p-8 rounded-3xl space-y-2 text-center cursor-pointer ${
                selectedSubscription === "monthly" ? "bg-[#ffffff]" : ""
              } transition-all delay-150`}
            >
              <div className="flex justify-center">
                <p className="bg-[#2e2e2e] py-2 px-3 rounded-lg text-white text-xs w-min text-center">
                  Recommended
                </p>
              </div>
              <p className={`${poppins600.className} text-xl`}>
                12 Months Premium Subscription
              </p>
              <p
                className={`"${poppins600.className}" text-sm text-[#C4C4C4]  pb-2`}
              >
                Join our monthly subscription and enjoy exclusive access to our
                premium content, personalized recommendations, and member-only
                resources.
              </p>
              <p className="text-5xl pt-3 pb-0">$880</p>
              <p className="text-[#C4C4C4]">every 12 months</p>
              <ul className="text-left space-y-4 py-3">
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Get exclusive access to premium content</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Join a community of like-minded individuals</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Access member-only resources and tools</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>
                    Choose from flexible subscription options to fit your needs
                    and budget
                  </span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Experience a seamless and user-friendly platform</span>
                </li>
              </ul>
            </div>
            <div
              // onClick={() => selectedSubscriptionHandler('lifetime')}
              className={`w-1/4 shadow-[0_0px_20px_0px_rgba(0,0,0,0.05)] p-8 rounded-3xl space-y-2 text-center cursor-pointer ${
                selectedSubscription === "lifetime" ? "bg-[#FBFBFF]" : ""
              } transition-all delay-150`}
            >
              <p className={`${poppins600.className} text-xl`}>
                Lifetime Member
              </p>
              <p
                className={`"${poppins600.className}" text-sm text-[#C4C4C4]  pb-2`}
              >
                Join our monthly subscription and enjoy exclusive access to our
                premium content, personalized recommendations, and member-only
                resources.
              </p>
              <p className="text-5xl pt-3 pb-0">$1888</p>
              <p className="text-[#C4C4C4]">Life Time</p>
              <ul className="text-left space-y-4 py-3">
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Get exclusive access to premium content</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Join a community of like-minded individuals</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>Access member-only resources and tools</span>
                </li>
                <li className="flex gap-2 text-sm">
                  {" "}
                  <span className="text-[#FC7B92]">&#10004;</span>{" "}
                  <span>
                    Choose from flexible subscription options to fit your needs
                    and budget
                  </span>
                </li>
                {/* <li className='flex gap-2 text-sm'> <span className='text-[#FC7B92]'>&#10004;</span> <span>Experience a seamless and user-friendly platform</span></li> */}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="absolute z-50">
        {sidebarPopup && <SubscriptionPopup onClose={toggleSidebarPopup} />}
      </div>
    </div>
  );
};

export default SubscriptionPaymentPage;
