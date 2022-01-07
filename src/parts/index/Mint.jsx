import { React, useState } from "react";

export default function Mint() {
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 0) {
    decrementCounter = () => setCounter(0);
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
            <button type="submit" className="button primary">
              Connect Wallet
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
