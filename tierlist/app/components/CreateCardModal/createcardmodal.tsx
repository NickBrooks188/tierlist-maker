import Link from "next/link";
import styles from "./createcardmodal.module.css";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";

export default function CreateCardModal() {
    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)

    const modalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (

        <div className={styles.modal} onClick={modalClick}>
            <label>Name</label>
            <input type='text' name='name' value={name} onChange={e => setName(e.target.value)}></input>
            <label>Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
        </div>
    )
}