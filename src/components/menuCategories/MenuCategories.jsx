import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";
import {shuffleArray} from "@/utils/helper"

export const getCategories = async () => {
  const res = await fetch(`${process.env.MAIN_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuCategories = async () => {

  const data = await getCategories();
  const shuffleddata = shuffleArray(data);
  const colors= shuffleArray(['#57c4ff31','#da85c731','#5e4fff31','#7fb88133','#ff795736','#ffb04f45']);
  return (
    <div className={styles.categoryList}>
      {shuffleddata?.map((item,idx) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.categoryItem}`}
            key={item._id}
            style={{ background:colors[(idx)%colors.length] }}
          >
            {item.title}
          </Link>
        ))}
    </div>
  );
};

export default MenuCategories;
