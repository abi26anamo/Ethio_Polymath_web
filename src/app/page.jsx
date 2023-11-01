"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { number } from "prop-types";
import Popup from "@/componenets/Popup";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaListUl, FaTimes } from "react-icons/fa";

const montserrat500 = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
});

const montserrat600 = Montserrat({
  weight: ["600"],
  subsets: ["latin"],
});

const montserrat700 = Montserrat({
  weight: ["700"],
  subsets: ["latin"],
});

const montserrat900 = Montserrat({
  weight: ["900"],
  subsets: ["latin"],
});

// export const metadata = {
//   title: 'Home'
// }

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [subscribers, setSubscribers] = useState(40);
  const [subscription, setSubscription] = useState(15);
  const [totalValue, setTotalValue] = useState(subscribers * subscription * 1);
  const [price, setPrice] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const getSubsBackground = () => {
    var rate = 10 * (subscribers / 6);
    return rate;
  };

  const getPriceBackground = () => {
    var rate = 2 * (subscription / 3);
    return rate;
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const subscriberChangeHandler = (e) => {
    setSubscribers(e.target.value);
    setTotalValue(Math.floor(e.target.value * subscription * 1));
  };
  const subscriptionChangeHandler = (e) => {
    setSubscription(e.target.value);
    setTotalValue(Math.floor(subscribers * e.target.value * 1));
  };

  const priceChangeHandler = (value) => {
    setPrice(Number(value));
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const subscribersOnChange = (e) => {
    if (!isNaN(e.target.value)) {
      setSubscribers(e.target.value);
      setTotalValue(Math.floor(e.target.value * subscription * 1));
    }
  };

  const subscriptionOnChange = (e) => {
    if (!isNaN(e.target.value)) {
      setSubscription(e.target.value);
      setTotalValue(Math.floor(e.target.value * subscribers * 1));
    }
  };
  return (
    <div className="flex flex-col">
      <div
        className={`sticky -mt-6 lg:top-6 w-full px-10 z-20 ${
          scrollPosition >= 150 ? "top-0" : "top-1"
        }`}
      >
        <div className="bg-white mx-auto px-2 lg:px-10 lg:py-4 flex flex-col lg:flex-row justify-between items-center lg:rounded-full">
          <div
            className={`absolute flex items-center transition-all left-0 top-0 lg:static w-full lg:w-auto justify-between px-2 lg:px-0 
            ${scrollPosition >= 150 ? "bg-white py-1 rounded-b" : ""}
            `}
          >
            <div className="">
              <Link href="/">
                <Image
                  src="/assets/logo.svg"
                  width={500}
                  height={500}
                  className="w-36"
                  alt="home"
                />
              </Link>
            </div>

            <div
              className={`h-12 w-12 flex flex-col justify-center items-center rounded-full cursor-pointer lg:hidden bg-black  ${
                open ? "p-2" : "p-3"
              } z-10`}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <FaTimes size={20} color="white" />
              ) : (
                <FaListUl size={20} color="white" />
              )}
            </div>
            {/* <div
              className={`h-12 w-12 flex flex-col justify-between items-center rounded-full cursor-pointer lg:hidden bg-black  ${
                open ? "p-2" : "p-3"
              } z-10`}
              onClick={() => setOpen(!open)}
            >
              <div
                className={`w-full h-1 rounded-2xl bg-white transition-all duration-200 ease-in ${
                  open ? "rotate-45 mt-4 block" : ""
                }`}
              ></div>
              <div
                className={`w-full h-1 rounded-2xl bg-white transition-all duration-200 ease-in ${
                  open ? "hidden mb-5" : ""
                }`}
              ></div>
              <div
                className={`w-full h-1 rounded-2xl bg-white transition-all duration-200 ease-in ${
                  open ? "-rotate-45 mb-3 inline-block" : ""
                }`}
              ></div>
            </div> */}
          </div>
          <div
            className={`flex flex-col gap-3 lg:flex-row items-start lg:items-center pt-10 lg:pt-0 justify-start lg:justify-center absolute left-0 lg:static w-full lg:h-auto lg:w-auto transition-all duration-500 ease-in ${
              open
                ? "opacity-100 top-[55px] bg-[#522CCA] text-white lg:text-black lg:bg-transparent h-[calc(100vh-55px)]"
                : "opacity-0 lg:opacity-100 top-[55px] left-[-500px]"
            } z-10`}
          >
            <ul className="flex flex-col mx-auto justify-center items-center lg:flex-row lg:items-center gap-10">
              <Link
                href="/"
                className={`hover:text-[#FF2D85] ${montserrat700.className}`}
              >
                HOME
              </Link>
              <Link
                href="/"
                className={`hover:text-[#FF2D85] ${montserrat700.className}`}
              >
                CREATOR CENTER
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 rounded-full border border-[#FF2D85] hover:bg-[#FF2D85] hover:text-white"
              >
                Login
              </Link>
              <button
                onClick={togglePopup}
                className={`px-6 py-3 rounded-full bg-[rgba(255,45,133,1)] hover:bg-[rgba(255,45,133,0.8)] text-white ${montserrat700.className}`}
              >
                JOIN THE WAITLIST
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 lg:-mt-[4.12rem]">
        <div className="col-span-12 md:col-span-7 h-auto relative flex flex-col">
          <div className="order-2 md:absolute bottom-4 flex justify-center w-full absolute ">
            <p className="bg-[#522CCA] px-3 py-2 flex flex-col text-xl lg:text-5xl xl:text-6xl italic text-white font-extrabold md:z-0">
              <span>BUILD SIDE HUSTLES</span>
              <span>WITH YOUR TALENTS</span>
            </p>
          </div>
          <Image
            src="/assets/home.png"
            objectFit="cover"
            sizes="(max-width: 4000px)"
            width={500}
            height={500}
            className="w-full h-full object-cover object-center order-1"
            alt="fun content creation experience"
          />
        </div>
        <div
          className={`col-span-12 md:col-span-5 h-auto bg-[#522CCA] relative ${montserrat700.className}`}
        >
          <div className="lg:absolute top-10 h-full w-full flex items-center justify-center px-3 py-2 z-10">
            <div className="relative xl:-left-24 2xl:-left-32 4xl:-left-48 bg-white flex flex-col gap-3 lg:gap-3 xl:gap-6 4xl:gap-16 items-center px-4 md:px-6 lg:px-7 py-4 md:py-6 lg:py-8 xl:py-12 rounded-[40px] lg:rounded-[60px] w-11/12 max-w-4xl shadow-2xl">
              <div className="my-3 flex flex-col gap-0 text-center">
                <p
                  className={`text-xl lg:text-2xl xl:text-3xl 4xl:text-5xl font-bold ${montserrat700.className}`}
                >
                  POWER TO THE CREATORS.
                </p>
                <p
                  className={`text-xl lg:text-2xl xl:text-3xl 4xl:text-5xl font-bold text-[#FF4666] ${montserrat700.className}`}
                >
                  GET PAID INSTANTLY.
                </p>
              </div>
              <p className="flex items-center text-4xl 4xl:text-6xl">
                ${" "}
                <span
                  className={`text-5xl lg:text-6xl xl:text-8xl 4xl:text-8xl ${montserrat700.className}`}
                >
                  {totalValue}
                </span>
              </p>
              <div className="w-full px-2 lg:px-6 xl:px-10 flex flex-col gap-0 md:gap-3 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg lg:text-xl 4xl:text-2xl">
                    Number of monthly subscribers
                  </p>
                  <input
                    type="text"
                    value={subscribers}
                    className="min-w-0 w-20 border border-[#E2E2E2] rounded-md py-2 text-center text-black focus-within:outline-0 text-lg lg:text-xl 4xl:text-2xl"
                    onChange={subscribersOnChange}
                  />
                </div>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="100"
                  value={subscribers}
                  style={{ backgroundSize: `${subscribers}% 100%` }}
                  onChange={subscriberChangeHandler}
                  step="1"
                />
              </div>
              <div className="w-full px-2 lg:px-6 xl:px-10 flex flex-col gap-0 md:gap-3 mt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg lg:text-xl 4xl:text-2xl">
                    Monthly subscription
                  </p>
                  <input
                    type="text"
                    value={subscription}
                    className="min-w-0 w-20 border border-[#E2E2E2] rounded-md py-2 text-center text-black focus-within:outline-0 text-lg lg:text-xl 4xl:text-2xl"
                    onChange={subscriptionOnChange}
                  />
                  {/* <p className='text-lg lg:text-xl 4xl:text-2xl border w-20 text-center border-[#E2E2E2] rounded-md py-2'>{subscription}</p> */}
                </div>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="150"
                  value={subscription}
                  style={{ backgroundSize: getPriceBackground() + "% 100%" }}
                  onChange={subscriptionChangeHandler}
                  step="1"
                />
              </div>
              <button
                onClick={togglePopup}
                className="w-8/12 px-6 py-6 mt-10 text-xs md:text-base rounded-full bg-[rgba(255,45,133,1)] hover:bg-[rgba(255,45,133,0.8)] text-white"
              >
                JOIN THE WAITLIST
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFE2F3] py-12 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-3 justify-center px-10 lg:px-16 4xl:px-40">
          <p
            className={`px-6 py-2 md:py-3  text-xs md:text-base rounded-full bg-[rgba(255,45,133,1)] ] text-white max-w-max ${montserrat600.className}`}
          >
            Earnings
          </p>
          <p
            className={`flex flex-col text-3xl md:text-4xl lg:text-5xl xl:text-6xl gap-0 md:gap-2 text-[#59002B] ${montserrat900.className}`}
          >
            <span>Your content.</span>
            <span>Your brand.</span>
            <span>Be your own boss.</span>
          </p>
          <p
            className={`text-[#59002B] text-base md:text-xl lg:text-2xl xl:text-3xl ${montserrat600.className} max-w-3xl`}
          >
            Focus on what you do best.
            <br />
            Create, upload, share and monetize.
            <br /> Boom! Grow your side hustle like a solopreneur.
          </p>
          <ul
            className={`list-disc text-[#59002B] px-4 md:text-md lg:text-lg xl:text-xl mb-8 md:mb-0 ${montserrat700.style}`}
          >
            <li>Instant pay out</li>
            <li>Control over how much revenue you make</li>
            <li>Customizable community</li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-5 relative">
          <div className="absolute w-full h-full flex items-center justify-center md:justify-start">
            <div
              className={`bg-[#FBFBFF] rounded-[40px] px-6 py-10 flex flex-col items-center gap-3 md:-ml-6 lg:-ml-16 xl:-ml-24 shadow-2xl w-9/12 sm:w-80 ${montserrat700.className}`}
            >
              <Image
                src="/assets/price.png"
                sizes="(max-width: 2000px)"
                width={500}
                height={500}
                className="w-8 h-8"
                alt="price tag"
              />
              <p className={``}>Set your price</p>
              <p
                onClick={() => priceChangeHandler("6.99")}
                className={`cursor-pointer border w-full rounded-full flex items-center gap-3 px-4 py-2 ${
                  price === 6.99
                    ? "border-[#4A2DFF] bg-[#4A2DFF] text-white"
                    : "border-[#C4C4C4]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full ${
                    price === 6.99
                      ? "border-4 border-[#ffffff]"
                      : "border border-[#C4C4C4]"
                  }`}
                ></span>
                $6.99
              </p>
              <p
                onClick={() => priceChangeHandler("13.99")}
                className={`cursor-pointer border w-full rounded-full flex items-center gap-3 px-4 py-2 ${
                  price === 13.99
                    ? "border-[#4A2DFF] bg-[#4A2DFF] text-white"
                    : "border-[#C4C4C4]"
                }`}
              >
                <span
                  className={`w-4 h-4 border-[#C4C4C4] rounded-full ${
                    price === 13.99
                      ? "border-4 border-[#ffffff]"
                      : "border border-[#C4C4C4]"
                  }`}
                ></span>
                $13.99
              </p>
              <p
                onClick={() => priceChangeHandler("19.99")}
                className={`cursor-pointer border w-full rounded-full flex items-center gap-3 px-4 py-2 ${
                  price === 19.99
                    ? "border-[#4A2DFF] bg-[#4A2DFF] text-white"
                    : "border-[#C4C4C4]"
                }`}
              >
                <span
                  className={`w-4 h-4 border-[#C4C4C4] rounded-full ${
                    price === 19.99
                      ? "border-4 border-[#ffffff]"
                      : "border border-[#C4C4C4]"
                  }`}
                ></span>
                $19.99
              </p>
              <button className="bg-black text-white py-2 px-10 rounded-full my-4">
                Select
              </button>
            </div>
          </div>
          <Image
            src="/assets/home2.png"
            objectFit="cover"
            sizes="(max-width: 4000px)"
            width={500}
            height={500}
            className="w-full"
            alt="educational channel with a beautiful and clean user interface"
          />
        </div>
      </div>
      <div className="bg-[#8C48E3] py-12 grid grid-cols-12 gap-3 px-10 lg:px-16">
        <div className="col-span-12 md:col-span-5 3xl:col-span-6 flex justify-center ">
          <Image
            src="/assets/home_brand.png"
            sizes="(max-width: 4000px)"
            width={500}
            height={500}
            className="w-full md:w-5/6"
            alt="make money with subscribers while teaching your skills"
          />
        </div>
        <div className="col-span-12 md:col-span-7 3xl:col-span-6 flex flex-col gap-3 justify-center px-2">
          <p
            className={`px-6 py-2 md:py-3  text-xs md:text-base rounded-full bg-[rgba(255,235,52,1)] ] text-black max-w-max ${montserrat600.className}`}
          >
            Impact
          </p>
          <p
            className={`flex flex-col text-3xl md:text-4xl lg:text-5xl xl:text-6xl gap-2 text-white ${montserrat900.className} uppercase`}
          >
            <span>make your brand </span>
            <span>the next big thing </span>
          </p>
          <p
            className={`text-white ${montserrat600.className} text-base md:text-xl lg:text-2xl xl:text-3xl max-w-3xl`}
          >
            Whether you're an expert or a beginner, your voice matters. Share
            your passion, showcase your skills, build your community, inspire
            thousands.
          </p>
        </div>
      </div>
      <div className="bg-[#E4FF96] pt-12 grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-6">
          <Image
            src="/assets/home_content.png"
            sizes="(max-width: 4000px)"
            width={500}
            height={500}
            className="w-full"
            alt="easy content creation tool with AI"
          />
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col gap-3 justify-center px-10 lg:px-16 xl:px-16 4xl:px-40">
          <p
            className={`text-green-600 text-lg mt-8 md:mt-0 ${montserrat900.className}`}
          >
            COMING SOON
          </p>
          <p
            className={`px-4 py-2 md:py-3 text-xs md:text-base rounded-full bg-[rgba(0,183,36,1)] ] text-white max-w-max ${montserrat600.className}`}
          >
            New Creation Experience
          </p>
          <p
            className={`flex flex-col text-3xl md:text-4xl lg:text-5xl xl:text-6xl gap-2 text-[#00330B] ${montserrat900.className} uppercase`}
          >
            <span>Less is more.</span>{" "}
          </p>
          <p
            className={`flex flex-col text-sm md:text-xl xl:text-2xl gap-2 -mt-3 md:mt-0 text-[#00330B] ${montserrat600.className} uppercase`}
          >
            <span>Effortless. Expressive. Efficient.</span>{" "}
          </p>
          <p
            className={`text-[#00330B] ${montserrat600.className} text-base md:text-lg lg:text-xl xl:text-2xl max-w-3xl mt-2 md:mt-4`}
          >
            Create your entire course in 1 click with Polymath AI. Content
            creation is made easier than ever.
          </p>
          <button
            onClick={togglePopup}
            className={`w-3/5 lg:5/6 xl:w-2/6 px-6 py-4 mt-2 md:mt-10 rounded-full bg-[#002809] hover:bg-[#0e3c1a] text-[#50FF4D] ${montserrat700.className}`}
          >
            Sign me up!
          </button>
        </div>
        <div className="col-span-12 flex justify-center gap-12 py-8">
          <Link href="/" className="hover:text-[#FF2D85]">
            <AiFillTwitterCircle className="w-6 h-6" alt="twitter" />
          </Link>

          <Link
            href="https://instagram.com/polymathlearn?igshid=YmM0MjE2YWMzOA=="
            className="hover:text-[#FF2D85]"
          >
            <AiFillInstagram className="w-6 h-6" alt="instagram" />
          </Link>

          <Link href="/" className="hover:text-[#FF2D85]">
            <FaFacebook className="w-5 h-5" alt="facebook" />
          </Link>

          <Link href="/" className="hover:text-[#FF2D85]">
            <FaTiktok className="w-5 h-5" alt="tiktok" />
          </Link>
        </div>
      </div>
      <div className="z-50">{showPopup && <Popup onClose={togglePopup} />}</div>
    </div>
  );
};

export default HomePage;    
