import styles from "./CardTile.module.css";
import Image from "next/image";

interface CardTileProps {
    name: string,
    image_url: string
}

export default function CardTile({ name, image_url }: CardTileProps) {

    return (

        <div className={styles.card_tile}>
            <div className={styles.card_image}>
                <Image src={image_url} alt={name} fill sizes="100vh" className={styles.card_image_url} crossOrigin="anonymous" />
            </div>
            <div className={styles.card_name}>{name}</div>
        </div>
    )
}