import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Anime from "../components/ui/Anime";
import blossomTree from "../assets/blossom-tree.svg";
export default function Search() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  //console.log(parsed);
  const title = parsed.anime_title;
  //console.log(title);
  const [searchList, setSearchList] = useState([]);

  async function searchAnime() {
    const response = await fetch(
      `https://api.aniapi.com/v1/anime?title=${title}&nsfw=true`
    );
    const data_list = await response.json();

    if (data_list.data.documents) {
      setSearchList(
        data_list.data.documents
          .filter((item) => {
            return item.trailer_url && item.descriptions.en;
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
                title={anime.titles.en}
                cover_image={anime.cover_image}
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
