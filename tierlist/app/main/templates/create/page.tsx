'use client'
import { useEffect, useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateCardModal from "@/app/components/CreateCardModal/createcardmodal";
import styles from "./create.module.css";
import { thunkCreateTemplate, uploadImage } from "@/app/redux/onelist";
import { useAppDispatch } from '@/app/redux/store';
import CardTile from '@/app/components/CardTile/cardtile';

export default function Page() {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [cards, setCards] = useState<any[]>([])
    const [disabled, setDisabled] = useState<boolean>(true)

    const dispatch = useAppDispatch()

    function addCard(name: string, image_url: string) {
        setCards([...cards, { name, image_url }])
    }

    useEffect(() => {
        if (name && description && image) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [name, description, image])

    const handleSubmit = async () => {

        const imageData = await dispatch(uploadImage(image))

        if (imageData.errors) {
            console.log(imageData.errors)
            return
        }
        console.log('~~~~~~~~', imageData)

        const template = {
            name,
            description,
            background_image_url: imageData.url,
            cards,
            public: true
        }
        const serverData = await dispatch(thunkCreateTemplate(template))
        console.log(serverData)
    }

    return (
        <>
            <div className={styles.main_wrapper}>
                <form>
                    <label>Template name<span className='asterisk'>*</span></label>
                    <input type='text' name='name' value={name} onChange={e => setName(e.target.value)}></input>
                    <label>Template description<span className='asterisk'>*</span></label>
                    <textarea name='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <label>Template Background Image<span className='asterisk'>*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />
                </form>
                <div className={styles.cards_wrapper}>
                    {(cards.length > 0) && cards.map((card: any, cardIndex: number) => (

                        <CardTile
                            key={cardIndex}
                            name={card.name || ''}
                            image_url={card.image_url || ''}
                        />
                    ))}

                    <button className='button-light' onClick={() => setOpenModal(true)}><FontAwesomeIcon icon={faPlus} />Add tier list item</button>
                </div>
                {(openModal) &&
                    (
                        <div className={styles.modal_background} onClick={() => setOpenModal(false)} >
                            <CreateCardModal addCard={addCard} setOpenModal={setOpenModal} />
                        </div>
                    )}
                <button className='button-dark' disabled={disabled} onClick={handleSubmit}>Create tier list template</button>
            </div>

        </>
    )
}