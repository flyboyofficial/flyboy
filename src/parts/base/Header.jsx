import React, { useState, useEffect } from "react";

export default function Header(props) {
  const { address, connect } = props;
  const [menu, setMenu] = useState(false);
  var links = document.querySelectorAll(".nav__inner-link");

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  const start = 300;
  const onScroll = () => {
    if (window.scrollY > start) {
      document.getElementById("header").classList.add("sticky");
    } else {
      document.getElementById("header").classList.remove("sticky");
    }
  };

  const menuClose = React.useCallback((e) => {
    const target = e.target;
    if (target === document.querySelector(".nav")) {
      document.body.classList.remove("active");
      document.body.removeEventListener("click", menuClose);
      setMenu(false);
    }
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.addEventListener("click", menuClose);
      document.body.classList.add("active");
    }
  }, [menu]);

  var body = document.body;
  links.forEach((e) => {
    onLinkClick(e);
  });

  function onLinkClick(linkItem) {
    linkItem.addEventListener("click", function () {
      setMenu(false);
      body.classList.remove("active");
    });
  }
  return (
    <header className="header" id="header">
      <div className="auto__container">
        <div className="header__inner">
          <a href="#top" className="header__inner-logo">
            <img src="images/logo.svg" alt="" />
          </a>
          <nav className={"nav " + (menu ? "active" : "")} id="menu">
            <div className="nav__inner">
              <a href="#welcome" className="nav__inner-link">
                Introduction
              </a>
              <a href="#story" className="nav__inner-link">
                story
              </a>
              <a href="#rarity" className="nav__inner-link">
                Rarity
              </a>
              <a href="#roadmap" className="nav__inner-link">
                Roadmap
              </a>
              <a href="#mint" className="nav__inner-link">
                Mint Now
              </a>
              <a href="#faq" className="nav__inner-link">
                FAQ
              </a>
              <div className="nav__inner-social">
                <a href="https://www.instagram.com/flyboynft" className="nav__inner-social-link">
                  <img src="images/icons/instagram.svg" alt="" />
                </a>
                <a href="https://www.twitter.com/flyboynft" className="nav__inner-social-link">
                  <img src="images/icons/twitter.svg" alt="" />
                </a>
                <a href="https://discord.gg/PCTF7wrtJ3" className="nav__inner-social-link">
                  <img src="images/icons/discord.svg" alt="" />
                </a>
              </div>
             
                {address !== "" &&
                 <button className="button primary">
                  {address.slice(0, 6)}...{address.slice(
                    address.length - 4,
                    address.length
                  )}
                  </button>
                }
                {address === '' &&
                 <button className="button primary" onClick={connect}>
                 Connect MetaMask
                </button>
                }
            </div>
          </nav>
          <div
            className={"burger " + (menu ? "active" : "")}
            id="menuBtn"
            onClick={() => {
              setMenu(!menu);
            }}
          ></div>
        </div>
      </div>
    </header>
  );
}
