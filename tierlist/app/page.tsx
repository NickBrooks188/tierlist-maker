import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      Landing
      <Link href='/login'>Log in</Link>
      <Link href='/signup'>Sign up</Link>
    </main>
  );
}
