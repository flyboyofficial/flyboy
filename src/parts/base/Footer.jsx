import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="auto__container">
        <div className="footer__inner">
          <div className="footer__inner-terms">Term and condition</div>
          <div className="footer__inner-copy">@ 2021 fly boy</div>
          <div className="footer__inner-social">
            <a href="https://www.instagram.com/flyboynft">
              <img src="images/icons/instagramWhite.svg" alt="" />
            </a>
            <a href="https://www.twitter.com/flyboynft">
              <img src="images/icons/twitterWhite.svg" alt="" />
            </a>
            <a href="https://discord.gg/PCTF7wrtJ3">
              <img src="images/icons/discordWhite.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
