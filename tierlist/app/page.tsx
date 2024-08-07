'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { thunkLogin } from "@/app/redux/session";
import { useAppDispatch } from "@/app/redux/store";
import { useRouter } from "next/navigation"

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();


  const guestLogin = async () => {
    const credentials = {
      email: 'guest@guest.com',
      password: 'password'
    }
    const serverData = await dispatch(thunkLogin(credentials))
    if (serverData.token) {
      localStorage.setItem('token', serverData.token)
      router.push('/main')
    } else {
      console.error(serverData.email)
    }
  }

  return (
    <main className={styles.main}>
      <Link href={'/'}>
        <Image src='https://tierforge.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
          width={122}
          height={67}
          alt="Tier Forge logo"
          className='logo'
        />
      </Link>
      <div className={styles.title_divider} />
      <div className={styles.button_wrapper}>
        <Link href='/login'><div className="button-dark"><FontAwesomeIcon icon={faRightToBracket} /> Log in</div></Link>
        <Link href='/signup'><div className="button-light"><FontAwesomeIcon icon={faSquarePlus} />Sign up</div></Link>
        <div className="button-blue" onClick={guestLogin}>Continue as guest</div>
      </div>
      <div className={styles.footer}>
        Created by Nick Brooks | <Link href='https://github.com/NickBrooks188' target="_blank"><FontAwesomeIcon icon={faGithub} /> </Link> <Link href='https://www.linkedin.com/in/nick-brooks-531661153/' target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Link>
      </div>
    </main>
  );
}
