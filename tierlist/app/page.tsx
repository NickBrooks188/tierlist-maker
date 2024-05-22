import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={'/'}>
        <Image src='https://tierforge.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
          width={183}
          height={100}
          alt="Tier Forge logo"
          className='logo'
        />
      </Link>
      <div className={styles.title_divider} />
      <Link href='/login'><div className="button-dark"><FontAwesomeIcon icon={faRightToBracket} /> Log in</div></Link>
      <Link href='/signup'><div className="button-light"><FontAwesomeIcon icon={faSquarePlus} />Sign up</div></Link>
    </main>
  );
}
