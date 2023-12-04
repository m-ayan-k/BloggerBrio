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
          <Image src={item.img} 
            src={item.img}
            alt=""
            fill
            style={{ objectFit: "cover", aspectRatio: "3/2" }}
            className={styles.image}
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33.3vw" 
          />
        </div>
      )}
      <div className={styles.textContainer} key={key}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {convertDateFormat(item.createdAt.substring(0, 10))}{"  "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.id}`} key={key}>
          <h1 className={styles.title}>{item.title.replace(/<[^>]+>/g,' ')}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc} key={key}>
          {(item.desc).replace(/<[^>]+>/g,' ')}
        </div>
        <Link href={`/posts/${item.id}`} className={styles.link} key={key}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
