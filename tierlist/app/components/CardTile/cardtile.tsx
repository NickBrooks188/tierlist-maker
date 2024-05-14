import Link from "next/link";
import styles from "./CardTile.module.css";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface CardTileProps {
    name: string,
    image_url: string
}

export default function CardTile({ name, image_url }: CardTileProps) {

    return (
        <div className={styles.cardtile}>
            {name}
        </div>
    )
}