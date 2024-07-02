import Image from "next/image";
import Link from "next/link";
import styles from "./Topnav.module.css";
import ProfileDropdown from "../ProfileDropdown/profiledropdown";
import { useState } from "react";
import { useAppSelector } from "@/app/redux/store";

export default function TopNav() {
    const user = useAppSelector(state => state.session.user)
    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

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
                    <button className="button-light">Create new tier list</button>
                </Link>
                <button className={styles.profile_button} onClick={toggleDropdown}>
                    {user.image_url && <Image src={user.image_url} width={40} height={40} alt="profile image" />}
                    {!(user.image_url) && user.email[0].toUpperCase()}
                </button>
                {dropdown && (
                    <>
                        <div className={styles.cover_all} onClick={toggleDropdown} />
                        <ProfileDropdown />
                    </>

                )}
            </div>
        </div>
    )
}