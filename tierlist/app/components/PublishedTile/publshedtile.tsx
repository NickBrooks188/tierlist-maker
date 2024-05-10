import Link from "next/link";
import styles from "./PublishedTile.module.css";

interface PublishedTileProps {
    name: string,
    description: string,
    s_tier: object,
    a_tier: object,
    b_tier: object,
    c_tier: object,
    d_tier: object,
    f_tier: object,
}

export default function PublishedTile({ name, description, s_tier, a_tier, b_tier, c_tier, d_tier, f_tier }: PublishedTileProps) {
    return (
        <div className={styles.published_tile} >
            {name}
            <div className={styles.publsihed_tile_description}>{description}</div>

        </div >
    )
}