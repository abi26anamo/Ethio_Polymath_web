"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Poppins } from "next/font/google";
import { useDispatch } from "react-redux";
import { getSingleHub } from "@/redux/features/hub/hubSlice";
import { useSelector } from "react-redux";

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const poppins600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const SingleHubPage = ({ params }) => {
  const urlparams = useParams();
  const dispatch = useDispatch();
  const { name } = urlparams;

  const { hub } = useSelector((state) => state.hub);

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getSingleHub(name));
  }, [dispatch, name]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedImage && allowedTypes.includes(selectedImage.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError("");
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setError("Please select a valid image (JPEG, PNG, or GIF).");
    }
  };

  return (
    <div className="space-y-3 max-w-7xl">
      <div className="py-5">
        <Link
          href="/admin/dashboard/video-management"
          className="flex items-center gap-2"
        >
          <Image
            width={10}
            height={10}
            src="/assets/icons/arrowLeft.svg"
            alt="arrow"
            className="w-3 h-3"
          />
          <p className={`${poppins400.className}`}>Back</p>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className={`${poppins600.className} text-3xl`}>{hub?.title}</h1>
        <Link
          href={`/admin/hub/settings/basic-settings/${name}`}
          className={`${poppins400.className} flex items-center gap-2 text-sm border border-[#C4C4C4] py-3 px-5 rounded-full text-[#4B4B4B] hover:bg-[#2e2e2e] hover:text-white duration-200`}
        >
          Settings
        </Link>
      </div>
      <div className="flex gap-32 pb-24">
        <div className="w-80 2xl:w-[450px]">
          <p className={`${poppins600.className} text-xl py-2`}>Cover Photo</p>
          <div className="relative w-96 rounded-3xl overflow-hidden cover_bg">
            <div className="absolute w-96 h-full rounded-3xl top-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex justify-center items-center">
              <label
                htmlFor="imageInput"
                className="py-3 px-6 text-white border border-white cover_link rounded-full opacity-100 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Change Cover Photo
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="border border-gray-300 rounded-md p-2 w-96 hidden"
                onChange={handleImageChange}
              />
            </div>
            {image ? (
              <Image
                width={10}
                height={10}
                src={image}
                alt="Selected"
                className="w-96 h-auto"
              />
            ) : (
              <Image
                width={1000}
                height={1000}
                src="/assets/cover.png"
                alt="cover"
                className="w-96 rounded-md"
              />
            )}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <p className={`${poppins600.className} text-xl pt-6 pb-2`}>
            Hub Description
          </p>
          <p className={`${poppins400.className} text-[#4B4B4B] text-sm`}>
            {hub.content}
          </p>
          <p className={`${poppins600.className} text-xl pt-6 pb-4`}>
            Learning Objectives
          </p>
          <div
            className={`flex flex-wrap gap-3 text-white text-xs ${poppins400.className}`}
          >
            <p className={`rounded-full py-2 px-4 bg-[#A293FF]`}>
              Understanding for basic financial analysis
            </p>
            <p className={`rounded-full py-2 px-4 bg-[#A293FF]`}>
              Understanding of the terms
            </p>
            <p className={`rounded-full py-2 px-4 bg-[#A293FF]`}>
              Financial freedom (hopefully)
            </p>
          </div>
        </div>
        <div className="flex-1">
          <p className={`${poppins600.className} text-xl pb-4 pt-4`}>
            Episodes
          </p>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-full flex gap-6 justify-center items-start"
              >
                <div className="h-32 w-32 bg-gray-200 flex-shrink-0 rounded-xl"></div>
                <div className="h-32 space-y-2">
                  <p className={`${poppins600.className} text-xl line-clamp-1`}>
                    Finance Analysis 101
                  </p>
                  <p
                    className={`${poppins400.className} text-[#C4C4C4] text-sm line-clamp-4`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum blandit sem non sapien molestie, consectetur
                    molestie dolor varius. Cras dictum tellus velit, ut feugiat
                    leo mattis a. Mauris id dictum ante.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHubPage;
