// import styles from "./cardTile.module.css";
import styles from "./cardtile.module.css";


interface CardTileProps {
    name: string,
    image_url: string
}

export default function CardTile({ name, image_url }: CardTileProps) {

    return (

        <div className={styles.card_tile}>
            <div className={styles.card_image}
                style={{
                    "backgroundImage": `url(${image_url})`,
                    'backgroundSize': `auto 100%`,
                    "backgroundRepeat": "no-repeat",
                    "backgroundPosition": "center",
                }}
            >
            </div>
            <div className={styles.card_name}>{name}</div>
        </div>
    )
}