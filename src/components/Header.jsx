import React, { useState, useEffect } from "react";
import Anime from "./ui/Anime";
import AnimeSkeleton from "./ui/AnimeSkeleton";

export default function Header() {
  const [trendingList, setTrendingList] = useState();
  const skeletonList = Array(6).fill(
    <AnimeSkeleton
      outer__class={"skeleton skeleton__home"}
      inner__class={"anime__cover--skeleton"}
    />
  );
  async function getTrendingAnime() {
    const response = await fetch(
      "https://api.aniapi.com/v1/anime?formats=0&status=0&nsfw=true"
    );
    const data_list = await response.json();
    console.log(
      data_list.data.documents.filter((item) => {
        return item.trailer_url && item.descriptions.en;
      })
    );
    setTrendingList(
      data_list.data.documents
        .filter((item) => {
          return item.trailer_url && item.descriptions.en;
        })
        .slice(0, 6)
    );
  }

  useEffect(() => {
    getTrendingAnime();
  }, []);

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="section__title">TRENDING RELEASES</div>
          <ul className="anime__list">
            {trendingList ? (
              <>
                {trendingList.map((anime) => (
                  <Anime
                    id={anime.id}
                    title={anime.titles.en}
                    cover_image={anime.cover_image}
                    key={anime.id}
                    genre={null}
                  />
                ))}
              </>
            ) : (
              <>{skeletonList}</>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
