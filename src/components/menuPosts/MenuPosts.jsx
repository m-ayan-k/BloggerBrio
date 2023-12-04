import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"
import {convertDateFormat,shuffleArray} from "@/utils/helper"


const getData = async () => {
  const res = await fetch(
    `${process.env.MAIN_URL}/api/postorder`,{
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPosts = async({ withImage }) => {
  const data = await getData();
  const colors= shuffleArray(['#ff7857','#ffb14f','#7fb881','#775aec','#789cff','#ff7887']);
  const filterdata = data.filter((element) => element.id!== process.env.CategoryId);
  if(filterdata.length>4){
    filterdata.pop_back();
  }
  // console.log(filterdata);
  return (
    <div className={styles.items}>
      
      {filterdata?.map((item,idx) => (
        <Link href={`/posts/${item.id}`} className={styles.item} key={item._id}>
          {withImage && (
            <div className={styles.imageContainer}>
              <Image src="" alt=""  className={styles.image} />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={styles.category}
              style={{ background:colors[(idx)%colors.length] }}
            >
              {item.catSlug}
            </span>
            <h3 className={styles.postTitle}>
              {item.title.replace(/<[^>]+>/g,' ')}
            </h3>
            <div className={styles.detail}>
              <span className={styles.username}>{item.user?.name}{" "}</span>
              <span className={styles.date}>{convertDateFormat(item.createdAt.substring(0,10))}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
