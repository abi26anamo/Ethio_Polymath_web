"use client";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
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

function HubTitleCreationPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState("1");
  const searchParams = useSearchParams();
  const draftTitle = searchParams.get("draft_title");
  const content = searchParams.get("content");

  const handleStepClick = (stepNum) => {
    const data = {
      ...sessionData,
      title,
      content,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    setActiveStep(stepNum);
  };

  const sessionData = sessionStorage.getItem("data")
    ? JSON.parse(sessionStorage.getItem("data"))
    : null;

  const [closeMessage, setCloseMessage] = useState(false);

  const [currentState, setCurrentState] = useState(1);

  const initialTitle = draftTitle || (sessionData ? sessionData?.title : "");
  
  const [inputValue, setInputValue] = useState({
    title: initialTitle,
  });
  const { title } = inputValue;

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

  const onBackClickHandler = () => {
    sessionStorage.clear()   
    router.push("/admin/dashboard/");
  };
  const onNextClickHandler = () => {
    const data = {
      ...sessionData,
      title,
      content,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    router.push(
      `/admin/dashboard/content-assistant/create/hub-episode-creation?content=${content}`
    );
  };
  useEffect(() => {
    const data = {
      ...sessionData,
      title,
      content,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
  }, [title]);

  const saveHandler = () => {
    setCloseMessage(!closeMessage);
  };
  const completeHandler = () => {
    const data = {
      ...sessionData,
      title,
      content,
    };
    sessionStorage.setItem("data", JSON.stringify(data));
    router.push("/admin/dashboard/video-management");
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
          <div className="space-y-4 pt-8 mx-auto w-3/4">
            <p className={`${poppins600.className} text-xl`}>
              What’s the Title of Your New Collection?
            </p>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-[#E5E5E5] focus-within:outline-0 py-4 px-4"
            />
            {error?.title && (
              <p className="text-xs text-red-500">Please make a title</p>
            )}
          </div>
          <Steps
            activeStep={activeStep}
            onStepClick={handleStepClick}
          />
        </div>

        <div className="flex flex-col px-3 w-[450px] justify-end ">
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
}
export default HubTitleCreationPage;
