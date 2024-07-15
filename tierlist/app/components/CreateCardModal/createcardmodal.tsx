import styles from "./createcardmodal.module.css";
import { useState } from "react";
import { uploadImage } from "@/app/redux/onelist";
import { useAppDispatch } from "@/app/redux/store";

interface ImageData {
    url: string,
    errors: string[]
}

interface CreateCardModalProps {
    addCard: (name: string, image_url: string) => void,
    setOpenModal: (open: boolean) => void
}

export default function CreateCardModal({ addCard, setOpenModal }: CreateCardModalProps) {
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
            addCard(name, (imageData.url))
            setOpenModal(false)
        }
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
            <button className='button-dark' disabled={!image || !name} onClick={handleAddCard}>Add item</button>
        </div>
    )
}