import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Anime from "../components/ui/Anime";
import blossomTree from "../assets/blossom-tree.svg";
export default function Search() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  // console.log(parsed);
  const title = parsed.anime_title;
  // console.log(title);
  const [searchList, setSearchList] = useState([]);

  async function searchAnime() {
    const response = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${title}&page[limit]=20`
    );
    const data_list = await response.json();

    if (data_list.data) {
      setSearchList(
        data_list.data
          .filter((item) => {
            return (
              item.attributes.canonicalTitle &&
              item.attributes.posterImage.original &&
              item.attributes.youtubeVideoId
            );
          })
          .slice(0, 24)
      );
    }
  }

  useEffect(() => {
    searchAnime();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row search-row">
          <div className="section__title">Results for "{title}"</div>
          <ul className="anime__list">
            {searchList.map((anime) => (
              <Anime
                id={anime.id}
                title={anime.attributes.canonicalTitle}
                cover_image={anime.attributes.posterImage.original}
                key={anime.id}
                genre={null}
              />
            ))}
          </ul>
          <figure className="tree__wrapper">
            <img src={blossomTree} className="tree-img" alt="" />
          </figure>
        </div>
      </div>
    </div>
  );
}
