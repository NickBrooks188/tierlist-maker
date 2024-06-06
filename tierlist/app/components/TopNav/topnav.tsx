import Image from "next/image";
import Link from "next/link";
import styles from "./Topnav.module.css";

export default function TopNav() {

    return (
        <div className={styles.topnavbar}>

            <Link href={'/main'}>
                <Image src='https://tierforge.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
                    width={46}
                    height={25}
                    alt="Tier Forge logo"
                />
            </Link>
            <div className={styles.topnavbar_rhs}>
                <Link href='/main/templates/create'>
                    <button className="button-dark">Create template</button>
                </Link>
                <Link href='/main/published/select'>
                    <button className="button-light">Create list</button>
                </Link>
                <button className={styles.profile_button}></button>
            </div>
        </div>
    )
}