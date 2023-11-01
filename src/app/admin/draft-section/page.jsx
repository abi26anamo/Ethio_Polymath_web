"use client";
import SIdebarHeader from "@/componenets/SIdebarHeader";
import React, { useEffect, useState, useRef } from "react";
import { Poppins } from "next/font/google";
import DeletePopup from "@/componenets/DeletePopup";
import SubscriptionPopup from "@/componenets/SubscriptionPopup";
import DeleteHubPopup from "@/componenets/DeleteHubPopup";
import { FaTimes } from "react-icons/fa";
import CreateUpcomingPopupPage from "@/componenets/CreateUpcomingPopup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  createUpcoming,
  deleteUpcoming,
  getUpcoming,
  resetUpcoming,
} from "@/redux/features/upcoming/upcomingSlice";
import { toast } from "react-toastify";

const poppins600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const DraftsSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sidebarPopup, setSidebarPopup] = useState(false);
  const [createUpcomingPopup, setCreateUpcomingPopup] = useState(false);
  const [deleteContentPopup, setContentDeletePopup] = useState(false);
  const [deleteHubPopup, setDeleteHubPopup] = useState(false);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteHub, setDeleteHub] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [hub, setHub] = useState([
    {
      id: 1,
      draft_title: "Financial 101",
      date: "1900/01/02",

      content:
        "This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.",
    },
    {
      id: 2,
      draft_title: "Financial 102",
      date: "1900/01/02",

      content:
        "This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.",
    },
    {
      id: 3,
      draft_title: "Financial 103",
      date: "1900/01/02",

      content:
        "This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.",
    },
    {
      id: 4,
      draft_title: "Financial 104",
      date: "1900/01/02",

      content:
        "This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.",
    },
    {
      id: 5,
      draft_title: "Financial 105",
      date: "1900/01/02",

      content:
        "This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.",
    },
    {
      id: 6,
      draft_title: "Financial 106",
      date: "1900/01/02",

      content:
        "This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.",
    },
  ]);

  const { upcomings, isUpcomingCreated, isUpcomingDeleted, message } =
    useSelector((state) => state.upcoming);

  useEffect(() => {
    if (isUpcomingCreated) {
      toast.success("Upcoming created");
      setCreateUpcomingPopup(false);
      dispatch(resetUpcoming());
      dispatch(getUpcoming());
    } else if (isUpcomingDeleted) {
      toast.success(message);
      setContentDeletePopup(!deleteContentPopup);
      dispatch(resetUpcoming());
      dispatch(getUpcoming());
    }
    if (!upcomings) dispatch(getUpcoming());
  }, [
    dispatch,
    upcomings,
    isUpcomingCreated,
    createUpcomingPopup,
    isUpcomingDeleted,
    message,
    deleteContentPopup,
  ]);

  const deleteContentHandler = (itemId) => {
    dispatch(deleteUpcoming(itemId));
  };

  const hubDeleteHandler = (itemId) => {
    setDeleteHubPopup(!deleteHubPopup);
    setDeleteHub(itemId);
  };
  const deleteHubHandler = (itemId) => {
    const updatedItems = hub.filter((item) => item.id !== itemId);
    setHub(updatedItems);
    setDeleteHubPopup(!deleteHubPopup);
  };
  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const toggleDeleteContentPopup = () => {
    setContentDeletePopup(!deleteContentPopup);
  };
  const toggleDeleteHubPopup = () => {
    setDeleteHubPopup(!deleteHubPopup);
  };

  const toggleSidebarPopup = () => {
    setSidebarPopup(!sidebarPopup);
  };

  const createUpcomingPopupHandler = () => {
    setCreateUpcomingPopup(!createUpcomingPopup);
  };

  const createNewUpcomingItem = (title, description) => {
    dispatch(createUpcoming({ title, description }));
  };

  const singleHubClickHandler = (item) => {
    router.push(
      `/admin/dashboard/content-assistant/create/hub-title-creation?draft_title=${item.draft_title}&content=${item.content}`
    );
  };

  return (
    <div>
      <div className="mx-5 mt-2 flex justify-between  ">
        <div className="justify-center items-center gap-4 inline-flex">
          <img
            src="/assets/icons/polymath_icon.svg"
            alt="Your Logo"
            width="24"
            height="24"
          />
          <div className="text-center text-black text-xl font-poppins ">
            Polymath
          </div>
        </div>
        <SIdebarHeader />
      </div>
      <div className="px-8 pb-4 space-y-2 mt-8 mx-13">
        <div className={`${hub && hub.length > 0 ? "" : "hidden"}`}>
          <p
            className={`${poppins600.className} px-8 ml-5 text-lg 2xl:text-xl 3xl:text-2xl font-poppins`}
          >
            Your Draft
          </p>

          <div className="px-5 flex gap-3 flex-wrap">
            {hub &&
              hub.length > 0 &&
              hub.map((item, index) => (
                <div key={index} className={`p-4 relative h-auto`}>
                  <div
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHover(-1)}
                    onClick={() => singleHubClickHandler(item)}
                    className={`${
                      hoveredIndex === index
                        ? "bg-gradient-to-b from-[#FC7B92] to-[#694BFF]"
                        : ""
                    } p-[1px] cursor-pointer rounded-3xl`}
                  >
                    <div
                      className={`w-72 pb-6 text-start space-y-2 rounded-3xl overflow-hidden bg-white ${
                        hoveredIndex === index ? "" : "border"
                      }`}
                    >
                      <div className="w-full h-56 bg-[#F9F9F9] relative">
                        {hoveredIndex === index && (
                          <button
                            id="delete-button"
                            onClick={(event) => {
                              event.stopPropagation();
                              hubDeleteHandler(item.id);
                            }}
                            className="absolute top-2 right-2 z-50 w-8 h-8 rounded-full flex items-center justify-center shadow-[_0px_0px_10px_0px_rgba(0,0,0,0.16)] bg-white font-bold"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                      <p className="px-6 pt-2 text-black text-xl font-semibold">
                        {item.draft_title}
                      </p>
                      <p className="text-[#C4C4C4] text-sm px-6 line-clamp-4">
                        {item.date}
                      </p>
                      <p className="text-[#C4C4C4] text-sm px-6 pb-4 line-clamp-4">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="absolute z-50">
        {deleteContentPopup && (
          <DeletePopup
            onClose={toggleDeleteContentPopup}
            deleteHandler={deleteContentHandler}
            deleteContent={deleteContent}
            title="Upcoming Content"
          />
        )}
        {deleteHubPopup && (
          <DeleteHubPopup
            onClose={toggleDeleteHubPopup}
            deleteHubHandler={deleteHubHandler}
            deleteHub={deleteHub}
          />
        )}
        {sidebarPopup && <SubscriptionPopup onClose={toggleSidebarPopup} />}
        {createUpcomingPopup && (
          <CreateUpcomingPopupPage
            onClose={createUpcomingPopupHandler}
            onCreate={createNewUpcomingItem}
            length={hub.length}
          />
        )}
      </div>
    </div>
  );
};

export default DraftsSection;
