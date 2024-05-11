import Link from "next/link";
import styles from "./TemplateTile.module.css";

interface TemplateTileProps {
    image_url: string,
    name: string,
    description: string
}

export default function TemplateTile({ image_url, name, description }: TemplateTileProps) {
    return (
        <div className={styles.template_tile} style={{
            "backgroundImage": `linear-gradient(0turn, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.75)), url(${image_url})`,
            'backgroundSize': `cover`
        }}>
            {name}
            <div className={styles.template_tile_description}>{description}</div>

        </div >
    )
}