import React from "react";
import TeamItem from "./TeamItem";
import { TeamModul } from "./TeamModul";

export default function Team(props) {
  return (
    <section className="team">
      <div className="auto__container">
        <h2>Team members</h2>
        <div className="team__inner">
          {TeamModul.map((TeamItems) => {
            return (
              <TeamItem
                key={TeamItems.id}
                image={TeamItems.image}
                title={TeamItems.title}
                text={TeamItems.text}
                alt={TeamItems.alt}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
