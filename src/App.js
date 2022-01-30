import React, { useEffect, useState } from "react";
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
import axios from 'axios'
// import ConnectionState from "./context/connection/state.js";
import {
	connectWallet,
	mint,
	loadTotalMintCount,
	getBalance,
	FlyBoyNFT,
	getStatus,
	getCurrentWalletConnected,

} from "./utils/interact.jsx"

export default function App() {

	const [address, setWallet] = useState("");
	const [walletIntegration, setWalletIntegration] = useState("");
	const [counter, setCounter] = useState(1);
	const [ispresale, setPresale] = useState();
	const [status, setStatus] = useState();
	const [balance, setBalance] = useState(0);
	const [totalMintCount, setTotalMintCount] = useState("0");
	// const [mintCount, setMintCount] = useState(1);
	const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
	const [presaleStarted, setPresalestarted] = useState();
	const [publicsaleStarted, setPublicsaleStarted] = useState();

	const calculateTimeLeft = () => {
		let difference = new Date(1643634000000) - new Date();; //
		let timeLeft = {};
		// if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		// }
		return timeLeft;
	}

	const calculatePresaleTimeLeft = () => {
		let difference = new Date(1643893200000) - new Date(); //
		let timeLeft = {};
		// if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		// }
		return timeLeft;
	}

	useEffect(async () => {
		if (address) {
			const purchase_count = await getBalance(address);
			setBalance(purchase_count);
			const body = {
				address: address,
			}
			axios
				.post("http://localhost:3001/checkUser", body, {
					"Content-Type": "application/json;charset=UTF-8",
					"access-control-allow-origin": "*",
				})
				.then((response) => {
					console.log("status", response);
					setPresale(response.data.success);
				})
				.catch((error) => { });

		}
	}, [address])


	useEffect(() => {
		async function getInformation() {
			const soldCount = await loadTotalMintCount();
			setTotalMintCount(1013 - soldCount);
			// setMintCount(1);
			const checkStatus = await getStatus();
			setStatus(checkStatus);
			addSmartContractListener();

			const { address, } = await getCurrentWalletConnected();
			setWallet(address);
			addWalletListener();
		}

		setInterval(() => {
			const date = calculateTimeLeft();
			const presaleDate = calculatePresaleTimeLeft();
			if (date.days == 0 && date.hours == 0 && date.minutes == 0 && date.seconds == 0) { 
				setTimeLeft(calculatePresaleTimeLeft()); 
				setPresalestarted(true);
				setPublicsaleStarted(false);
			} else {
				setTimeLeft(calculateTimeLeft());
				setPresalestarted(false);
				setPublicsaleStarted(false);
			}
			if(presaleDate.days == 0 && presaleDate.hours == 0 && presaleDate.minutes == 0 && presaleDate.seconds == 0){
				setPublicsaleStarted(true);
			}
			// if(timeLeft.seconds === undefined) clearInterval(startTimer);
		}, 1000);
		getInformation()
	}, [])

	useEffect(() => {
	}, [timeLeft])

	function addSmartContractListener() {
		FlyBoyNFT.events.JoinFace({}, (error, data) => {
			if (error) {
			} else {
			}
		});
	}

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
		setWalletIntegration(walletResponse.status);
	};

	const onMintPressed = async () => {
		let price = 0;
		console.log("status === ", status);
		if (status == true) {
			if (counter == 1) { price = 0.04 }
			else if (counter == 2) { price = 0.075 }
			else if (counter == 3) { price = 0.11 }
			else if (counter == 4) { price = 0.14 }
			else if (counter == 5) { price = 0.16 }
		}
		else if (status == false) {
			if (counter == 1) { price = 0.06 }
			else if (counter == 2) { price = 0.1 }
			else if (counter == 3) { price = 0.16 }
			else if (counter == 4) { price = 0.12 }
			else if (counter == 5) { price = 0.26 }

		}
		console.log("valuables are = =", address, ispresale, counter, price, balance);
		await mint(address, ispresale, counter, price, balance);
	}

	// const onReserve = async() =>{
	// 	await Reserve(walletAddress, mintCount);
	// }


	return (
		<div className="App">
			<div className="wallet-alert" style={{fontSize: "15px", backgroundColor: "#cd0808", textAlign: "center"}}>{walletIntegration}</div>
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
			<Mint address={address} connect={connect} timeLeft={timeLeft} counter={counter} setCounter={setCounter} balance={balance} onMintPressed={onMintPressed} totalMintCount={totalMintCount} presaleStarted={presaleStarted} publicsaleStarted={publicsaleStarted}/>
			<Team />
			<div className="anchorPoint" id="faq"></div>
			<Faq />
			<Footer />
		</div>
	);

}
