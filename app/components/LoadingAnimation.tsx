"use client"; // Important, car ce composant utilise des hooks et des interactions client

import Lottie from "lottie-react";
import animationData from "../../public/loading-animation.json";

const LoadingAnimation = () => {
  return (
    <div style={{ width: 200, height: 200 }}> {/* Tu peux ajuster la taille ici */}
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LoadingAnimation;