"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useParams } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeletePopup from "@/componenets/DeletePopup";

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

const finalSpaceCharacters = [
  {
    id: "gary",
    title: "financial_analysis_101",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum perspiciatis hic nobis repellat officiis ad, quidem natus cumque veritatis maiores quisquam laboriosam eius unde tenetur porro quam, inventore fuga iste.",
  },
  {
    id: "cato",
    title: "financial_analysis_102",
    description:
      "dolor sit amet consectetur adipisicing elit. Nostrum perspiciatis hic nobis repellat officiis ad, quidem natus cumque veritatis maiores quisquam laboriosam eius unde tenetur porro quam, inventore fuga iste.",
  },
  {
    id: "kvn",
    title: "financial_analysis_103",
    description:
      "ipsum dolor sit amet consectetur adipisicing elit. Nostrum perspiciatis hic nobis repellat officiis ad, quidem natus cumque veritatis maiores quisquam laboriosam eius unde tenetur porro quam, inventore fuga iste.",
  },
  {
    id: "mooncake",
    title: "financial_analysis_104",
    description:
      "Lorem ipsum dolor sit adipisicing elit. Nostrum perspiciatis hic nobis repellat officiis ad, quidem natus cumque veritatis maiores quisquam laboriosam eius unde tenetur porro quam, inventore fuga iste.",
  },
  {
    id: "quinn",
    title: "financial_analysis_105",
    description:
      "Lorem dolor sit amet adipisicing elit. Nostrum perspiciatis hic nobis repellat officiis ad, quidem natus cumque veritatis maiores quisquam laboriosam eius unde tenetur porro quam, inventore fuga iste.",
  },
];

const EpisodeSettingsPage = () => {
  const params = useParams();
  const { name: nameParam } = params;

  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [deleteContentPopup, setContentDeletePopup] = useState(false);
  const [deleteContent, setDeleteContent] = useState(false);

  const toggleDeleteContentPopup = () => {
    setContentDeletePopup(!deleteContentPopup);
  };

  const contentDeleteHandler = (itemId) => {
    setContentDeletePopup(!deleteContentPopup);
    setDeleteContent(itemId);
  };

  const deleteContentHandler = (itemId) => {
    const tempData = [...characters];
    tempData.splice(itemId, 1);
    updateCharacters(tempData);
    setContentDeletePopup(!deleteContentPopup);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="space-y-10 max-w-6xl pb-20 mx-auto">
      <div className="flex justify-between items-center pt-20">
        <h1 className={`${poppins_600.className} text-3xl`}>
          Episode Settings
        </h1>
        <div className="space-x-4">
          <Link
            href={`/admin/hub/settings/episode-settings/${nameParam}/create-episode`}
            className={`${poppins_400.className} px-6 py-3 rounded-full border border-[#C4C4C4] hover:bg-[#2e2e2e] hover:text-white text-sm duration-200`}
          >
            Add Episode
          </Link>
          <button
            className={`${poppins_400.className} bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] py-3 px-6 transition-all rounded-full text-white text-sm duration-200`}
          >
            Done
          </button>
        </div>
      </div>
      <div className="w-full">
        <p className={`${poppins_600.className} text-xl pb-2`}>Videos</p>
        <div className="max-w-2xl">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(
                    ({ id, name, thumb, title, description }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <div
                              className="hover:bg-[#FBFBFF] rounded-2xl overflow-hidden px-4 py-2"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="flex justify-between items-center">
                                <p
                                  className={`${poppins_600.className} text-base`}
                                >
                                  Episode {index + 1}
                                </p>
                                <div className="space-x-2">
                                  <Link
                                    href={`/admin/hub/settings/episode-settings/${nameParam}/${title}`}
                                    className="px-8 py-2 rounded-full border border-[#C4C4C4] hover:bg-[#2e2e2e] hover:text-white duration-200 text-[#4B4B4B] text-sm"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => contentDeleteHandler(index)}
                                    className="px-8 py-2 rounded-full border border-[#FC7B92] hover:bg-[rgb(255,85,116)] text-[#FC7B92] hover:text-white text-sm duration-200"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              <div className="characters-thumb flex justify-center items-center">
                                <Image
                                  src="/assets/icons/drag.svg"
                                  width={100}
                                  height={100}
                                  className="w-8 h-6"
                                  alt="drag"
                                />
                                <div className="px-4 py-4 flex gap-5 items-start rounded-2xl">
                                  <div className="w-32 h-32 bg-[#FFD6DD] rounded-lg flex-shrink-0 group">
                                    {/* Wrap the content inside the group container */}
                                    <div className="w-full h-full bg-red-200 opacity-0 group-hover:opacity-100 rounded-lg"></div>
                                  </div>
                                  <div className="space-y-2">
                                    <p
                                      className={`${poppins_600.className} text-lg capitalize`}
                                    >
                                      {title.split("_").join(" ")}
                                    </p>
                                    <p
                                      className={`${poppins_400.className} text-sm text-[#C4C4C4] line-clamp-4`}
                                    >
                                      {description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className="absolute z-50">
        {deleteContentPopup && (
          <DeletePopup
            onClose={toggleDeleteContentPopup}
            deleteHandler={deleteContentHandler}
            deleteContent={deleteContent}
            title={`Episode ${deleteContent + 1}`}
          />
        )}
      </div>
    </div>
  );
};

export default EpisodeSettingsPage;
