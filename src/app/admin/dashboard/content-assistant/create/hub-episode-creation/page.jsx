"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ClosePopup from "@/componenets/ClosePopup";
import { Steps } from "@/componenets";
import Header from "@/componenets/Header";
import { FaAngleLeft } from "react-icons/fa";

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const poppins600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const HubEpisodeCreation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState("2");

  const handleStepClick = (stepNum) => {
    const data = {
      ...sessionData,
      objectiveValues,
      objectives,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    setActiveStep(stepNum);
  };

  const sessionData = sessionStorage.getItem("data")
    ? JSON.parse(sessionStorage.getItem("data"))
    : null;

  const [closeMessage, setCloseMessage] = useState(false);

  const [file, setFile] = useState(null);

  const [objectives, setSelectedObjectives] = useState(
    sessionData.objectives ? sessionData.objectives : 1
  );
  const [objectiveValues, setObjectiveValues] = useState(
    sessionData.objectiveValues
      ? sessionData.objectiveValues
      : Array.from({ length: objectives }, () => ({
          title: "",
          caption: "",
          freeVideo: false,
          thumbnail: null,
          error: "",
          titleError: "",
          thumbnailError: "",
          videoError: "",
          videoValues: {
            videoURL: "",
            videoName: "",
            videoError: "",
          },
        }))
  );

  const [inputValue, setInputValue] = useState({
    title: sessionData ? sessionData?.title : "",
    description: sessionData ? sessionData?.description : "",
  });

  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState("");

  const { isHubCreated, message, isError } = useSelector((state) => state.hub);

  useEffect(() => {
    setObjectiveValues((prevValues) => {
      return Array.from({ length: objectives }, (item, index) => ({
        title: prevValues[index] ? prevValues[index].title : "",
        caption: prevValues[index] ? prevValues[index].caption : "",
        freeVideo: prevValues[index] ? prevValues[index].freeVideo : false,
        thumbnail: prevValues[index] ? prevValues[index].thumbnail : null,
        error: prevValues[index] ? prevValues[index].thumbnail : null,
        titleError: "",
        thumbnailError: "",
        videoError: "",
        videoValues: prevValues[index]
          ? prevValues[index].videoValues
          : {
              videoURL: "",
              videoName: "",
              videoError: "",
            },
      }));
    });

    if (file) {
      setFileError("");
    }
  }, [objectives, file, router, isError, dispatch]);

  const toogleCloseMessage = () => {
    setCloseMessage(!closeMessage);
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const completeHandler = () => {
    const data = {
      ...sessionData,
      objectiveValues,
      objectives,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    router.push("/admin/dashboard/video-management");
  };

  const onBackClickHandler = () => {
    router.push("/admin/dashboard/content-assistant/create/hub-title-creation");
  };

  const onNextClickHandler = () => {
    const data = {
      ...sessionData,
      objectiveValues,
      objectives,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    router.push(
      "/admin/dashboard/content-assistant/create/hub-general-information"
    );
  };

  const stepChangeHandler = (i) => {
    setCurrentState(i);
  };

  const episodeChangeHandler = (i) => {
    if (i === "increase") {
      if (objectives < 10) {
        setSelectedObjectives(objectives + 1);
      }
    } else if (i === "decrease" && objectives > 1) {
      setSelectedObjectives(objectives - 1);
    }
  };

  const handleObjectiveChange = (index, id, value) => {
    const newObjectiveValues = [...objectiveValues];
    newObjectiveValues[index][id] = value;
    setObjectiveValues(newObjectiveValues);
  };

  const togglefreevideo = (id) => {
    const newObjectiveValues = [...objectiveValues];
    newObjectiveValues[id].freeVideo = !newObjectiveValues[id].freeVideo;
    setObjectiveValues(newObjectiveValues);
  };

  const handleImageChange = (index, e) => {
    const newObjectiveValues = [...objectiveValues];
    const selectedImage = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedImage && allowedTypes.includes(selectedImage.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newObjectiveValues[index].thumbnail = reader.result;
        newObjectiveValues[index].error = "";
        console.log("newObjectiveValues:", newObjectiveValues);
        setObjectiveValues(newObjectiveValues);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      newObjectiveValues[index].thumbnail = null;
      newObjectiveValues[index].error = "Please select a valid image.";
      setObjectiveValues(newObjectiveValues);
    }
  };

  const handleVideoChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        const updatedObjectiveValues = [...objectiveValues];
        updatedObjectiveValues[index].videoValues = {
          videoURL: URL.createObjectURL(file),
          videoName: file.name,
          videoError: "",
        };
        console.log("video-updatedObjectiveValues:", updatedObjectiveValues);
        setObjectiveValues(updatedObjectiveValues);
      } else {
        const updatedObjectiveValues = [...objectiveValues];
        updatedObjectiveValues[index].videoValues = {
          videoURL: "",
          videoName: "",
          videoError: "Invalid file format. Please choose a video file.",
        };
        setObjectiveValues(updatedObjectiveValues);
      }
    }
  };

  const cancelVideoHandler = (index) => {
    const tempObj = [...objectiveValues];
    tempObj[index].videoValues.videoError = "";
    tempObj[index].videoValues.videoName = "";
    tempObj[index].videoValues.videoURL = "";
    setObjectiveValues(tempObj);
  };

  const saveHandler = () => {
    setCloseMessage(!closeMessage);
  };

  return (
    <div
      className={`fixed overflow-y-auto inset-0 bg-white ${poppins400.className}`}
    >
      <div className="flex justify-between items-center">
        <button onClick={saveHandler}>
          <Header />
        </button>
        <button
          onClick={saveHandler}
          className={`${poppins400.className} text-xs hover:bg-[#2e2e2e] hover:text-white border py-3 px-6 mx-4 mt-2 transition-all rounded-full duration-200`}
        >
          Save and Exit
        </button>
      </div>
      <div className="min-h-[90vh] flex justify-center pb-12">
        <div className="flex flex-col justify-end items-end w-[450px]">
          <button
            onClick={onBackClickHandler}
            className="px-6 border rounded-full py-4 flex justify-center gap-2 items-center text-sm hover:bg-[#2e2e2e] hover:text-white w-min duration-200"
          >
            <FaAngleLeft /> Back
          </button>
        </div>
        <div className="w-1/2 flex flex-col justify-between items-center">
          <div className="space-y-4 pt-8 pb-20 w-3/4 mx-auto">
            <div className="">
              <p className={`${poppins600.className}  text-xl`}>
                Let’s Design Your Hub
              </p>
              <div className="py-4">
                <div className="flex justify-between w-full">
                  <p className={`${poppins400.className} text-[#000000]`}>
                    Number of Episodes
                  </p>
                  <div className="flex justify-end items-center gap-10">
                    <div
                      onClick={() => episodeChangeHandler("decrease")}
                      className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <p className="-mt-[0px]">-</p>
                    </div>
                    <p>{objectives}</p>
                    <div
                      onClick={() => episodeChangeHandler("increase")}
                      className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <p className="-mt-[0px]">+</p>
                    </div>
                  </div>
                </div>
                <p className={`${poppins400.className} text-sm text-[#c4c4c4]`}>
                  Note: the maximum amount of episodes is 10.
                </p>
              </div>
              <div className="space-y-8">
                {objectiveValues.map((objective, index) => (
                  <div key={index} className="space-y-4 py-4">
                    <p className={`${poppins600.className}`}>
                      Episode {index + 1}
                    </p>
                    <div
                      className={`flex justify-between items-center flex-wrap`}
                    >
                      <p
                        className={`${poppins400.className} text-[#000000] text-sm`}
                      >
                        Free Video
                      </p>
                      <div
                        onClick={() => togglefreevideo(index)}
                        className={classNames(
                          "flex items-center w-11 h-6 py-1 px-1 rounded-full transition-all duration-500 cursor-pointer",
                          {
                            "bg-[#FC7B92]": objective.freeVideo,
                            "bg-[#D9D9D9]": !objective.freeVideo,
                          }
                        )}
                      >
                        <span
                          className={classNames(
                            "w-[18px] h-[18px] bg-white rounded-full transition-all duration-100 shadow-2xl",
                            {
                              "ml-[18px] flex-shrink-0": objective.freeVideo,
                            }
                          )}
                        ></span>
                      </div>
                      <p
                        className={`${poppins400.className} w-full flex-shrink-0 text-sm text-[#C4C4C4]`}
                      >
                        To make the video free, click on the toggle button.
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <div className="py-0">
                        <div className="space-y-2">
                          <label
                            htmlFor=""
                            className={`${poppins400.className} text-[#000000] text-sm`}
                          >
                            Thumbnail
                          </label>
                          <div className="relative rounded-2xl w-40 h-40 bg-[#F9F9F9] overflow-hidden">
                            <div className="absolute w-full h-full rounded-lg top-0 bg-opacity-0 hover:bg-opacity-30 transition-all flex justify-center items-center">
                              <label
                                htmlFor={`imageInput_${index}`}
                                className="py-3 w-2/3 text-xs border border-[#E5E5E5] rounded-full opacity-100 hover:bg-[#2e2e2e] hover:text-white transition-opacity cursor-pointer flex items-center justify-center gap-2 duration-200"
                              >
                                <Image
                                  width={10}
                                  height={10}
                                  src="/assets/icons/upload.svg"
                                  alt="Selected"
                                  className="h-3 w-3"
                                />
                                Upload
                              </label>
                              <input
                                id={`imageInput_${index}`}
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 rounded-md p-2 w-full hidden"
                                onChange={(e) => handleImageChange(index, e)}
                              />
                            </div>
                            {objectiveValues[index].thumbnail && (
                              <Image
                                width={10}
                                height={10}
                                src={objectiveValues[index].thumbnail}
                                alt="Selected"
                                className="w-full h-auto thumbnail"
                              />
                            )}
                          </div>
                          {objectiveValues[index]?.thumbnailError && (
                            <p className="text-xs text-red-500">
                              {objectiveValues[index].thumbnailError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor=""
                            className={`${poppins400.className} text-sm`}
                          >
                            Title
                          </label>
                          <input
                            placeholder={`Objective ${index + 1}`}
                            name="objective"
                            id={`objective_${index}`}
                            value={objective.title}
                            onChange={(e) =>
                              handleObjectiveChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            type="text"
                            className="w-full rounded-xl text-sm border border-[#E5E5E5] focus-within:outline-0 py-4 px-4"
                          />
                          {objectiveValues[index]?.titleError && (
                            <p className="text-xs text-red-500">
                              {objectiveValues[index].titleError}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor=""
                            className={`${poppins400.className} text-sm`}
                          >
                            Caption (Optional)
                          </label>
                          <input
                            placeholder={`Objective ${index + 1}`}
                            name="objective"
                            id={`objective_${index}`}
                            value={objective.caption}
                            onChange={(e) =>
                              handleObjectiveChange(
                                index,
                                "caption",
                                e.target.value
                              )
                            }
                            type="text"
                            className="w-full rounded-xl text-sm border border-[#E5E5E5] focus-within:outline-0 py-4 px-4"
                          />
                        </div>
                      </div>
                    </div>

                    <div className={`flex flex-col`}>
                      <div className="flex justify-between items-center">
                        <p
                          className={`${poppins400.className} text-sm text-[#000000]`}
                        >
                          Video
                        </p>
                        <div>
                          {!objective?.videoValues?.videoURL && (
                            <div className="cursor-pointer flex gap-2 text-xs border border-[#e5e5e5] hover:bg-[#fe4365] text-[#4B4B4B] hover:text-white hover:border-white px-5 py-3 rounded-xl duration-200">
                              <label
                                htmlFor="video-input"
                                className={`cursor-pointer`}
                              >
                                Upload
                              </label>
                              <input
                                id="video-input"
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) => handleVideoChange(index, e)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {objective?.videoValues?.videoURL && (
                        <>
                          <div className="space-y-4 pt-4 py-3 relative">
                            <Image
                              width={10}
                              height={10}
                              src="/assets/icons/cancel.svg"
                              alt="cancel"
                              className="h-3 w-3 cursor-pointer absolute top-0 left-0"
                              onClick={() => cancelVideoHandler(index)}
                            />
                            <label
                              htmlFor="video-input"
                              className={`cursor-pointer ${poppins400.className} px-5 py-3 rounded-xl border border-[#e5e5e5] hover:bg-[#fe4365] hover:text-white hover:border-white text-[#4B4B4B] text-xs duration-200`}
                            >
                              {objective?.videoValues?.videoName}
                            </label>
                          </div>
                          <div className="w-full flex-shrink-0 h-1 bg-[#FD95A8] rounded-full"></div>
                        </>
                      )}
                      {objectiveValues[index]?.videoError && (
                        <p className="text-xs text-red-500">
                          {objectiveValues[index].videoError}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <Steps activeStep={activeStep} onStepClick={handleStepClick} />
          </div>
        </div>

        <div className="flex flex-col px-3 w-[450px] justify-between">
          <div className="space-y-12 pt-10 pr-10 relative">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Image
                  height={10}
                  width={10}
                  src="/assets/icons/tip.svg"
                  className="w-5 h-5"
                  alt="tip"
                />
                <p
                  className={`${poppins600.className} text-base flex gap-2 items-center`}
                >
                  Tips on amount of free videos
                </p>
              </div>
              <div
                className={`${poppins400.className} text-sm border-l-2 border-[#FC7B92] pl-4 text-[#C4C4C4]`}
              >
                Number of free videos amount shouldn’t be above 20%. For
                example, if a hub has 10 videos, the amount of free videos
                shouldn’t be above 2.
              </div>
            </div>
            <div className="space-y-2">
              <div
                className={`${poppins600.className} text-base flex gap-2 items-center`}
              >
                <Image
                  height={10}
                  width={10}
                  src="/assets/icons/tip.svg"
                  className="w-5 h-5"
                  alt="tip"
                />
                <p
                  className={`${poppins600.className} text-base flex gap-2 items-center`}
                >
                  Tips about free videos
                </p>
              </div>
              <div
                className={`${poppins400.className} text-sm border-l-2 border-[#FC7B92] pl-4 text-[#C4C4C4]`}
              >
                We usually recommend making the 1st video a free introduction.
              </div>
            </div>
          </div>
          <button
            onClick={onNextClickHandler}
            className="px-8 w-max border rounded-full py-4 flex justify-center gap-2 items-center text-sm bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] text-white duration-200"
          >
            Next
          </button>
        </div>
      </div>
      {closeMessage && (
        <ClosePopup onClose={toogleCloseMessage} onSubmit={completeHandler} />
      )}
    </div>
  );
};
export default HubEpisodeCreation;
