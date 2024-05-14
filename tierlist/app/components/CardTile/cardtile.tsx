import Link from "next/link";
// import styles from "./PublishedTile.module.css";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface CardTileProps {
    name: string,
    description: string,
    image_url: string
}

export default function PublishedTile({ name, description, image_url }: CardTileProps) {

    return (
        <div>
            {name}
        </div>
    )
}