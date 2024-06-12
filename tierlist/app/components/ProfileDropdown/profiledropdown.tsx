'use client';
import Link from "next/link";
import styles from "./ProfileDropdown.module.css";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { thunkLogout } from "@/app/redux/session";
import { useRouter } from "next/navigation";


interface TemplateTileProps {
    image_url: string,
    name: string,
    description: string,
    selected: boolean
}

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

            <div className={styles.dropdown_item}>My lists</div>

            <div className={styles.dropdown_item} onClick={handleLogout}>Logout</div>

        </div >
    )
}