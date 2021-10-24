import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Anime.svg";

export default function Footer() {
  return (
    <div>
      <div className="container">
        <div className="row row__column">
          <Link to="/" className="logo__wrapper">
            <img className="logo" src={logo} alt="" />
          </Link>
          <span className="footer__copyright">
            Copyright &copy; 2021 Jeffrey Lien
          </span>
        </div>
      </div>
    </div>
  );
}
