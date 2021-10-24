import React, { useState, useEffect } from "react";
import Anime from "../components/ui/Anime";
import AnimeSkeleton from "../components/ui/AnimeSkeleton";

export default function Discovery() {
  const [animeList, setAnimeList] = useState();
  const [yearSet, setYear] = useState();
  const [genreSet, setGenre] = useState();
  const skeletonList = [];
  for (let i = 0; i < 12; i++) {
    skeletonList.push(
      <AnimeSkeleton
        outer__class={"skeleton skeleton__discovery"}
        inner__class={"anime__cover--skeleton"}
        key={i}
      />
    );
  }
  async function getRandomAnime() {
    const response = await fetch("https://api.aniapi.com/v1/anime?nsfw=true");
    const data_list = await response.json();
    setAnimeList(
      data_list.data.documents
        .filter((item) => {
          return item.trailer_url && item.descriptions.en;
        })
        .slice(0, 12)
    );
  }

  async function filterYear(year) {
    setYear(year);
    const response = genreSet
      ? await fetch(
          `https://api.aniapi.com/v1/anime?nsfw=true&year=${year}&genres=${genreSet}`
        )
      : await fetch(`https://api.aniapi.com/v1/anime?nsfw=true&year=${year}`);
    const data_list = await response.json();
    setAnimeList(
      data_list.data.documents
        .filter((item) => {
          return item.trailer_url && item.descriptions.en;
        })
        .slice(0, 12)
    );
  }

  async function filterGenre(genre) {
    setGenre(genre);
    const response = yearSet
      ? await fetch(
          `https://api.aniapi.com/v1/anime?nsfw=true&genres=${genre}&year=${yearSet}`
        )
      : await fetch(
          `https://api.aniapi.com/v1/anime?nsfw=true&genres=${genre}`
        );
    const data_list = await response.json();
    setAnimeList(
      data_list.data.documents
        .filter((item) => {
          return item.trailer_url && item.descriptions.en;
        })
        .slice(0, 12)
    );
  }

  function clearFilter() {
    setGenre(null);
    setYear(null);
    let genre = document.querySelector("#filter__genre");
    genre.selectedIndex = null;
    let year = document.querySelector("#filter__year");
    year.selectedIndex = null;
    getRandomAnime();
  }

  useEffect(() => {
    getRandomAnime();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row discovery-row">
          <div className="anime__list--wrapper">
            <div className="section__title">DISCOVER NEW ANIME</div>
            <ul className="anime__list discovery__list">
              {animeList ? (
                <>
                  {animeList.map((anime) => (
                    <Anime
                      id={anime.id}
                      title={anime.titles.en}
                      cover_image={anime.cover_image}
                      key={anime.id}
                      genre={genreSet}
                    />
                  ))}
                </>
              ) : (
                <>{skeletonList}</>
              )}
            </ul>
          </div>
          <div className="filter__menu">
            <div className="section__title section__title--small">
              FILTER BY
            </div>
            <div className="filter__menu--wrapper">
              <select
                id="filter__year"
                defaultValue="DEFAULT"
                onChange={(event) => filterYear(event.target.value)}
              >
                <option value="DEFAULT" disabled>
                  Year
                </option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
              <select
                id="filter__genre"
                defaultValue="DEFAULT"
                onChange={(event) => filterGenre(event.target.value)}
              >
                <option value="DEFAULT" disabled>
                  Genre
                </option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Comedy">Comedy</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Isekai">Isekai</option>
                <option value="Mecha">Mecha</option>
                <option value="Psychological">Psychological</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Shounen">Shounen</option>
                <option value="Slice of Life">Slice of Life</option>
                <option value="Sports">Sports</option>
              </select>
              <button className="btn clear-btn" onClick={() => clearFilter()}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
