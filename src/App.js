import React, { useEffect, useState }  from "react";
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
// import ConnectionState from "./context/connection/state.js";
import {
  connectWallet,
 
  getCurrentWalletConnected,
 
} from "./utils/interact"

export default function App() {

  const [address, setWallet] = useState('');
 

  useEffect(() => {
    async function getInformation() {

      // addSmartContractListener();

      const { address } = await getCurrentWalletConnected();
      setWallet(address);
      addWalletListener();
    }
    getInformation()
  }, [])

  // function addSmartContractListener() {
  //   CryptoKittenNFT.events.JoinFace({}, (error, data) => {
  //     if (error) {
  //     } else {
  //     }
  //   });
  // }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    } else {
    }
  }


  const connect = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };
  // const genesisMint = async () => {

  //   await mint_genesis(address, genesisNumber);


  // }
  // const normalMint = async () => {
  //   await mint_normal(address, normalNumber);}
    return (
      <div className="App">
        <Header address={address} connect={connect} />
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
        <Mint address={address} connect={connect}/>
        <Team />
        <div className="anchorPoint" id="faq"></div>
        <Faq />
        <Footer />
      </div>
    );
  }

