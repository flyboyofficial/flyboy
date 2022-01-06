import React from "react";

export default function Story() {
  return (
    <section className="story">
      <div className="story__bg">
        <img src="images/story.png" alt="" />
      </div>
      <div className="story__cloud left">
        <img src="images/vectors/cloud-left.svg" alt="" />
      </div>
      <div className="story__cloud right">
        <img src="images/vectors/cloud-right.svg" alt="" />
      </div>
      <div className="auto__container">
        <h2>FlyBoys’ Flying Club (FBFC)</h2>
        <div className="story__inner">
          <p>
            Plots of Sandbox land have been donated by the founders to create
            the very first virtual flying club in the metaverse world. We
            already have a Sandbox designer working on creating our hangers,
            planes and runway. In the long run, FBFC will be the go-to place for
            all aviation enthusiasts to gather and decide on the future of the
            club and community.
          </p>
        </div>
      </div>
    </section>
  );
}
