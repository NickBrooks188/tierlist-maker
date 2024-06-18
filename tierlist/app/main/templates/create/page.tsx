'use client'
import { useEffect, useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateCardModal from "@/app/components/CreateCardModal/createcardmodal";
import styles from "./create.module.css";
import { thunkCreateTemplate, uploadImage } from "@/app/redux/onelist";
import { useAppDispatch } from '@/app/redux/store';
import CardTile from '@/app/components/CardTile/cardtile';
import Link from 'next/link';
import { faChevronLeft, faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';


export default function Page() {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [cards, setCards] = useState<any[]>([])
    const [nextDisabled, setNextDisabled] = useState<boolean>(true)
    const [publishDisabled, setPublishDisabled] = useState<boolean>(true)
    const router = useRouter()

    const dispatch = useAppDispatch()

    function addCard(name: string, image_url: string) {
        setCards([...cards, { name, image_url }])
    }

    useEffect(() => {
        if (name && description && image) {
            setNextDisabled(false)
        } else {
            setNextDisabled(true)
        }
    }, [name, description, image])


    useEffect(() => {
        if (cards.length > 0) {
            setPublishDisabled(false)
        } else {
            setPublishDisabled(true)
        }
    }, [cards])

    const handleSubmit = async () => {

        const imageData = await dispatch(uploadImage(image))

        if (imageData.errors) {
            console.log(imageData.errors)
            return
        }

        const template = {
            name,
            description,
            background_image_url: imageData.url,
            cards,
            public: true
        }
        const serverData = await dispatch(thunkCreateTemplate(template))
        console.log(serverData)
        if (serverData.errors) {
            console.log(serverData.errors)
        } else {
            router.push(`/main`)
        }
    }

    const scrollRight = (e: any) => {
        e.preventDefault()
        const mainWrapper = document.getElementById('main-wrapper')
        if (mainWrapper) {
            mainWrapper.scrollBy({ left: 500, top: 0, behavior: 'smooth' })
        }
    }

    const scrollLeft = () => {
        const mainWrapper = document.getElementById('main-wrapper')
        if (mainWrapper) {
            mainWrapper.scrollBy({ left: -500, top: 0, behavior: 'smooth' })
        }
    }

    return (
        <>
            <Link href='/main'>
                <div className="back_main"><FontAwesomeIcon icon={faChevronLeft} />Back</div>
            </Link>
            <div className={styles.main_wrapper} id='main-wrapper'>
                <form className={styles.section_wrapper}>
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
                    <button className='button-light' disabled={nextDisabled} onClick={scrollRight}>Next<FontAwesomeIcon icon={faAngleRight} /></button>
                </form>
                <div className={styles.section_wrapper}>
                    <button className='button-light' onClick={scrollLeft}><FontAwesomeIcon icon={faAngleLeft} />Back to details</button>
                    <h3 className={styles.cards_header}>Tier list items</h3>
                    <div className={styles.divider} />
                    <div className={styles.cards_wrapper}>
                        {(cards.length > 0) && cards.map((card: any, cardIndex: number) => (

                            <CardTile
                                key={cardIndex}
                                name={card.name || ''}
                                image_url={card.image_url || ''}
                            />
                        ))}
                        {cards.length === 0 && <div>Please add tier list items</div>}
                    </div>
                    <button className='button-light' onClick={() => setOpenModal(true)}><FontAwesomeIcon icon={faPlus} />Add tier list item</button>
                    <button className='button-dark' disabled={publishDisabled || nextDisabled} onClick={handleSubmit}>Publish tier list template</button>
                </div>
                {(openModal) &&
                    (
                        <div className={styles.modal_background} onClick={() => setOpenModal(false)} >
                            <CreateCardModal addCard={addCard} setOpenModal={setOpenModal} />
                        </div>
                    )}
            </div>

        </>
    )
}