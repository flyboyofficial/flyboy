import React from "react";
import Footer from "./parts/base/Footer";
import Header from "./parts/base/Header";
import Faq from "./parts/index/faq/Faq";
import Intro from "./parts/index/Intro";
import Mint from "./parts/index/Mint";
import Rarity from "./parts/index/Rarity";
import Roadmap from "./parts/index/roadmap/Roadmap";
import Story from "./parts/index/Story";
import Team from "./parts/index/team/Team";
import Welcome from "./parts/index/welcome/Welcome";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="anchorPoint" id="top"></div>
      <Intro />
      <div className="anchorPoint" id="welcome"></div>
      <Welcome />
      <div className="anchorPoint" id="story"></div>
      <Story />
      <div className="anchorPoint" id="rarity"></div>
      <Rarity />
      <div className="anchorPoint" id="roadmap"></div>
      <Roadmap />
      <div className="anchorPoint" id="mint"></div>
      <Mint />
      <Team />
      <div className="anchorPoint" id="faq"></div>
      <Faq />
      <Footer />
    </div>
  );
}
