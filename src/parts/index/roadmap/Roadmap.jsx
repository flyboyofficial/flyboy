import React from "react";
import RoadmapSlider from "./RoadmapSlider";

export default function Roadmap() {
  return (
    <section className="roadmap">
      <div className="roadmap__bg">
        <img src="images/roadmapBg.png" alt="" />
      </div>
      <div className="auto__container">
        <div className="roadmap__inner">
          <h2>
            <span className="left">
              <img src="images/vectors/sm-cloud-left.svg" alt="" />
            </span>
            Roadmap
            <span className="right">
              <img src="images/vectors/sm-cloud-right.svg" alt="" />
            </span>
          </h2>
          <p>Here is what we have planned for this project.</p>
          <RoadmapSlider />
        </div>
      </div>
    </section>
  );
}
