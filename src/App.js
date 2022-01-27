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
 
} from "./utils/interact.jsx"

export default function App() {

  const [address, setWallet] = useState("");
	// const [totalMintCount, setTotalMintCount] = useState("0");
	// const [mintCount, setMintCount] = useState(1);
	const [timeLeft, setTimeLeft] = useState({days:0,hours:0,minutes:0,seconds:0});
		
	const calculateTimeLeft = () => {
		let difference = new Date(`2022-01-31T18:00:00.000+02:00`) - new Date(); //
		let timeLeft = {};
		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		}
		return timeLeft;
	}

	useEffect(() => {
		async function getInformation() {
			// const count = await loadTotalMintCount();
			// setTotalMintCount(count);
			// setMintCount(1);
			// addSmartContractListener();

			const { address,  } = await getCurrentWalletConnected();
			setWallet(address);
			addWalletListener();
		}

		const startTimer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
			// if(timeLeft.seconds === undefined) clearInterval(startTimer);
		}, 1000);
		getInformation()
	}, [])

  useEffect(() => {
  }, [timeLeft])

	// function addSmartContractListener() {
	// 	DafeisContract.events.JoinFace({}, (error, data) => {
	// 		if (error) {
	// 		} else {
	// 		}
	// 	});
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
    console.log("ddddd", timeLeft.days);
	};

	// const onMintPressed = async() => {
	// 	console.log(mintCount);
	// 	await mintDafeisCount(walletAddress, mintCount);
	// }

	// const onReserve = async() =>{
	// 	await Reserve(walletAddress, mintCount);
	// }


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
        <Mint address={address} connect={connect} timeLeft={timeLeft}/>
        <Team />
        <div className="anchorPoint" id="faq"></div>
        <Faq />
        <Footer />
      </div>
    );
  
    }
