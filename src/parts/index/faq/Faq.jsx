import React, { useState } from "react";
import FaqItem from "./FaqItem";
import { FaqModul } from "./FaqModul";
export default function Faq() {
  const [state, setState] = useState(null);
  return (
    <section className="faq">
      <div className="faq__plane left">
        <img src="images/plane/faq-left.svg" alt="" />
      </div>
      <div className="faq__plane right">
        <img src="images/plane/faq-right.svg" alt="" />
      </div>
      <div className="auto__container">
        <div className="faq__inner">
          <h2>FAQ</h2>
          {FaqModul.map((FaqItems) => {
            return (
              <FaqItem
                key={FaqItems.id}
                id={FaqItems.id}
                image={FaqItems.image}
                alt={FaqItems.alt}
                title={FaqItems.title}
                text={FaqItems.text}
                state={state}
                setState={setState}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
