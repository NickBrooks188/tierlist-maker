import styles from "./createcardmodal.module.css";
import { useEffect, useState } from "react";
import { uploadImage } from "@/app/redux/onelist";
import { useAppDispatch } from "@/app/redux/store";

interface ImageData {
    url: string,
    errors: string[]
}

export default function CreateCardModal({ addCard }) {
    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)

    const dispatch = useAppDispatch()

    const modalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const handleAddCard = async () => {
        let imageData: ImageData = { url: '', errors: [] }
        if (image) {
            imageData = await dispatch(uploadImage(image))
        }
        addCard(name, (image ? imageData.url : null))
    }

    return (

        <div className={styles.modal} onClick={modalClick}>
            <label>Name</label>
            <input type='text' name='name' value={name} onChange={e => setName(e.target.value)}></input>
            <label>Image (optional)</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            <button className='button-dark' onClick={handleAddCard}>Add item</button>
        </div>
    )
}