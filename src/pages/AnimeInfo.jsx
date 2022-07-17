import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import ReactPlayer from "react-player";

export default function AnimeInfo() {
  const { id, genre } = useParams();
  const [genreList, setGenreList] = useState();
  const [animeItem, setAnimeItem] = useState({
    id: 0,
    attributes: {
      posterImage: { original: "" },
      canonicalTitle: "",
      description: "",
      startDate: "",
      episodeCount: "",
      averageRating: 0,
      youtubeVideoId: "",
    },
  });

  async function getAnimeInfo() {
    const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
    const anime_info = await response.json();
    console.log(anime_info);
    setAnimeItem(anime_info.data);
  }

  async function getGenres() {
    const response = await fetch(
      `https://kitsu.io/api/edge/anime/${id}/categories`
    );
    const genre_info = await response.json();
    let genreList = [];
    for (let i = 0; i < genre_info.data.length; i++) {
      genreList.push(genre_info.data[i].attributes.title);
    }
    // console.log("GenreList: ", genreList);
    let genreString = "";
    // let genreList = animeItem.genres.slice(0, 3);
    // console.log(genre);
    // if (genre) {
    //   const genreExist = genreList.find((item) => genre === item);
    //   if (!genreExist) {
    //     genreList[genreList.length - 1] = genre;
    //     genreList.sort((a, b) => a - b);
    //   }
    // }
    for (let i = 0; i < genreList.length; i++) {
      genreString += i === 0 ? genreList[i] : `, ${genreList[i]}`;
    }
    setGenreList(genreString);
  }

  useEffect(() => {
    getAnimeInfo();
    getGenres();
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
                  src={animeItem.attributes.posterImage.original}
                  alt=""
                />
              </figure>
              <span className="anime__title">
                {animeItem.attributes.canonicalTitle}
              </span>
            </div>
            <div className="anime__description">
              <h2>Description</h2>
              <p>{parse(animeItem.attributes.description)}</p>
              <span className="year">
                Release Year: {animeItem.attributes.startDate.slice(0, 4)}
              </span>
              <span className="episodes">
                Episodes: {animeItem.attributes.episodeCount}
              </span>
              <span className="genres">Genres: {genreList}</span>
              <span className="score">
                Score: {animeItem.attributes.averageRating}
              </span>
            </div>
          </div>
          <ReactPlayer
            className="anime__preview"
            controls
            url={`https://www.youtube.com/watch?v=${animeItem.attributes.youtubeVideoId}`}
          />
        </div>
      </div>
    </div>
  );
}
