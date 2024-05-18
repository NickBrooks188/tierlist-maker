import Link from "next/link";
import styles from "./CardTile.module.css";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";


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
                    'backgroundSize': `cover`
                }}
            >
            </div>
            <div className={styles.card_name}>{name}</div>
        </div>
    )
}