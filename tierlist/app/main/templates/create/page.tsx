'use client'
import { useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateCardModal from "@/app/components/CreateCardModal/createcardmodal";
import styles from "./create.module.css";

export default function Page() {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <>
            <form>
                <label>Name</label>
                <input type='text' name='name' value={name} onChange={e => setName(e.target.value)}></input>
                <label>Description</label>
                <textarea name='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <label>Background Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                />

            </form>
            <div></div>
            <button className='button-light' onClick={() => setOpenModal(true)}><FontAwesomeIcon icon={faPlus} />Add new card</button>
            {(openModal) &&
                (
                    <div className={styles.modal_background} onClick={() => setOpenModal(false)} >
                        <CreateCardModal />
                    </div>
                )}
        </>
    )
}