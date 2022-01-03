import React, { Component } from "react";
import Slider from "react-slick";
function RoadPrev(props) {
  const { onClick } = props;
  return (
    <button type="button" className="roadPrev" onClick={onClick}>
      <img src="images/icons/chevron-left.svg" alt="" />
    </button>
  );
}
function RoadNext(props) {
  const { onClick } = props;
  return (
    <button type="button" className="roadNext" onClick={onClick}>
      <img src="images/icons/chevron-right.svg" alt="" />
    </button>
  );
}
export default class RoadmapSlider extends Component {
  render() {
    const settings = {
      slidesToShow: 3,
      infinite: false,
      nextArrow: <RoadNext />,
      prevArrow: <RoadPrev />,
      responsive: [
        {
          breakpoint: 1340,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    return (
      <div className="roadmapSlider__outer">
        <div className="roadmapSlider">
          <Slider {...settings}>
            <div className="roadmapSlider__item">
              <div className="roadmapSlider__item-plane">
                <img src="images/plane/plane-brown.svg" alt="" />
              </div>
              <div className="roadmapSlider__item-index brown">01</div>
              <h5>Launch Initiated</h5>
              <p>
                Our number one priority is keeping our NFTs quality worthy of
                our artist’s name.
                <br />
                <br />
                Each Bull goes through the same creative process and quality
                assurance that got Gal Yosef’s finest art pieces into the
                prestigious Eden Gallery... and which earned him over one
                million dollars from collectors wanting to showcase his art in
                their own collections. Selling his best pieces within a single
                month of getting exhibited.
                <br /> Our number one priority is keeping our NFTs quality
                worthy of our artist’s name.
              </p>
            </div>
            <div className="roadmapSlider__item">
              <div className="roadmapSlider__item-plane">
                <img src="images/plane/plane-light.svg" alt="" />
              </div>
              <div className="roadmapSlider__item-index yellow">02</div>
              <h5>Launch Initiated</h5>
              <p>
                Our number one priority is keeping our NFTs quality worthy of
                our artist’s name.
                <br />
                <br />
                Each Bull goes through the same creative process and quality
                assurance that got Gal Yosef’s finest art pieces into the
                prestigious Eden Gallery... and which earned him over one
                million dollars from collectors wanting to showcase his art in
                their own collections. Selling his best pieces within a single
                month of getting exhibited.
                <br /> Our number one priority is keeping our NFTs quality
                worthy of our artist’s name.
              </p>
            </div>
            <div className="roadmapSlider__item">
              <div className="roadmapSlider__item-plane">
                <img src="images/plane/plane-blue.svg" alt="" />
              </div>
              <div className="roadmapSlider__item-index green">03</div>
              <h5>Launch Initiated</h5>
              <p>
                Our number one priority is keeping our NFTs quality worthy of
                our artist’s name.
                <br />
                <br />
                Each Bull goes through the same creative process and quality
                assurance that got Gal Yosef’s finest art pieces into the
                prestigious Eden Gallery... and which earned him over one
                million dollars from collectors wanting to showcase his art in
                their own collections. Selling his best pieces within a single
                month of getting exhibited.
                <br /> Our number one priority is keeping our NFTs quality
                worthy of our artist’s name.
              </p>
            </div>
            <div className="roadmapSlider__item">
              <div className="roadmapSlider__item-plane">
                <img src="images/plane/plane-brown.svg" alt="" />
              </div>
              <div className="roadmapSlider__item-index brown">04</div>
              <h5>Launch Initiated</h5>
              <p>
                Our number one priority is keeping our NFTs quality worthy of
                our artist’s name.
                <br />
                <br />
                Each Bull goes through the same creative process and quality
                assurance that got Gal Yosef’s finest art pieces into the
                prestigious Eden Gallery... and which earned him over one
                million dollars from collectors wanting to showcase his art in
                their own collections. Selling his best pieces within a single
                month of getting exhibited.
                <br /> Our number one priority is keeping our NFTs quality
                worthy of our artist’s name.
              </p>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
