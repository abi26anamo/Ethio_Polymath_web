"use client";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const poppins_400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const poppins_500 = Poppins({
  weight: ["500"],
  subsets: ["latin"],
});

const poppins_600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const SingleEpisodeSettings = () => {
  const router = useRouter();
  const params = useParams();
  const { episode, name } = params;
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [freeVideo, setFreeVideo] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [videoName, setVideoName] = useState("");

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoURL(videoURL);

      // Set the video name as the label text
      setVideoName(file.name);
    }
  };

  const cancelVideoHandler = () => {
    setVideoURL("");
    setVideoName("");
  };

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
  const completeHandler = async () => {
    console.log("title: ", title);
    console.log("caption: ", caption);
    console.log("image: ", image);
    console.log("videoURL: ", videoURL);
    router.push(`/admin/hub/settings/episode-settings/${name}`);
  };

  const togglefreevideo = () => {
    setFreeVideo(!freeVideo);
  };

  return (
    <div className="space-y-10 max-w-6xl pb-20 mx-auto">
      <div className="flex justify-between items-center pt-20">
        <h1 className={`${poppins_600.className} text-3xl`}>
          {episode.split("_").join(" ")}
        </h1>
        <button
          onClick={completeHandler}
          className={`${poppins_400.className} ext-white bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] py-3 px-6 transition-all rounded-full text-white text-sm duration-200`}
        >
          Done
        </button>
      </div>
      <div className="space-y-10 max-w-xl">
        <div
          className={`${poppins_400.className} flex justify-between items-center flex-wrap`}
        >
          <p className={`${poppins_600.className} text-base`}>Free Video</p>
          <label
            for="default-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              onClick={togglefreevideo}
              value=""
              id="default-toggle"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FC7B92]"></div>
          </label>
          <p className="w-full flex-shrink-0 text-[#C4C4C4] text-sm">
            To make the video free, click on the toggle button.
          </p>
        </div>
        <div className="space-y-2 w-1/2">
          <p className={`${poppins_600.className} text-base`}>Thumbnail</p>
          <div className="relative rounded-3xl overflow-hidden cover_bg">
            <div className="absolute w-72 h-72 rounded-3xl top-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex justify-center items-center">
              <label
                htmlFor="imageInput"
                className="py-2 px-6 text-white border border-white cover_link rounded-full opacity-100 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Change Cover Photo
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="border border-gray-300 rounded-md p-2 w-72 h-72 hidden"
                onChange={handleImageChange}
              />
            </div>
            {image ? (
              <Image
                width={10}
                height={10}
                src={image}
                alt="Selected"
                className="w-72 h-72"
              />
            ) : (
              <Image
                width={1000}
                height={1000}
                src="/assets/cover.png"
                alt="cover"
                className="w-72 h-72 rounded-md"
              />
            )}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <div className={`space-y-2`}>
          <p className={`${poppins_600.className} text-base`}>Title</p>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-[#E5E5E5] focus-within:outline-0 py-4 px-4"
            placeholder="Title"
            required
          />
        </div>
        <div className={`space-y-2`}>
          <p className={`${poppins_600.className} text-base`}>
            Caption {`(Optional)`}
          </p>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-xl border border-[#E5E5E5] focus-within:outline-0 py-4 px-4"
            placeholder="Caption"
          />
        </div>
        <div>
          <p className={`${poppins_600.className} text-base`}>Video</p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              {videoName && (
                <Image
                  width={10}
                  height={10}
                  src="/assets/icons/cancel.svg"
                  alt="cancel"
                  className="h-3 w-3 cursor-pointer"
                  onClick={cancelVideoHandler}
                />
              )}
              <label
                htmlFor="video-input"
                className={`cursor-pointer ${poppins_400.className} px-5 py-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fe4365] hover:text-white hover:border-white text-[#4B4B4B] text-sm duration-200`}
              >
                {videoName ? videoName : "Upload video"}
              </label>
            </div>
            <input
              id="video-input"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
            {videoURL && (
              <div className="w-full h-1 bg-[#FD95A8] rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEpisodeSettings;
