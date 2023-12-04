import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import {convertDateFormat} from "@/utils/helper"


const getData = async (id) => {
  const res = await fetch(`${process.env.MAIN_URL}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { id } = params;

  const data = await getData(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title.replace(/<[^>]+>/g,' ')}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill
                  style={{objectFit:"cover", aspectRatio: "3/2" }} 
                  className={styles.avatar} 
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33.3vw"
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{convertDateFormat(data.createdAt.substring(0, 10))}</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill
              style={{objectFit:"cover", aspectRatio: "3/2" }} 
              className={styles.image}
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33.3vw" 
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postid={id}/>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
