import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      arrows: false,
      speed: 500,
      fade: true,
      cssEase: "linear",
    };
    return (
      <div className="introSlider">
        <Slider {...settings}>
          <div className="introSlider__item">
            <img src="images/slide.png" alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}
