import Lottie from 'react-lottie-player';
import * as animationData from "../../public/assets/polymath-loading-animation.json";

import React, { useRef, useEffect } from 'react';

const LoadingIndicator = () => {

  const animationRef = useRef();

  useEffect(() => {
    animationRef.current.play();
    animationRef.current.setSpeed(1);

    return () => {
      animationRef.current.stop();
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 z-50">
      <div>
        <Lottie 
          animationData={animationData} 
          loop
          ref={animationRef}
        />
      </div>
    </div>
  );
}

export default LoadingIndicator;