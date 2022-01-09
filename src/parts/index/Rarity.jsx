import React from "react";

export default function Rarity() {
  return (
    <section className="rarity">
      <div className="auto__container">
        <h2>Rarity</h2>
        <p>
          Over <a href="/">100 unique traits</a> with varying rarity across all
          categories will be used to generate all our Bear. There will be the
          following 7 categories.
        </p>
        <div className="rarity__inner">
          <div className="rarity__inner-nft">
            <img src="images/rarity/rarity-2.png" alt="" />
          </div>
          <div className="rarity__inner-nft">
            <img src="images/rarity/rarity-1.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
