import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";

const poppins600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const CreateUpcomingPopup = ({ onClose, onCreate, length }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleOnClose = () => {
    onClose();
  };
  const handleCreate = () => {
    if (title && description) onCreate(title, description);
  };
  return (
    <div
      id="container"
      className="fixed inset-0 bg-white flex justify-center items-center"
    >
      <div className="flex w-1/2 h-full pb-24 pt-40">
        <div className="flex items-end">
          <button
            onClick={handleOnClose}
            className="px-6 border rounded-full py-4 flex justify-center gap-2 items-center text-sm hover:bg-[#2e2e2e] hover:text-white duration-200"
          >
            <FaAngleLeft /> Back
          </button>
        </div>
        <div className="flex-1 h-[50vh]">
          <div className="space-y-20">
            <div className="space-y-4">
              <p className={`${poppins600.className} text-2xl`}>
                Title of upcoming content
              </p>
              <input
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="border px-6 py-3 placeholder:text-[#C4C4C4] rounded-full w-full focus-within:border-[rgb(255,85,116)] focus-within:outline-0"
                placeholder="Example: 1 Month Premium Subscription"
              />
            </div>
            <div className="space-y-4">
              <p className={`${poppins600.className} text-2xl`}>
                Description of the upcoming content
              </p>
              <input
                type="text"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="border px-6 py-3 placeholder:text-[#C4C4C4] rounded-full w-full focus-within:border-[rgb(255,85,116)] focus-within:outline-0"
                placeholder="Example: Describe your upcoming content"
              />
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col ${
            length >= 3 ? "justify-between" : "justify-end"
          } items-end`}
        >
          {length && length >= 3 && (
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-2">
                <Image
                  width={10}
                  height={10}
                  src="/assets/icons/warning.svg"
                  alt="warning"
                  className="w-4 h-4"
                />
                <p className="text-2xl">
                  <span>Warning: you already had 15</span>{" "}
                  <span>Upcoming Content</span>
                </p>
              </div>
              <div className="w-full h-auto border-l-2 border-[rgb(255,85,116)] pl-6">
                <p>
                  You have reached max amount of Upcoming Content. Have you
                  tried to deleted any older Upcoming Content?
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleCreate}
            disabled={length >= 3 ? true : false}
            className={`text-white bg-[rgb(252,123,146)] ${
              length >= 3 ? "" : "hover:bg-[rgb(255,85,116)]"
            } transition-all px-6 rounded-full py-4 flex justify-center items-center gap-1 text-sm duration-200`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUpcomingPopup;
