import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.jpg" alt="BloggerBrio" width={60} height={60} style={{"borderRadius":"50%"}}/>
          <h1 className={styles.logoText}>BloggerBrio</h1>
        </div>
        <p className={styles.desc}>
        Hey there! Excited to have you on my blog, powered by Next.js, Prisma, MongoDB, and Firebase.As someone passionate about development, I kicked off this project to get real insights into the development world. 
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="https://github.com/m-ayan-k">Facebook</Link>
          <Link href="https://github.com/m-ayan-k">Instagram</Link>
          <Link href="https://github.com/m-ayan-k">Tiktok</Link>
          <Link href="https://github.com/m-ayan-k">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
