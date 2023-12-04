import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
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

const CategoryList = async () => {
  const data = await getCategories();
  const shuffleddata = shuffleArray(data).slice(0,6);
  const colors= shuffleArray(['#57c4ff31','#da85c731','#7fb88133','#ff795736','#ffb04f45','#5e4fff31']);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {shuffleddata?.map((item,idx) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
            style={{ background:colors[idx] }}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                layout="fill"  style={{objectFit:"cover", aspectRatio: "3/2" }}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
