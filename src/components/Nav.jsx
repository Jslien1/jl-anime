import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Anime.svg";

export default function Nav() {
  function openMenu() {
    document.body.classList += " menu--open";
  }
  function closeMenu() {
    document.body.classList.remove("menu--open");
  }
  return (
    <nav>
      <div className="nav__container">
        <button className="btn__menu" onClick={openMenu}>
          <FontAwesomeIcon icon={"bars"} />
        </button>
        <Link to="/" className="logo__wrapper">
          <img className="logo" src={logo} alt="" />
        </Link>
        <div className="nav__features--wrapper">
          <Link to="/" className="nav__link">
            <button className="btn nav__button">Home</button>
          </Link>
          <Link to="/discovery" className="nav__link">
            <button className="btn nav__button">Browse Anime</button>
          </Link>
          <form action="/search" className="nav__form">
            <input
              type="text"
              name="anime_title"
              placeholder="Search for an anime by title"
            />
            <button>
              <FontAwesomeIcon icon={"search"} />
            </button>
          </form>
        </div>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeMenu}>
            <FontAwesomeIcon icon={"times"} />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/discovery" className="menu__link" onClick={closeMenu}>
                Anime
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
