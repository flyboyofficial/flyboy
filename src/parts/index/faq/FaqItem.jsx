import React from "react";

export default function FaqItem(props) {
  const setStateOrClose = (tab) => {
    if (tab === props.state) props.setState(null);
    else props.setState(tab);
  };
  return (
    <div className="accord">
      <h6
        className={`accord__btn ${
          props.state === `accord-${props.id}` ? "active" : ""
        }`}
        onClick={() => setStateOrClose(`accord-${props.id}`)}
      >
        <img src={props.image} alt={props.bear} />
        {props.title}
      </h6>
      <p
        className={`accord__para ${
          props.state === `accord-${props.id}` ? "active" : ""
        }`}
      >
        {props.text}
      </p>
    </div>
  );
}
