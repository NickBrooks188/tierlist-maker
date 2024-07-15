// import styles from "./cardTile.module.css";
// import styles from "./cardTile.module.css";


interface CardTileProps {
    name: string,
    image_url: string
}

export default function CardTile({ name, image_url }: CardTileProps) {

    return (

        <div >
            <div
                style={{
                    "backgroundImage": `url(${image_url})`,
                    'backgroundSize': `auto 100%`,
                    "backgroundRepeat": "no-repeat",
                    "backgroundPosition": "center",
                }}
            >
            </div>
            <div >{name}</div>
        </div>
    )
}