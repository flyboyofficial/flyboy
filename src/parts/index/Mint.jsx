import { React, useState } from "react";
import Web3 from "web3"

export default function Mint(props) {
  const {address, connect, timeLeft} = props;
  const [counter, setCounter] = useState(1);
  const setMaxValue = () => setCounter(5);
  let incrementCounter = () => setCounter(counter + 1);
  if(counter >= 5) {
    incrementCounter = () => setCounter(5);
  }
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
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
     
            {timeLeft.days == 0 && timeLeft.hours == 0 && timeLeft.minutes == 0 && timeLeft.seconds == 0 ? 
            (<h2>PRESALE STARTED</h2>) : 
            (
              <h2 style={{fontSize:'55px'}}><span style={{fontSize:'24px'}}>Presale will start 31,JAN, 2022,13:00GMT<br></br></span>{timeLeft.days} days&nbsp;&nbsp;  {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}&nbsp;&nbsp;Left</h2>
              )}
          
    
          <p>Total Supply: 1013/1013 </p>
         
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
             <div className="max" onClick={setMaxValue}>MAX</div>
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
