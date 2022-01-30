import { React, useState } from "react";
import Web3 from "web3"

export default function Mint(props) {
  const { address, connect, timeLeft, counter, setCounter, balance, onMintPressed, totalMintCount, presaleStarted, publicsaleStarted } = props;
  const remaining = 5 - balance;

  const setMaxValue = () => setCounter(remaining);
  let incrementCounter = () => setCounter(counter + 1);
  if (counter >= 5) {
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

          {!publicsaleStarted ? 
          (<><h2><span style={presaleStarted ? { fontSize: '40px' } : { fontSize: '24px' }}>
            {!presaleStarted ? "Presale will start 31,JAN, 2022,13:00GMT" : "Presale started"}
            <br></br></span></h2>
          <h2 style={{ fontSize: '55px' }}>{timeLeft.days} days&nbsp;&nbsp;  {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}&nbsp;&nbsp;TO GO</h2></>)
          :
          (<h2><span style={{ fontSize: '40px' }}>
            Public Sale started
          <br></br></span></h2>)
          }



          {remaining == 0 ?
            (<p>you can't mint any more in presale</p>) :
            (<p>you can mint {remaining} more in the presale</p>)}



          <p>Total Supply: {totalMintCount}/1013 </p>

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
              (<>
                {
                  balance == 5 ?
                    <button type="button" className="button primary" onClick={onMintPressed} disabled>MINT</button>
                    :
                    <button type="button" className="button primary" onClick={onMintPressed} >MINT</button>
                }
              </>)
            }
          </div>
        </form>
      </div>
    </section>
  );
}
