import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export default function AnimeInfo() {
  const { id, genre } = useParams();

  const [animeItem, setAnimeItem] = useState({
    id: 0,
    cover_image: "",
    titles: { en: "" },
    descriptions: { en: "" },
    season_year: 0,
    episodes_count: 0,
    genres: [],
    score: 0,
    trailer_url: "",
  });

  async function getAnimeInfo() {
    const response = await fetch(`https://api.aniapi.com/v1/anime/${id}`);
    const anime_info = await response.json();
    console.log(anime_info.data);
    setAnimeItem(anime_info.data);
  }

  function getGenres() {
    let genreString = "";
    let genreList = animeItem.genres.slice(0, 3);
    console.log(genre);
    if (genre) {
      const genreExist = genreList.find((item) => genre === item);
      if (!genreExist) {
        genreList[genreList.length - 1] = genre;
        genreList.sort((a, b) => a - b);
      }
    }
    for (let i = 0; i < genreList.length; i++) {
      genreString += i === 0 ? genreList[i] : `, ${genreList[i]}`;
    }
    return genreString;
  }

  useEffect(() => {
    getAnimeInfo();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="anime__info">
            <div className="anime__cover">
              <figure className="anime__img--wrapper">
                <img
                  className="anime__img"
                  src={animeItem.cover_image}
                  alt=""
                />
              </figure>
              <span className="anime__title">{animeItem.titles.en}</span>
            </div>
            <div className="anime__description">
              <h2>Description</h2>
              <p>{parse(animeItem.descriptions.en)}</p>
              <span className="year">
                Release Year: {animeItem.season_year}
              </span>
              <span className="episodes">
                Episodes: {animeItem.episodes_count}
              </span>
              <span className="genres">Genres: {getGenres()}</span>
              <span className="score">Score: {animeItem.score}</span>
            </div>
          </div>
          <div className="anime__preview">
            <iframe src={animeItem.trailer_url}></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
