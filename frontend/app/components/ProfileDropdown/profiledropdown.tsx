'use client';
import Link from "next/link";
import styles from "./ProfileDropdown.module.css";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { thunkLogout } from "@/app/redux/session";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
    const user = useAppSelector(state => state.session.user)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = async () => {
        const data = await dispatch(thunkLogout())
        console.log(data)
        router.push('/')

    }


    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdown_item}>{user.email}</div>
            {(user.email !== 'guest@guest.com') && (
                <Link href='/main/published/self'>
                    <div className={styles.dropdown_item}>My lists</div>
                </Link>
            )}
            <div className={styles.dropdown_item} onClick={handleLogout}>Logout</div>

        </div >
    )
}