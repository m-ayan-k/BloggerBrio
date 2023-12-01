import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const getData = async (id) => {
  const res = await fetch(
    `${process.env.MAIN_URL}/api/posts/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};
const Featured = async () => {
  const data = await getData(process.env.CategoryId);
  // console.log(data)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Embrace Your Inner Writer!</b> Your Stories Deserve to Be Shared.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={data.img} alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{data.title.replace(/<[^>]+>/g,' ')}</h1>
          <p className={styles.postDesc}>
            {data.desc.replace(/<[^>]+>/g,' ')}
          </p>
          <Link href={`/posts/${process.env.CategoryId}`} className={styles.link}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
