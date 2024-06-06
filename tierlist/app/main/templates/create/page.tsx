'use client'
import { useEffect, useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateCardModal from "@/app/components/CreateCardModal/createcardmodal";
import styles from "./create.module.css";
import { thunkCreateTemplate } from "@/app/redux/onelist";
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
        const template = {
            name,
            description,
            background_image: image,
            cards,
            public: true
        }
        const serverData = await dispatch(thunkCreateTemplate(template))
        console.log(serverData)
    }

    return (
        <>
            <form>
                <label>Template name</label>
                <input type='text' name='name' value={name} onChange={e => setName(e.target.value)}></input>
                <label>Template description</label>
                <textarea name='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <label>Template Background Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                />
            </form>
            <div className={styles.cards_wrapper}>
                {cards.length && cards.map((card: any, cardIndex: number) => (

                    <CardTile
                        key={cardIndex}
                        name={card.name || ''}
                        image_url={card.image_url || ''}
                    />
                ))}

            </div>
            <button className='button-light' onClick={() => setOpenModal(true)}><FontAwesomeIcon icon={faPlus} />Add new card</button>
            {(openModal) &&
                (
                    <div className={styles.modal_background} onClick={() => setOpenModal(false)} >
                        <CreateCardModal addCard={addCard} setOpenModal={setOpenModal} />
                    </div>
                )}
            <button className='button-dark' disabled={disabled} onClick={handleSubmit}>Create tier list template</button>

        </>
    )
}