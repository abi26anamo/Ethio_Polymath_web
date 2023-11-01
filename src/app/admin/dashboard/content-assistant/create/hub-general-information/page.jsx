"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import { useRouter,useSearchParams } from "next/navigation";
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

const steps = [1, 2, 3, 4];
const categories = ["design", "text", "business", "marketing", "cooking"];

const HubGeneralInformation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState("3");
  const content = searchParams.get("content")||"";

  const handleStepClick = (stepNum) => {
    const data = {
      ...sessionData,
      description,
      learnings,
      learningObjective,
      selectedCategory,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    setActiveStep(stepNum);
  };

  const sessionData = sessionStorage.getItem("data")
    ? JSON.parse(sessionStorage.getItem("data"))
    : null;

  const [closeMessage, setCloseMessage] = useState(false);

  const [file, setFile] = useState(null);
  const [currentState, setCurrentState] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState(
    sessionData ? sessionData.selectedCategory : ""
  );
  const [categoryError, setCategoryError] = useState("");

  const [learnings, setLearnings] = useState(
    sessionData.learnings ? sessionData.learnings : 2
  );
  const [learningObjective, setLearningObjective] = useState(
    sessionData.learningObjective
      ? sessionData.learningObjective
      : Array.from({ length: learnings }, () => ({
          title: "",
          titleError: "",
        }))
  );
  const defaultDescription = sessionData ? (sessionData?.content ||sessionData?.description ) : "";
  const [inputValue, setInputValue] = useState({
    description: defaultDescription,
  });

  const { description } = inputValue;

  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState("");

  const { isError } = useSelector((state) => state.hub);

  useEffect(() => {
    setLearningObjective((prevValues) => {
      return Array.from({ length: learnings }, (item, index) => ({
        title: prevValues[index] ? prevValues[index].title : "",
        titleError: "",
      }));
    });

    if (file) {
      setFileError("");
    }
  }, [learnings, file, router, isError, dispatch]);

  const toogleCloseMessage = () => {
    setCloseMessage(!closeMessage);
  };

  const handleLearningsChange = (index, value) => {
    const newObjectiveValues = [...learningObjective];
    newObjectiveValues[index].title = value;
    setLearningObjective(newObjectiveValues);
  };

  const objectiveClickHandler = (i) => {
    if (i === "increase") {
      if (learnings < 5) {
        setLearnings(learnings + 1);
      }
    } else if (i === "decrease" && learnings > 1) {
      setLearnings(learnings - 1);
    }
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

  const onBackClickHandler = () => {
    router.push(
      "/admin/dashboard/content-assistant/create/hub-episode-creation"
    );
  };

  const completeHandler = () => {
    const data = {
      ...sessionData,
      description,
      learnings,
      learningObjective,
      selectedCategory,
    };
    // const cleanedData = removeMediaAndErrors(data);
    sessionStorage.setItem("data", JSON.stringify(data));
    router.push("/admin/dashboard/video-management");
  };
  const onNextClickHandler = () => {
    const data = {
      ...sessionData,
      description,
      learnings,
      learningObjective,
      selectedCategory,
    };
    // const cleanedData = removeMediaAndErrors(data);
    sessionStorage.setItem("data", JSON.stringify(data));
    router.push("/admin/dashboard/content-assistant/create/hub-cover-image");
  };

  const stepChangeHandler = (i) => {
    setCurrentState(i);
  };

  const categoryChangeHandler = (item) => {
    setSelectedCategory(item);
    setCategoryError("");
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
          <div className="space-y-10 max-w-6xl pb-20 pt-10 w-3/4 mx-auto">
            <div className="w-full">
              <p className={`${poppins600.className} text-xl`}>
                Hub Description
              </p>
              <p
                className={`${poppins400.className} w-full flex-shrink-0 text-[#C4C4C4] text-sm pb-2`}
              >
                Ayo! Write something to make your course attractive.
              </p>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={onChangeHandler}
                cols="30"
                rows="10"
                className={`${poppins400.className} text-[#4b4b4b] text-sm w-full rounded-xl h-40 py-2 px-4 resize-none border border-[#E5E5E5] focus-within:outline-0`}
              ></textarea>
              {error?.description && (
                <p className="text-xs text-red-500">
                  Please Make a description
                </p>
              )}
            </div>
            <div className="">
              <p className={`${poppins600.className} text-xl`}>
                Learning Objectives
              </p>
              <p
                className={`${poppins400.className} text-sm text-[#C4C4C4] pb-2`}
              >
                Let’s define some learning objectives for users.
              </p>
              <div className="py-4">
                <div className="flex justify-between w-full">
                  <p className={`${poppins400.className}`}>
                    How many objectives?
                  </p>
                  <div className="flex justify-end items-center gap-10">
                    <div
                      onClick={() => objectiveClickHandler("decrease")}
                      className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <p className="-mt-[0px]">-</p>
                    </div>
                    <p>{learnings}</p>
                    <div
                      onClick={() => objectiveClickHandler("increase")}
                      className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <p className="-mt-[0px]">+</p>
                    </div>
                  </div>
                </div>
                <p className={`${poppins400.className} text-sm text-[#C4C4C4]`}>
                  Note: the maximum amount of videos is 5.
                </p>
              </div>
              <div className=" space-y-4">
                {learningObjective.map((objective, index) => (
                  <>
                    <input
                      key={index}
                      type="text"
                      className={`${poppins400.className} text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl w-full py-4 px-4 focus-within:outline-none`}
                      placeholder={`Objective ${index + 1}`}
                      name="objective"
                      id={`objective_${index}`}
                      value={objective.title}
                      onChange={(e) =>
                        handleLearningsChange(index, e.target.value)
                      }
                    />
                    {objective?.titleError && (
                      <p className="text-xs text-red-500">
                        {objective?.titleError}
                      </p>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="">
              <p className={`${poppins600.className} text-xl`}>Hub Category</p>
              <p
                className={`${poppins400.className} w-full flex-shrink-0 text-[#C4C4C4] text-sm pb-6`}
              >
                Let’s define your hub’s category. You can only select one.
              </p>
              <div className="">
                <p className={`${poppins600.className} text-sm`}>
                  Select your Category
                </p>
                <div className="space-y-4 py-4">
                  {categories &&
                    categories.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => categoryChangeHandler(item)}
                        className="flex gap-5 items-center cursor-pointer w-fit"
                      >
                        <div className="h-6 w-6 rounded-full border border-[#C4C4C4] flex justify-center items-center">
                          {item === selectedCategory && (
                            <div className="w-3 h-3 rounded-full bg-[#4B4B4B]"></div>
                          )}
                        </div>
                        <p
                          className={`${poppins400.className} capitalize text-sm`}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  {categoryError && (
                    <p className="text-xs text-red-500">{categoryError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Steps activeStep={activeStep} onStepClick={handleStepClick} />
        </div>
        <div className="flex flex-col px-3 w-[450px] justify-between ">
          <div className="space-y-12 pt-10 pr-10 relative">
            <div className="space-y-2">
              <p
                className={`${poppins600.className} text-base flex gap-2 items-center`}
              >
                <Image
                  height={10}
                  width={10}
                  src="/assets/icons/tip.svg"
                  className="w-5 h-5"
                  alt="tip"
                />
                Sample
              </p>
              <div
                className={`${poppins400.className} text-sm border-l-2 border-[#FC7B92] pl-4 text-[#C4C4C4]`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                tempus eros ipsum, semper porttitor ex dictum et. Nullam
                sollicitudin ut justo et molestie.
              </div>
            </div>
            <div className="space-y-2">
              <p
                className={`${poppins600.className} text-base flex gap-2 items-center`}
              >
                <Image
                  height={10}
                  width={10}
                  src="/assets/icons/tip.svg"
                  className="w-5 h-5"
                  alt="tip"
                />
                Sample
              </p>
              <div
                className={`${poppins400.className} text-sm border-l-2 border-[#FC7B92] pl-4 text-[#C4C4C4]`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                tempus eros ipsum, semper porttitor ex dictum et. Nullam
                sollicitudin ut justo et molestie.
              </div>
            </div>
            <div
              className={classNames("space-y-2 pt-28", {
                "pt-32": learnings === 2,
                "pt-44": learnings === 3,
                "pt-60": learnings === 4,
                "pt-72": learnings === 5,
              })}
            >
              <p
                className={`${poppins600.className} text-base flex gap-2 items-center`}
              >
                <Image
                  height={10}
                  width={10}
                  src="/assets/icons/tip.svg"
                  className="w-5 h-5"
                  alt="tip"
                />
                Sample
              </p>
              <div
                className={`${poppins400.className} text-sm border-l-2 border-[#FC7B92] pl-4 text-[#C4C4C4]`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                tempus eros ipsum, semper porttitor ex dictum et. Nullam
                sollicitudin ut justo et molestie.
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

export default HubGeneralInformation;
