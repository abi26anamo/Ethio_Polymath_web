import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

const EpisodeContainer = ({ title, description, onRemove }) => {
  const [isFreeVideo, setIsFreeVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [PhotoSelected, setPhotoSelected] = useState(false);

  const descriptionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;

    if (descriptionElement) {
      descriptionElement.scrollTop = descriptionElement.scrollHeight;
    }
  }, [isEditing, isTitleEditing]);

  const handleFreeVideo = () => {
    setIsFreeVideo(!isFreeVideo);
  };

  const handleRemove = () => {
    if (typeof onRemove === "function") {
      onRemove();
    }
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  const handleStartTitleEditing = () => {
    setIsTitleEditing(true);
  };

  const handleStopTitleEditing = () => {
    setIsTitleEditing(false);
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const videoURL = URL.createObjectURL(file);
      const videoFileName = file.name;

      setSelectedVideo(videoFileName);
    }
  };

  const handleCancelVideo = () => {
    setSelectedVideo(null);
  };

  const ImageUploadHandler = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setPhotoSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: ImageUploadHandler,
  });

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 md:px-4 border-1 border-solid border-[1px] border-gray-300 rounded-[30px] ">
        <div
          className="w-[10%] h-[90%]  flex items-center justify-center border border-dashed rounded-[10px] cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {!selectedImage ? (
            <div className=" w-[100%] h-[100px]">
              <label className="flex justify-center cursor-pointer items-center w-[100%] h-[100px]">
                <div className="flex flex-col  md:flex-row justify-center items-center">
                  <img src="/assets/icons/upload.svg" />
                  <p className="ml-2">Upload</p>
                </div>
              </label>
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="w-[100px] md:w-[120px] h-[100px] md:h-[110px] rounded-xl flex items-center justify-center overflow-hidden cursor-default">
                <Image
                  src={selectedImage}
                  alt="Selected Image"
                  width={150}
                  height={150}
                  objectFit="cover"
                  className="h-[100%] w-[100%]"
                />
              </div>
              {PhotoSelected && isHovered && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 z-50 rounded-xl flex items-center justify-center"
                  style={{ pointerEvents: isHovered ? "none" : "" }}
                >
                  <p className="text-white text-xl">Update</p>
                </div>
              )}
            </div>

          )}
        </div>
        <div className="flex flex-col justify-center w-full md:w-[10%] relative">
          <p
            ref={titleRef}
            contentEditable={isTitleEditing}
            className={`px-2 py-2 bg-white text-gray-700 focus:outline-none ${
              isTitleEditing ? "border-b border-gray-500 line-height-[1]" : ""
            }`}
            onMouseDown={handleStartTitleEditing}
            onBlur={handleStopTitleEditing}
          >
            {title}
          </p>
        </div>

        <div className="w-full md:w-[22%] [&::-webkit-scrollbar]:hidden focus:outline-none relative">
          <p
            ref={descriptionRef}
            contentEditable={isEditing}
            className={`h-full w-full m-2 px-2 [&::-webkit-scrollbar]:hidden focus:outline-none py-1 bg-white text-gray-700 max-h-[125px] overflow-auto ${
              isEditing ? "border-b border-gray-500 line-height-[1]" : ""
            }`}
            onMouseDown={handleStartEditing}
            onBlur={handleStopEditing}
          >
            {description}
          </p>
        </div>

        <div className="w-[6%] xl:w-[4%] h-[32px] flex items-center justify-center">
          <div
            onClick={() => handleFreeVideo()}
            className={classNames(
              "flex items-center w-11 h-6 py-1 px-1 rounded-full transition-all duration-500 cursor-pointer",
              {
                "bg-[#FC7B92]": isFreeVideo,
                "bg-[#D9D9D9]": !isFreeVideo,
              }
            )}
          >
            <span
              className={classNames(
                "w-[18px] h-[18px] bg-white rounded-full transition-all duration-500 shadow-2xl",
                {
                  "ml-[18px] flex-shrink-0": isFreeVideo,
                }
              )}
            ></span>
          </div>
        </div>
        {selectedVideo ? (
         <div className="w-full md:w-[17%] px-5">
          <div className="flex items-center h-[48px] border-1 px-2 border-solid border-[1px] border-gray-300 rounded-[10px] gap-3 xl:gap-3">
            <Image src="/assets/icons/episodes.svg" width={20} height={20} />

            <div className="flex-grow overflow-hidden">
              <p className="truncate overflow-hidden whitespace-nowrap px-5">
                {selectedVideo}
              </p>
            </div>

            <button
              onClick={() => handleCancelVideo()}
              className="cursor-pointer text-grey-500 flex justify-center items-center"
            >
              <Image
                src="/assets/icons/close-circle-outline.svg"
                width={20}
                height={20}
                alt="Cancel Video"
                className="text-grey-500 hover:text-grey-700"
              />
            </button>
          </div>
       </div>
       
        ) : (
          <div className="w-full md:w-[17%]">
            <div className="flex justify-center items-center hover:bg-[rgb(250,160,160)] gap-2 h-[48px] bg-[rgb(255,85,116)] px-6 py-2 rounded-xl text-white duration-200">
              <label className={`cursor-pointer`}>
                <div className="flex justify-center items-center">
                  <div className="flex items-center justify-center rounded w-[17px] h-[17px] border border-solid 2px">
                    +
                  </div>
                  <p className="ml-2">Upload</p>
                </div>
                <input
                  id="video-input"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleVideoUpload(e)}
                />
              </label>
            </div>
          </div>
        )}
        <div className="flex flex-col items-end w-[4%] xl:w-[3%] h-[45px] md:h-[75px] ">
          <div className="w-[100%] mt-5 h-[45%] flex items-center justify-center rounded-full border-0 lg:border border-white lg:border-gray-300 hover:cursor-pointer hover:bg-gray-200 duration-200 ">
            <img
              src="/assets/icons/trash-outline.svg"
              width={20}
              height={20}
              onClick={() => handleRemove()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer;
