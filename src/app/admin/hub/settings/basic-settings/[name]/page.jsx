"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import axios from "axios";

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

const categories = ["design", "business", "language"];

const BasicSettingsPage = () => {
  const urlparams = useParams();
  const router = useRouter();
  const { name } = urlparams;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setSelectedObjectives] = useState(2);
  const [objectiveValues, setObjectiveValues] = useState(
    Array.from({ length: objectives }, () => ({ title: "" }))
  );

  useEffect(() => {
    setObjectiveValues((prevValues) => {
      // Keep the existing values for common objectives and add new ones if needed
      return Array.from({ length: objectives }, (item, index) => ({
        title: prevValues[index] ? prevValues[index].title : "",
      }));
    });
  }, [objectives]);

  const objectiveClickHandler = (i) => {
    if (i === "increase") {
      if (objectives < 5) setSelectedObjectives(objectives + 1);
    } else if (i === "decrease") {
      if (objectives > 0) setSelectedObjectives(objectives - 1);
    }
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectiveValues = [...objectiveValues];
    newObjectiveValues[index].title = value;
    setObjectiveValues(newObjectiveValues);
  };

  const categoryChangeHandler = (item) => {
    setSelectedCategory(item);
  };

  const completeHandler = async () => {
    const data = {
      title,
      description,
      selectedCategory,
      objectiveValues,
    };
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    router.push(`/admin/dashboard/video-management`);
    console.log(data);
  };

  return (
    <div className="space-y-10 max-w-6xl pb-20 mx-auto">
      <div className="flex justify-between items-center pt-20">
        <h1 className={`${poppins_600.className} text-3xl`}>Basic Settings</h1>
        <button
          onClick={completeHandler}
          className={`${poppins_400.className} bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] py-3 px-6 transition-all rounded-full text-white text-sm duration-200`}
        >
          Done
        </button>
      </div>
      <div className="space-y-2">
        <p className={`${poppins_600.className} text-xl`}>Title</p>
        <input
          type="text"
          className={`${poppins_400.className} text-[#4B4B4B] text-sm placeholder:text-[#C4C4C4] border border-[#E5E5E5] rounded-xl w-1/2 py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none`}
          placeholder="Title"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className={`${poppins_600.className} text-xl`}>Hub Description</p>
        <p className={`${poppins_400.className} text-sm text-[#C4C4C4] pb-2`}>
          Ayo! Write something to make your course attractive.
        </p>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="30"
          rows="10"
          className={`${poppins_400.className} text-[#4B4B4B] text-sm placeholder:text-[#C4C4C4] resize-none border border-[#E5E5E5] rounded-xl w-1/2 h-40 py-2 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none`}
        ></textarea>
      </div>
      <div className="w-1/2">
        <p className={`${poppins_600.className} text-xl`}>Learning Objects</p>
        <p className={`${poppins_400.className} text-sm text-[#C4C4C4] pb-2`}>
          Let’s define some learning objectives for users.
        </p>
        <div className="py-4">
          <div className="flex justify-between w-full">
            <p className={`${poppins_400.className}`}>How many objectives?</p>
            <div className="flex justify-end items-center gap-10">
              <div
                onClick={() => objectiveClickHandler("decrease")}
                className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="-mt-[2px]">-</p>
              </div>
              <p>{objectives}</p>
              <div
                onClick={() => objectiveClickHandler("increase")}
                className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer"
              >
                <p className="-mt-[2px]">+</p>
              </div>
            </div>
          </div>
          <p className={`${poppins_400.className} text-sm text-[#C4C4C4]`}>
            Note: the maximum amount of videos is 5.
          </p>
        </div>
        <div className="space-y-4">
          {objectiveValues.map((objective, index) => (
            <input
              key={index}
              type="text"
              className={`${poppins_400.className} text-[#4B4B4B] text-sm placeholder:text-[#C4C4C4] border border-[#E5E5E5] rounded-xl w-full py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none`}
              placeholder={`Objective ${index + 1}`}
              name="objective"
              id={`objective_${index}`}
              value={objective.title}
              onChange={(e) => handleObjectiveChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <p className={`${poppins_600.className} text-xl`}>Course Category</p>
        <p className={`${poppins_400.className} text-sm text-[#C4C4C4] pb-6`}>
          Let’s define your course’s category. You can only select one.
        </p>
        <div className="">
          <p className={`${poppins_600.className} text-sm`}>
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
                  <p className={`${poppins_400.className} capitalize text-sm`}>
                    {item}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicSettingsPage;
