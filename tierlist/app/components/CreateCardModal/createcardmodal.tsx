import Link from "next/link";
import styles from "./createcardmodal.module.css";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";

export default function CreateCardModal() {

    const modalClick = (e) => {
        e.stopPropagation()
    }

    return (

        <div className={styles.modal} onClick={modalClick}>
            Card creation modal
        </div>
    )
}