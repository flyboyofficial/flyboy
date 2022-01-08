import React, { Component } from "react";
import Slider from "react-slick";
function Prev(props) {
  const { onClick } = props;
  return (
    <button type="button" className="prev" onClick={onClick}>
      <img src="images/icons/arrow-left.svg" alt="" />
    </button>
  );
}
function Next(props) {
  const { onClick } = props;
  return (
    <button type="button" className="next" onClick={onClick}>
      <img src="images/icons/arrow-right.svg" alt="" />
    </button>
  );
}
export default class WelcomeSlider extends Component {
  render() {
    const settings = {
      centerMode: true,
      slidesToShow: 3,
      nextArrow: <Prev />,
      prevArrow: <Next />,
      centerPadding: "0",
    };

    return (
      <div className="welcomeSlider__outer">
        <div className="welcomeSlider__outer-plane">
          <img src="images/plane/planeWelcome.svg" alt="" />
        </div>
        <div className="welcomeSlider">
          <Slider {...settings}>
            <div className="welcomeSlider__item">
              <img src="images/nft/nft-5.png" alt="" />
            </div>
            <div className="welcomeSlider__item slick-center">
              <img src="images/nft/nft-6.png" alt="" />
            </div>
            <div className="welcomeSlider__item">
              <img src="images/nft/nft-7.png" alt="" />
              
            </div>
          </Slider>
        </div>
        <div className="welcomeSlider__arrows">
          <span>Flyboy Collections</span>
        </div>
      </div>
    );
  }
}
