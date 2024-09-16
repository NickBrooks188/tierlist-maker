'use client';
import styles from './Edit.module.css'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect, useState, useMemo } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'
import { useParams } from 'next/navigation';
import CardTile from '@/app/components/CardTile/cardtile';
import { thunkGetOnePublished, thunkUpdatePublished } from '@/app/redux/onelist';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { faChevronLeft, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { toPng } from 'html-to-image';
import { useRef, useCallback } from 'react';
import MainLoading from '@/app/components/MainLoading/mainloading';
import OwnerTile from '@/app/components/OwnerTile/ownertile';

interface Template {
    id: number,
    background_image_url: string,
    description: string,
    name: string,
    owner: number,
    public: boolean,
    cards: [{ id: number, name: string, image_url: string, list: number }]
}

interface Published {
    id: number,
    name: string,
    description: string,
    owner: number,
    template: number,
    s_tier: [],
    a_tier: [],
    b_tier: [],
    c_tier: [],
    d_tier: [],
    f_tier: [],
    public: boolean,
    errors: []
}

export default function Edit() {

    const templates = useAppSelector(state => state.allLists.templates)
    const published = useAppSelector(state => state.list.published)
    const sessionUser = useAppSelector(state => state.session.user)
    const [template, setTemplate] = useState<Template>()
    const [sTier, setSTier] = useState<[]>([])
    const [aTier, setATier] = useState<[]>([])
    const [bTier, setBTier] = useState<[]>([])
    const [cTier, setCTier] = useState<[]>([])
    const [dTier, setDTier] = useState<[]>([])
    const [fTier, setFTier] = useState<[]>([])
    const [untiered, setUntiered] = useState<any>([])
    // const tiers: any = [['s', sTier, setSTier], ['a', aTier, setATier], ['b', bTier, setBTier], ['c', cTier, setCTier], ['d', dTier, setDTier], ['f', fTier, setFTier], ['untiered', untiered, setUntiered]]
    const [loading, setLoading] = useState(false)
    const [hasScreenshot, setHasScreenshot] = useState(false)

    const params = useParams()
    const dispatch = useAppDispatch()

    const captureRef = useRef<HTMLDivElement>(null)

    const tiers = useMemo(() => [['s', sTier, setSTier], ['a', aTier, setATier], ['b', bTier, setBTier], ['c', cTier, setCTier], ['d', dTier, setDTier], ['f', fTier, setFTier], ['untiered', untiered, setUntiered]], [sTier, aTier, bTier, cTier, dTier, fTier, untiered])

    useEffect(() => {
        if (templates && published) {
            setTemplate(templates[published.template])
        }
    }, [params, templates, published])


    useEffect(() => {
        if (published) {
            setSTier(published.s_tier)
            setATier(published.a_tier)
            setBTier(published.b_tier)
            setCTier(published.c_tier)
            setDTier(published.d_tier)
            setFTier(published.f_tier)
        }
        if (template) {
            const cardsArray = (Object.keys(template.cards)).map((card) => Number(card))
            const untiered_temp = new Set(cardsArray)
            for (let card of published.s_tier) untiered_temp.delete(card)
            for (let card of published.a_tier) untiered_temp.delete(card)
            for (let card of published.b_tier) untiered_temp.delete(card)
            for (let card of published.c_tier) untiered_temp.delete(card)
            for (let card of published.d_tier) untiered_temp.delete(card)
            for (let card of published.f_tier) untiered_temp.delete(card)
            const untiered_array = Array.from(untiered_temp)
            setUntiered(untiered_array)
        }
    }, [published, template])


    useEffect(() => {
        const fetchAsync = async () => {
            const publishedData: Published = await dispatch(thunkGetOnePublished(Number(params.published)))
            const templatesData: [Template] = await dispatch(thunkGetAllTemplates())
        }

        fetchAsync()

    }, [dispatch, params])

    const onDragEnd = useCallback((result: DropResult) => {
        const { destination, source } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId) {
            if (destination.index === source.index) return
            const tierId = destination.droppableId
            const order = [...tiers[Number(tierId)][1]]
            const setOrder = tiers[Number(tierId)][2]
            const cardId = order[source.index]
            order.splice(source.index, 1)
            order.splice(destination.index, 0, cardId)
            setOrder(order)
        } else {
            const sourceTierId = source.droppableId
            const destTierId = destination.droppableId
            const sourceOrder = [...tiers[Number(sourceTierId)][1]]
            const setSourceOrder = tiers[Number(sourceTierId)][2]
            const destOrder = [...tiers[Number(destTierId)][1]]
            const setDestOrder = tiers[Number(destTierId)][2]
            const cardId = sourceOrder[source.index]
            sourceOrder.splice(source.index, 1)
            destOrder.splice(destination.index, 0, cardId)
            setSourceOrder(sourceOrder)
            setDestOrder(destOrder)
        }
    }, [tiers])

    const saveChanges = useCallback(async () => {
        setLoading(true)
        const publishedPut = {
            id: published.id,
            name: published.name,
            description: published.description,
            s_tier: sTier,
            a_tier: aTier,
            b_tier: bTier,
            c_tier: cTier,
            d_tier: dTier,
            f_tier: fTier
        }
        const serverData: Published = await dispatch(thunkUpdatePublished(publishedPut))
        if (serverData.errors) {
            console.error(serverData.errors)
            setLoading(false)
        }
        setLoading(false)
    }, [published, sTier, aTier, bTier, cTier, dTier, fTier])

    const captureScreenshot = useCallback(() => {
        setLoading(true)
        if (captureRef.current === null) {
            setLoading(false)
            return
        }
        toPng(captureRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'tierforge.png'
                link.href = dataUrl
                link.click()
                setLoading(false)
                setHasScreenshot(true)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [captureRef])

    return (
        <>
            <Link href='/main'>
                <div className="back_main"><FontAwesomeIcon icon={faChevronLeft} />Back</div>
            </Link>
            {loading && <MainLoading />}
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className={styles.tiers_wrapper}>
                    <div className={styles.untiered_wrapper}>
                        <div className={styles.untiered_header}>Untiered</div>
                        <Droppable droppableId={'6'} direction='horizontal'>
                            {provided => (
                                <div className={styles.untiered_tier} {...provided.droppableProps} ref={provided.innerRef}>
                                    {(untiered && template?.cards && template.cards[untiered[0]]) && untiered.map((card: never, cardIndex: number) => (
                                        <Draggable
                                            draggableId={`${card}`}
                                            index={cardIndex}
                                            key={`card ${template?.cards[card].id}`}
                                        >
                                            {(provided, snapshot) => (
                                                <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                >
                                                    <CardTile
                                                        name={template?.cards[card].name || ''}
                                                        image_url={template?.cards[card].image_url || ''}
                                                    />
                                                </div>
                                            )}
                                        </Draggable >
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    </div>
                    <div className={styles.tiers} ref={captureRef}>
                        {tiers.map((tier: any, tierIndex: number) => (
                            (tierIndex != 6) && (

                                <div className={styles.tier_wrapper} key={tier[0]}>
                                    <div className={styles.tier_and_letter}>
                                        <div className={styles[`${tier[0]}_header`]}>{tier[0][0].toUpperCase() + tier[0].slice(1)}</div>
                                        <Droppable droppableId={String(tierIndex)} direction='horizontal'>
                                            {provided => (
                                                <div className={styles.tier} {...provided.droppableProps} ref={provided.innerRef}>
                                                    {(tier[1][0] && template?.cards && template.cards[tier[1][0]]) && tier[1].map((card: never, cardIndex: number) => (
                                                        <Draggable
                                                            draggableId={`${card}`}
                                                            index={cardIndex}
                                                            key={`card ${template?.cards[card].id}`}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                                >
                                                                    <CardTile
                                                                        name={template?.cards[card].name || ''}
                                                                        image_url={template?.cards[card].image_url || ''}
                                                                    />
                                                                </div>
                                                            )}
                                                        </Draggable >
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                    {(tierIndex != 5) && (<div className={styles.tier_divider} />)}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </DragDropContext>
            <div className={styles.button_wrapper}>
                {published && <OwnerTile id={published?.owner.id} email={published?.owner.email} image_url={published?.owner.image_url} />}
                {(sessionUser?.user_id == published?.owner.id) && (<button onClick={saveChanges} className="button-dark"><FontAwesomeIcon icon={faFloppyDisk} /> Save</button>)}
                {!hasScreenshot && <button onClick={captureScreenshot} className="button-light"><FontAwesomeIcon icon={faArrowDown} /> Download tier list</button>}
            </div>
        </>
    )
}