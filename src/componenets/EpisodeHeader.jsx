import React from "react";

const EpisodeHeader = () => {
  return (
    <div className="ml-[3%]  grid grid-cols-5 flex flex-col items-center justify-start w-full md:w-[90%] gap-4 p-4 font-bold ">
      <div>Thumbnail</div>
      <div>Title</div>
      <div>Caption (Optional)</div>
      <div>Make it Free</div>
      <div>Video Upload</div>
    </div>
  );
};

export default EpisodeHeader;
