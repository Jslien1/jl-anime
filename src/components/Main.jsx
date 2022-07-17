import React, { useState, useEffect } from "react";
import Anime from "./ui/Anime";
import AnimeSkeleton from "./ui/AnimeSkeleton";

export default function Main() {
  const [recentList, setRecentList] = useState();
  const skeletonList = [];
  for (let i = 0; i < 12; i++) {
    skeletonList.push(
      <AnimeSkeleton
        outer__class={"skeleton skeleton__home"}
        inner__class={"anime__cover--skeleton"}
        key={i}
      />
    );
  }

  async function getRecentAnime() {
    const response2 = await fetch(
      "https://kitsu.io/api/edge/anime?filter[status]=current&filter[subtype]=TV&sort=-averageRating&page[limit]=20"
    );
    const data_list2 = await response2.json();
    // console.log(data_list2);
    setRecentList(
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
                    title={anime.attributes.canonicalTitle}
                    cover_image={anime.attributes.posterImage.original}
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
