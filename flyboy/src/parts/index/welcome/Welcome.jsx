import React from "react";
import WelcomeSlider from "./WelcomeSlider";

export default function Welcome() {
  return (
    <section className="welcome">
      <div className="auto__container">
        <h2>
          Welcome to
          <br />
          <span>FlyBoy</span>
        </h2>
        <div className="welcome__inner">
          <div className="welcome__inner-content">
            <p>
              We are presenting you 10.000 unique NFTs. A one-of-a-kind digital
              collection of NFTs stored on the Ethereum Blockchain. Each Mouse
              is generated algorithmically by combining various traits, and each
              one is minutely picked and constructed to serve a certain role in
              The Mice House. Each mouse’s appearance is generated at random,
              making each mouse special and awesome. Some, however, may be rarer
              than others, well, catch them if you can. Follow our storyline to
              become a part of this whimsical tale.
            </p>
            <div className="welcome__inner-content-row">
              <a href="/" className="button secondary">
                mint now
              </a>
              <a href="/" className="button primary">
                Buy on opeansea
              </a>
            </div>
          </div>
          <WelcomeSlider />
        </div>
      </div>
    </section>
  );
}
