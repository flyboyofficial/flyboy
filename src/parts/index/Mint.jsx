import { React, useState } from "react";
import Web3 from "web3"

export default function Mint(props) {
  const {address, connect} = props;
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 0) {
    decrementCounter = () => setCounter(0);
  }

  const mintButton = async () => {
          //MINT NOW BUTTON HANDLER

          const { ethereum } = window;

          if (!ethereum) {
               alert("Make sure you have Metamask Installed!");
               return;
          }
          
          const contract = await loadContract();
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

           
          var stage = document.getElementById('mint-button').innerHTML;

          if (stage === 'Connect Wallet') {
            document.getElementById('mint-button').innerHTML = 'Mint';
            return;
          }


          const state = await contract.methods.saleState().call()
          if (state === "1") {
                console.log(state)

                const url = "https://flyboyofficial.github.io/whitelist.json"

                const json = await fetch(url)
                  .then((res) => res.json())
                  .catch(() => {
                    console.log("Error retrieving whitelist addresses")
                  })

                console.log(json)

                if (json) {
                  //const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); //if I call accounts again it works but really inefficient, whats the solution?
                  const found = json.map((entry) => entry.toLowerCase()).includes(accounts[0].toLowerCase(), 0)

                  if (found) {
                    var message = window.web3.utils.soliditySha3('0x90A9e219d8f16f15663068C33E2D36813B6A1512', accounts[0]);
                    var sign = await window.web3.eth.accounts.sign(message, '603c13734233792745d50a6c9c0a55a075ad8b919d3c57d024e72a98a2d86353');

                     var r = sign['r'];
                     var s = sign['s'];
                     var v = sign['v'];


                    const contract = await loadContract();
                    const mint_fee = await contract.methods.mintCost().call();
                    //alert(mint_fee)
                    const amount = document.getElementById('value').value;

                    if (amount === 0) {
                       alert("No Quantity Selected!");
                       return;
                    }
                    
                    const gas_ = await contract.methods.presaleMint(amount, v, r, s).estimateGas({from: accounts[0], value: mint_fee * amount}).catch(e => {
                                        if (e.message.includes('insufficient funds')) {
                                            alert('You have insufficient funds to mint this NFT');
                                         }
                                         else {
                                            alert(e.message);
                                         }
                                         });
                    if (!gas_) {
                      return
                    }

                    const method = await contract.methods.presaleMint(amount, v, r, s).send( {from: accounts[0], value: mint_fee * amount, gas: gas_})
                    
                  }  
                  else {
                    alert("Metamask account not whitelisted, you are not allowed to mint!")
                  }
                } 
          } 
          else if (state === "2") {
               const contract = await loadContract();

              const mint_fee = await contract.methods.mintCost().call();
              const amount = document.getElementById('value').value;

              if (amount === 0) {
                  alert("No Quantity Selected!");
                  return;
              }

              const gas_ = await contract.methods.publicSaleMint(amount).estimateGas({ from: accounts[0], value: mint_fee * amount }).catch(e => {
                                        if (e.message.includes('insufficient funds')) {
                                            alert('You have insufficient funds to mint this NFT');
                                         }
                                         else {
                                            alert(e.message);
                                         }
                                         });
              //alert(gas)
              if (!gas_) {
                return
              }
              const method = await contract.methods.publicSaleMint(amount).send({ from: accounts[0], value: mint_fee * amount, gas: gas_ });
          }
          else {
               alert('Sale not Open!');
          }
     }

     const loadContract = async () => {
          const { ethereum } = window;

          if (!ethereum) {
               alert("Make sure you have Metamask Installed!");
               return;
          }
          
          console.log("Metamask is Installed!");
          window.web3 = new Web3(window.ethereum);

          return await new window.web3.eth.Contract([
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "ApprovalForAll",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "stateMutability": "payable",
            "type": "fallback"
          },
          {
            "inputs": [],
            "name": "accountBalance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "burnTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "baseURI_",
                "type": "string"
              }
            ],
            "name": "changeBaseURI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_dummy",
                "type": "address"
              }
            ],
            "name": "changeDummy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "unrevealedURI_",
                "type": "string"
              }
            ],
            "name": "changeUnrevealedURI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "getApproved",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              }
            ],
            "name": "isApprovedForAll",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "isPaused",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_add",
                "type": "address"
              },
              {
                "internalType": "uint8",
                "name": "_v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "_r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "_s",
                "type": "bytes32"
              }
            ],
            "name": "isValidAccessMessage",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "maxMint",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "mintCost",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "mintsPerAddress",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "openPresale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "openPublicSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "ownerOf",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "number",
                "type": "uint256"
              },
              {
                "internalType": "uint8",
                "name": "_v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "_r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "_s",
                "type": "bytes32"
              }
            ],
            "name": "presaleMint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "number",
                "type": "uint256"
              }
            ],
            "name": "publicSaleMint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              }
            ],
            "name": "reservedMintGiveaways",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "number",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              }
            ],
            "name": "reservedMintTeam",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "reservedMintsLeftGiveaways",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "reservedMintsLeftTeam",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "reveal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
              }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "saleState",
            "outputs": [
              {
                "internalType": "enum nft.State",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "shareholder1",
            "outputs": [
              {
                "internalType": "address payable",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "shareholder2",
            "outputs": [
              {
                "internalType": "address payable",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "shareholder3",
            "outputs": [
              {
                "internalType": "address payable",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "shareholder4",
            "outputs": [
              {
                "internalType": "address payable",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "shareholder5",
            "outputs": [
              {
                "internalType": "address payable",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
              }
            ],
            "name": "supportsInterface",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "timeOfReveal",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "togglePause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId_",
                "type": "uint256"
              }
            ],
            "name": "tokenURI",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "unrevealedURI",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "stateMutability": "payable",
            "type": "receive"
          }
        ], '0x90A9e219d8f16f15663068C33E2D36813B6A1512');
     }

  return (
    <section className="mint">
      <div className="mint__bg">
        <img src="images/mintBg.svg" alt="" />
      </div>
      <div className="auto__container">
        <form action="#" className="mint__inner">
          <div className="mint__inner-line left"></div>
          <div className="mint__inner-line right"></div>
          <h2>Mint soon</h2>
          <p>5150 Bear NFT (0.06 ETH/ 1 Bear)</p>
          <div className="mint__inner-row">
            <div className="mint__inner-row-text">mint amount</div>
            <div className="mint__inner-input">
              <div className="spinbox">
                <button type="button" onClick={decrementCounter}>
                  -
                </button>
                <input
                  id="value"
                  type="number"
                  value={counter}
                  min="0"
                  max="5"
                  readOnly="readonly"
                />
                <button type="button" onClick={incrementCounter}>
                  +
                </button>
              </div>
              <div className="max">MAX</div>
            </div>
          </div>
          <div className="mint__inner-footer">
            {!address ? 
            <button type="button" id="mint-button" onClick={connect} className="button primary">
              Connect Wallet
            </button>
            :
            <button type="button" className="button primary">MINT</button>
            }
          </div>
        </form>
      </div>
    </section>
  );
}
