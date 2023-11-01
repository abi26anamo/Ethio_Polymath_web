import Image from "next/image";
import React, { useState } from "react";
import { Poppins } from "next/font/google";

const poppins600 = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const Popup = ({ onClose }) => {
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOnClose = (e) => {
    if (e.target.id !== 'submit' && e.target.id ) onClose();
  };

  const onClickHandler = () => {
    const scriptURL = process.env.GOOGLE_SHEETS;
    const form = document.forms["myForm"];
    if (!form.checkValidity()) {
      alert("Please enter a valid email address!");
      return;
    }
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => setIsSubmitted(true))
      .catch((error) => console.error("Error!", error.message));

  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center px-2"
    >
      <div className="relative">
        <div className="md:min-w-[550px] lg:min-w-[600px] xl:min-w-[650px] 2xl:min-w-[700px] 3xl:min-w-[750px]">
          <Image
            width={1000}
            height={1000}
            src="/assets/waitlist.png"
            className="w-full"
            alt="waitlist"
          />
        </div>
        <div className="absolute top-0 w-full h-full flex items-center justify-center px-2">
          {isSubmitted?(
              <div 
              className={`md:min-w-[450px] lg:min-w-[500px] xl:min-w-[550px] 2xl:min-w-[600px] 3xl:min-w-[650px] flex flex-col items-center gap-2 md:gap-3 lg:gap-6 px-5 py-3 text-white ${poppins600.className}`}>
              <p className="text-xl md:text-3xl xl:text-4xl 3xl:text-5xl">
              Thanks for signing up!
            </p>
            </div>
          ) : (
            <div
            className={`md:min-w-[450px] lg:min-w-[500px] xl:min-w-[550px] 2xl:min-w-[600px] 3xl:min-w-[650px] flex flex-col items-center gap-2 md:gap-3 lg:gap-6 px-5 py-3 text-white ${poppins600.className}`}
          >
            <p className="text-3xl md:text-5xl xl:text-6xl 3xl:text-7xl">
              Join the Waitlist
            </p>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl md:my-2">
              We’ll notify you when we are ready!
            </p>
            <form id="myForm">
              <input
                type="email"
                name="email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-black focus-visible:outline-0 px-16 md:px-32 py-2 md:py-4 my-4 rounded-xl w-full"
              />
            </form>
            <button
              id="submit"
              onClick={onClickHandler}
              className="bg-black rounded-full py-2 md:py-4 px-10 w-2/4 self-center"
            >
              Submit
            </button>
          </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Popup;