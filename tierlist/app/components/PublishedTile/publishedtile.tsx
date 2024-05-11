import Link from "next/link";
import styles from "./PublishedTile.module.css";

interface PublishedTileProps {
    name: string,
    description: string,
    s_tier: [],
    a_tier: [],
    b_tier: [],
    c_tier: [],
    d_tier: [],
    f_tier: [],
}

export default function PublishedTile({ name, description, s_tier, a_tier, b_tier, c_tier, d_tier, f_tier }: PublishedTileProps) {
    const maxLength: number = Math.max(s_tier.length, a_tier.length, b_tier.length, c_tier.length, d_tier.length, f_tier.length)
    const sLength = (s_tier.length / maxLength) * 136 + 20
    const aLength = (a_tier.length / maxLength) * 136 + 20
    const bLength = (b_tier.length / maxLength) * 136 + 20
    const cLength = (c_tier.length / maxLength) * 136 + 20
    const dLength = (d_tier.length / maxLength) * 136 + 20
    const fLength = (f_tier.length / maxLength) * 136 + 20

    return (
        <div className={styles.published_tile} >
            <div className={styles.published_tile_preview}>
                <div className={styles.s_preview} style={{ "width": sLength }} />
                <div className={styles.a_preview} style={{ "width": aLength }} />
                <div className={styles.b_preview} style={{ "width": bLength }} />
                <div className={styles.c_preview} style={{ "width": cLength }} />
                <div className={styles.d_preview} style={{ "width": dLength }} />
                <div className={styles.f_preview} style={{ "width": fLength }} />
            </div>
            <div className={styles.published_tile_text}>{name}
                <div className={styles.published_tile_description}>{description}</div>
            </div>
        </div >
    )
}