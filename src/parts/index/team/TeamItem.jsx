import React from "react";

export default function TeamItem(props) {
  return (
    <div className="team__inner-member" key={props.id}>
      <div className="team__inner-member-image">
        <img src={props.image} alt={props.alt} />
      </div>
      <h4>{props.title}</h4>
      <p>{props.text}</p>
    </div>
  );
}
