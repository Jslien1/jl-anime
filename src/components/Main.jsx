import React, { useState, useEffect } from "react";
import Anime from "./ui/Anime";
import AnimeSkeleton from "./ui/AnimeSkeleton";

export default function Main() {
  const [recentList, setRecentList] = useState();
  const skeletonList = Array(12).fill(
    <AnimeSkeleton
      outer__class={"skeleton skeleton__home"}
      inner__class={"anime__cover--skeleton"}
    />
  );

  async function getRecentAnime() {
    const response = await fetch(
      "https://api.aniapi.com/v1/anime?formats=0&status=1&year=2021&season=3&nsfw=true"
    );
    const data_list = await response.json();
    console.log(
      data_list.data.documents.filter((item) => {
        return item.trailer_url && item.descriptions.en;
      })
    );
    setRecentList(
      data_list.data.documents
        .filter((item) => {
          return item.trailer_url && item.descriptions.en;
        })
        .slice(0, 12)
    );
  }

  useEffect(() => {
    getRecentAnime();
  }, []);
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="section__title">RECENT RELEASES</div>
          <ul className="anime__list">
            {recentList ? (
              <>
                {recentList.map((anime) => (
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
    </main>
  );
}
