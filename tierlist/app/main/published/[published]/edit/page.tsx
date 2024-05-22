'use client';
import styles from './Edit.module.css'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect, useState } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'
import { useParams } from 'next/navigation';
import CardTile from '@/app/components/CardTile/cardtile';
import { thunkGetOnePublished, thunkUpdatePublished } from '@/app/redux/onelist';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Template {
    id: number,
    background_image_url: string,
    description: string,
    name: string,
    owner: number,
    public: boolean,
    cards: []
}

export default function Edit() {

    const templates = useAppSelector(state => state.allLists.templates)
    const published = useAppSelector(state => state.list.published)
    const state = useAppSelector(state => state)
    const [template, setTemplate] = useState<Template>()
    const [disabled, setDisabled] = useState(true)
    const [sTier, setSTier] = useState<[]>([])
    const [aTier, setATier] = useState<[]>([])
    const [bTier, setBTier] = useState<[]>([])
    const [cTier, setCTier] = useState<[]>([])
    const [dTier, setDTier] = useState<[]>([])
    const [fTier, setFTier] = useState<[]>([])
    const [untiered, setUntiered] = useState<any>([])
    const tiers: any = [['s', sTier, setSTier], ['a', aTier, setATier], ['b', bTier, setBTier], ['c', cTier, setCTier], ['d', dTier, setDTier], ['f', fTier, setFTier], ['Untiered', untiered, setUntiered]]

    const params = useParams()
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (templates && published) {
            setTemplate(templates[published.template])
            console.log(state)
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
            const publishedData: any = await dispatch(thunkGetOnePublished(Number(params.published)))
            const templatesData: any = await dispatch(thunkGetAllTemplates())
        }

        fetchAsync()

    }, [])

    const onDragEnd = (result: DropResult) => {
        console.log(result)
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
    }

    const saveChanges = async () => {
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
        const serverData = await dispatch(thunkUpdatePublished(publishedPut))
    }

    return (
        <>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className={styles.tiers}>
                    {tiers.map((tier: any, tierIndex: number) => (
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
                                                    key={`card ${template?.cards[card][0]}`}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        >
                                                            <CardTile
                                                                name={template?.cards[card][1] || ''}
                                                                image_url={template?.cards[card][2] || ''}
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
                            {(tierIndex != 6) && (<div className={styles.tier_divider} />)}
                        </div>
                    ))}
                </div>
            </DragDropContext>
            <button onClick={saveChanges} className="button-dark"><FontAwesomeIcon icon={faFloppyDisk} className='fa-regular fa-floppy-disk' /> Save</button>
        </>
    )
}