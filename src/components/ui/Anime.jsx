import React from "react";
import { Link } from "react-router-dom";

export default function Anime({ id, title, cover_image, genre }) {
  return (
    <li className="anime">
      <Link to={genre ? `/info/${id}/${genre}` : `/info/${id}`}>
        <figure className="anime__img--wrapper">
          <img className="anime__img" src={cover_image} alt="" />
        </figure>
      </Link>
      <Link to={genre ? `/info/${id}/${genre}` : `/info/${id}`}>
        <span className="anime__title">{title}</span>
      </Link>
    </li>
  );
}
