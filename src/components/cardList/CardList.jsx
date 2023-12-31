import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import {shuffleArray} from "@/utils/helper"

const getData = async (page, cat) => {
  const res = await fetch(
    `${process.env.MAIN_URL}/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};


const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);
  const shuffledposts = shuffleArray(posts);
  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat ?"Recommended stories":"Recents Post"}</h1>
      <div className={styles.posts}>
        {shuffledposts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
