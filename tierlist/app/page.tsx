import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={'/'}>
        <Image src='https://jello-bucket.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
          width={183}
          height={100}
          alt="Tier Forge logo"
        />
      </Link>
      <Link href='/login'>Log in</Link>
      <Link href='/signup'>Sign up</Link>
    </main>
  );
}
