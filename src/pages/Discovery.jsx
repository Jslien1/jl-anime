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
    const response2 = await fetch(
      "https://kitsu.io/api/edge/anime?page[limit]=20"
    );
    const data_list2 = await response2.json();
    setAnimeList(
      data_list2.data
        .filter((item) => {
          return (
            item.attributes.canonicalTitle &&
            item.attributes.posterImage.original
          );
        })
        .slice(0, 12)
    );
  }

  async function filterYear(year) {
    setYear(year);
    const response = genreSet
      ? await fetch(
          `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&filter[categories]=${genreSet}&page[limit]=20`
        )
      : await fetch(
          `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&page[limit]=20`
        );
    const data_list2 = await response.json();
    setAnimeList(
      data_list2.data
        .filter((item) => {
          return (
            item.attributes.canonicalTitle &&
            item.attributes.posterImage.original &&
            item.attributes.youtubeVideoId
          );
        })
        .slice(0, 12)
    );
  }

  async function filterGenre(genre) {
    setGenre(genre);
    const response = yearSet
      ? await fetch(
          `https://kitsu.io/api/edge/anime?filter[seasonYear]=${yearSet}&filter[categories]=${genre}&page[limit]=20`
        )
      : await fetch(
          `https://kitsu.io/api/edge/anime?filter[categories]=${genre}&page[limit]=20`
        );
    const data_list = await response.json();
    setAnimeList(
      data_list.data
        .filter((item) => {
          return (
            item.attributes.canonicalTitle &&
            item.attributes.posterImage.original
          );
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
                      title={anime.attributes.canonicalTitle}
                      cover_image={anime.attributes.posterImage.original}
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
