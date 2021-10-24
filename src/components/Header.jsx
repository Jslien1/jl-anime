import React, { useState, useEffect } from "react";
import Anime from "./ui/Anime";
import AnimeSkeleton from "./ui/AnimeSkeleton";

export default function Header() {
  const [trendingList, setTrendingList] = useState();
  const skeletonList = [];
  for (let i = 0; i < 6; i++) {
    skeletonList.push(
      <AnimeSkeleton
        outer__class={"skeleton skeleton__home"}
        inner__class={"anime__cover--skeleton"}
        key={i}
      />
    );
  }
  async function getTrendingAnime() {
    const response = await fetch(
      "https://api.aniapi.com/v1/anime?formats=0&status=0&nsfw=true"
    );
    const data_list = await response.json();
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
