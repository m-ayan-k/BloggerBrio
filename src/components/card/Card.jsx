import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import {convertDateFormat} from "@/utils/helper"


const Card = ({ key, item }) => {
  // console.log(item.id);
  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {convertDateFormat(item.createdAt.substring(0, 10))}{"  "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.id}`}>
          <h1 className={styles.title}>{item.title.replace(/<[^>]+>/g,' ')}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc}>
          {(item.desc).replace(/<[^>]+>/g,' ')}
        </div>
        <Link href={`/posts/${item.id}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
