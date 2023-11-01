import React, { useRef, useEffect, useState } from "react";
import SubscriptionPopup from "./SubscriptionPopup";
import EpisodeContainer from "./EpisodeContainer";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import EpisodeHeader from "./EpisodeHeader";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const HubGenerator = () => {
  const [title, setTitle] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("subscribed");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [episodeCount, setEpisodeCount] = useState(1);
  const descriptionRef = useRef(null);
  const [learnings, setLearnings] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [coverPhotoSelected, setCoverPhotoSelected] = useState(false);

  const router = useRouter();

  const BackClickHandler = () => {
    router.push("/admin/dashboard/video-management");
  };

  useEffect(() => {
    setLearningObjective((prevValues) => {
      return Array.from({ length: learnings }, (item, index) => ({
        title: prevValues[index] ? prevValues[index].title : "",
        titleError: "",
      }));
    });

    setEpisodes((prevValues) => {
      return Array.from({ length: episodeCount }, (item, index) => {
        const key = uuidv4();
        return prevValues[index]
          ? prevValues[index]
          : {
              id: key,
              title: `Financial Analysis 101${index}`,
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo",
            };
      });
    });

    const descriptionElement = descriptionRef.current;

    if (descriptionElement) {
      descriptionElement.scrollTop = descriptionElement.scrollHeight;
    }
  }, [learnings, episodeCount, isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
  };

  const ImageUploadHandler = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setCoverPhotoSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: ImageUploadHandler,
  });

  const [learningObjective, setLearningObjective] = useState(
    Array.from({ length: learnings }, () => ({
      title: "",
      titleError: "",
    }))
  );

  const handleLearningsChange = (index, value) => {
    const newObjectiveValues = [...learningObjective];
    newObjectiveValues[index].title = value;
    setLearningObjective(newObjectiveValues);
  };

  const objectiveClickHandler = (action) => {
    if (action === "increase" && learnings < 3) {
      setLearnings(learnings + 1);
    } else if (action === "decrease" && learnings > 1) {
      setLearnings(learnings - 1);
    }
  };

  const categories = [
    { id: "language", label: "Language" },
    { id: "business", label: "Business" },
    { id: "design", label: "Design" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const selectedCategoryHandler = (item) => {
    setSelectedCategory(item);
  };

  const toggleSidebarPopup = () => {
    setShowContent(!showContent);
  };

  const handleGenerateButtonClick = () => {
    setSubscriptionStatus("subscribed");
    toggleSidebarPopup();
  };

  useEffect(() => {
    const descriptionElement = descriptionRef.current;

    if (descriptionElement) {
      descriptionElement.scrollTop = descriptionElement.scrollHeight;
    }
  }, []);

  const changeEpisodeCount = (count) => {
    setEpisodeCount(count);
  };

  const [episodes, setEpisodes] = useState([
    {
      id: 1,
      title: "Financial Analysis 101",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo",
    },
  ]);

  const addEpisode = () => {
    if (episodeCount < 10) {
      setEpisodes([
        ...episodes,
        {
          id: uuidv4(),
          title: "Financial Analysis",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo, Quis, quidem sapiente? Consectetur tempore dolor velit amet, praesentium distinctio voluptatem, illo",
        },
      ]);
      setEpisodeCount(episodeCount + 1);
    }
  };

  const handleRemoveEpisode = (idToRemove) => {
    if (episodeCount > 1) {
      const updatedEpisodes = episodes.filter(
        (episode) => episode.id !== idToRemove
      );
      setEpisodes(updatedEpisodes);
      setEpisodeCount(episodeCount - 1);
    }
  };

  const episodeContainers = episodes
    .slice(0, episodeCount)
    .map((episode) => (
      <EpisodeContainer
        key={episode.id}
        title={episode.title}
        description={episode.description}
        onRemove={() => handleRemoveEpisode(episode.id)}
        index={episode.id}
      />
    ));

  console.log("episodecontainers", episodeContainers);

  return (
    <div className="overflow-x-hidden">
      <div className="w-full md:w-[80%] h-auto m-[10px] border border-gray-200 border-1 mb-10 rounded-2xl ">
        <div className="mx-[20%] my-[3%] flex w-[60%] justify-center flex-col gap-5">
          <p className="text-xl text-#0000 font-semibold font-poppins">
            Hub Generator
          </p>

          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-gray-700 font-poppins"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you want to see?"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="font-semibold text-gray-700 font-poppins"
              htmlFor="title"
            >
              Category
            </label>
            <div className="flex gap-10">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => selectedCategoryHandler(category.id)}
                  className={`flex items-center justify-center w-full h-[66px] border border-1 rounded-2xl ${
                    selectedCategory === category.id
                      ? "border-black text-gray-700 hover:border-black hover:text-gray-700 hover:bg-gray-100 duration-200"
                      : "border-gray-200 text-gray-300 hover:border-black hover:text-gray-700 hover:bg-gray-100 duration-200"
                  } cursor-pointer`}
                >
                  <p>{category.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <p className="text-gray-700 font-poppins font-semibold">
              Number of Episodes
            </p>
            <div className="flex relative appearance-none border w-[15%] h-[50px] border-gray-300 rounded-md px-2 py-1 focus:outline-none ">
              <select
                className=""
                value={episodeCount}
                onChange={(e) => setEpisodeCount(parseInt(e.target.value))}
              >
                {[...Array(10).keys()].map((count) => (
                  <option key={count} value={count + 1}>
                    {count + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex-8 text-gray-700 font-poppins font-semibold">
              <p>Number of Learning Objectives</p>
            </div>
            <div className="flex relative appearance-none border w-[15%] h-[50px] border-gray-300 rounded-md px-2 py-1 focus:outline-none ">
              <select
                className=""
                value={learnings}
                onChange={(e) => setLearnings(parseInt(e.target.value))}
              >
                {[1, 2, 3].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full px-6 py-4 my-2 font-medium text-white  bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-200 hover:bg-gray-700 cursor-pointer duration-200">
            <div
              className="w-full h-full text-white flex items-center justify-center"
              onClick={handleGenerateButtonClick}
            >
              Generate
            </div>
          </div>
        </div>
      </div>

      {showContent && (
        <div className="spacer-y-10">
          {subscriptionStatus === "subscribed" ? (
            <div className="flex flex-col">
              <div className="flex relative flex-col gap-5">
                <div className="h-5"></div>
                <div className="font-bold font-poppins font-32 text-black ml-2">
                  <p className="text-lg">Your Content Outcome</p>
                </div>
                <div className="flex gap-[2%] md:gap-[4%] w-[80%]">
                  <div className="w-[53%] flex-1 ">
                    <div className="ml-2 text-black font-bold">
                      <p>Hub cover Photo</p>
                    </div>
                    <div className="h-5"></div>

                    <div
                      className="border-2 border-dashed  ml-2 h-[445px] flex flex-col items-center justify-center rounded-lg"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {!selectedImage ? (
                        <div className="flex flex-col items-center justify-center">
                          <div className="h-[69px] w-[69px] rounded-full bg-[rgb(255,85,116)] text-white hover:bg-[rgb(255,85,116)]  flex items-center justify-center cursor-pointer">
                            <div className="text-white">
                              <Image
                                src="/assets/icons/videoUpload.svg"
                                width={20}
                                height={20}
                              />
                            </div>
                          </div>
                          <p>Upload cover photo</p>
                        </div>
                      ) : (
                        <div
                          className="relative"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          {coverPhotoSelected && isHovered && (
                            <div
                            className="absolute top-0 left-0 w-full h-full bg-black rounded-xl bg-opacity-50 z-50 flex items-center justify-center"
                            style={{ pointerEvents: isHovered ? "none" : "" }}
                          >
                            <p className="text-white text-2xl">Update</p>
                          </div>
                          
                          )}
                          <div className="w-[300px] h-[300px] rounded-xl overflow-hidden cursor-pointer">
                            <Image
                              src={selectedImage}
                              alt="Selected Image"
                              width={250}
                              height={250}
                              objectFit="contain"
                              className="w-[300px] h-[300px] rounded-xl"
                            />
                          </div>
                        </div>

                      )}
                    </div>
                  </div>
                  <div className="w-[38%] flex-1 flex-col">
                    <div className="text-black font-bold">
                      <p>Hub Description</p>
                    </div>
                    <div className="h-5"></div>
                    <div
                      name="description"
                      id="description"
                      cols="30"
                      rows="10"
                      className="w-full max-md h-[27%] border border-solid border-gray-300 rounded-lg p-4"
                    >
                      <p
                        ref={descriptionRef}
                        contentEditable={isEditing}
                        className={`h-full w-full m-2 px-2 [&::-webkit-scrollbar]:hidden focus:outline-none py-1 bg-white text-gray-700 max-h-[125px] overflow-auto ${
                          isEditing
                            ? "border-b border-gray-500 line-height-[1]"
                            : ""
                        }`}
                        onMouseDown={handleStartEditing}
                        onBlur={handleStopEditing}
                      >
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Excepturi, adipisci minus quaerat dolor explicabo
                        accusantium autem alias illum corrupti pariatur, optio
                        doloremque aliquam eaque architecto soluta quos, rem
                        cumque porro.Excepturi, adipisci minus quaerat dolor
                        explicabo accusantium autem alias illum corrupti
                        pariatur, optio doloremque aliquam eaque architecto
                        soluta quos, rem cumque porro.
                      </p>
                    </div>
                    <div className="h-10"></div>
                    <div className="">
                      <p className="text-xl text-black">Learning Objectives</p>
                      <div className="h-2"></div>
                      <div className="pt-3">
                        <div className="flex justify-between">
                          <p className="text-sm">Number of Episodes</p>
                          <div className="flex items-center">
                            <div
                              onClick={() => objectiveClickHandler("decrease")}
                              className="w-10 h-10 border border-text-gray-500 text-gray-300 rounded-xl  flex justify-center items-center cursor-pointer"
                            >
                              <p className="w-[11px] -mt-[2px] ">-</p>
                            </div>
                            <div className="w-10"></div>
                            <p className="font-poppins text-20 text-black">
                              {learnings}
                            </p>
                            <div className="w-10"></div>

                            <div
                              onClick={() => objectiveClickHandler("increase")}
                              className="w-10 h-10 border border-text-gray-300 text-gray-300  flex justify-center items-center rounded-xl cursor-pointer"
                            >
                              <p className="-mt-[2px]">+</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-[#C4C4C4]">
                          Max Number of Learning Objectives is 3.
                        </p>
                      </div>
                      <div className=" space-y-3">
                        {learningObjective.map((objective, index) => (
                          <input
                            key={index}
                            type="text"
                            className=" text-[#4B4B4B] border border-[#E5E5E5] rounded-md w-full py-2 px-3 focus-within:outline-none"
                            name="objective"
                            id={`objective_${index}`}
                            value={objective.title}
                            onChange={(e) =>
                              handleLearningsChange(index, e.target.value)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 w-fit">
                  <>
                    <div className="hidden md:block">
                      <EpisodeHeader />
                    </div>
                    {episodeContainers}
                  </>
                </div>
                <div
                  className="flex w-[98%] xl:w-[99%] justify-center items-center font-poppins text-14 text-gray-600 h-[50px] mx-2 border  1px border-dashed rounded-xl hover:cursor-pointer hover:bg-gray-300 duration-200"
                  onClick={addEpisode}
                >
                  <p>+ Add Episode</p>
                </div>
                <div className="ml-2 h-[10%]  w-[95%] flex justify-between mb-10 pb-10">
                
                <div className="w-[5%] md:[w-10%] flex justify-start items-start">
                  <button onClick={BackClickHandler} className="px-6 border rounded-full py-4 flex justify-center gap-2 items-center text-sm hover:bg-[#2e2e2e] hover:text-white w-min duration-200"><FaAngleLeft /> Back</button>
                  </div>
                  <div className="w-[5%] md:w-[10%] flex justify-end items-start">
                    <button className="px-8 w-max border rounded-full py-4 flex justify-center gap-2 items-center text-sm  duration-200 bg-black text-white hover:bg-gray-500">
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SubscriptionPopup onClose={toggleSidebarPopup} />
          )}
        </div>
      )}
    </div>
  );
};

export default HubGenerator;
