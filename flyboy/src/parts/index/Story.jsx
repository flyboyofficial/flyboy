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
        <h2>The story</h2>
        <div className="story__inner">
          <p>
            We are presenting you 10.000 unique bear NFTs. The Bear is a
            one-of-a-kind digital collection of NFTs stored on the Ethereum
            Blockchain. Each Mouse is generated algorithmically by combining
            various traits, and each one is minutely picked and constructed to
            serve a certain role in NFT.
          </p>
        </div>
      </div>
    </section>
  );
}
