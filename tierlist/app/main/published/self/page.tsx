'use client'
import { useAppDispatch, useAppSelector } from "@/app/redux/store"
import { useEffect } from "react"
import { thunkGetSelfPublished } from "@/app/redux/alllists"
import Link from "next/link"
import PublishedTile from "@/app/components/PublishedTile/publishedtile"
import styles from "./Self.module.css"

export default function Self() {
    const selfPublished = useAppSelector(state => state.allLists.user)


    const dispatch = useAppDispatch()


    useEffect(() => {
        const fetchAsync = async () => {
            const data = await dispatch(thunkGetSelfPublished())
        }
        fetchAsync()

    }, [])

    return (
        <>
            <div className={styles.main_header}>Your lists</div>
            <div className={styles.divider} />
            <div className={styles.published_wrapper}>
                {selfPublished && Object.values(selfPublished).map((published_list: any) => (
                    <Link href={`/main/published/${published_list.id}/edit`} key={`published-${published_list.id}`}>
                        <PublishedTile
                            name={published_list.name}
                            description={published_list.description}
                            s_tier={published_list.s_tier}
                            a_tier={published_list.a_tier}
                            b_tier={published_list.b_tier}
                            c_tier={published_list.c_tier}
                            d_tier={published_list.d_tier}
                            f_tier={published_list.f_tier}
                        />
                    </Link>
                ))}

            </div>
        </>
    )
}