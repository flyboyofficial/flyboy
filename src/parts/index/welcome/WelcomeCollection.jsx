import React from "react";

export default function WelcomeCollection() {
  return (
    <div className="welcomeSlider__outer">
      <div className="welcomeSlider__outer-plane">
        <img src="images/plane/planeWelcome.svg" alt="" />
      </div>
      <div className="welcomeSlider">
        <div className="welcomeSlider__item">
          <img src="images/nft/nft-5.png" alt="" />
        </div>
        <div className="welcomeSlider__item slick-center">
          <img src="images/nft/nft-6.png" alt="" />
        </div>
        <div className="welcomeSlider__item">
          <img src="images/nft/nft-7.png" alt="" />
        </div>
      </div>
      <div className="welcomeSlider__arrows">
        <span>Flyboy Collections</span>
      </div>
    </div>
  );
}
