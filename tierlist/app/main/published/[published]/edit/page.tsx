'use client';
import styles from './Edit.module.css'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect, useState } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'
import { useParams } from 'next/navigation';
import CardTile from '@/app/components/CardTile/cardtile';
import { thunkGetOnePublished } from '@/app/redux/onelist';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    const tiers: any = [['s', sTier], ['a', aTier], ['b', bTier], ['c', cTier], ['d', dTier], ['f', fTier]]

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
            console.log(untiered_temp, untiered)
        }
    }, [published, template])


    useEffect(() => {

        const fetchAsync = async () => {
            const publishedData: any = await dispatch(thunkGetOnePublished(Number(params.published)))
            const templatesData: any = await dispatch(thunkGetAllTemplates())
        }

        fetchAsync()

    }, [])

    const onDragEnd = (result: object) => {
        console.log(result)
    }


    return (
        <>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className={styles.tiers}>

                    {tiers.map((tier: string) => (
                        <>
                            <Droppable droppableId={`${tier[0]}-tier`} direction='horizontal' key={tier[0]}>
                                {provided => (
                                    <div className={styles.tier} {...provided.droppableProps} ref={provided.innerRef}>
                                        <div className={styles[`${tier[0]}_header`]}>{tier[0].toUpperCase()}</div>
                                        {(tier[1].length && template?.cards) && tier[1].map((card: never) => (
                                            <Draggable
                                                draggableId={`card${card}`}
                                                index={tier[1].indexOf(card)}
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
                                                )
                                                }
                                            </Draggable >
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <div className={styles.tier_divider} />
                        </>

                    ))}

                    <div className={styles.untiered}>
                        Untiered
                        {(untiered.length && template?.cards) && untiered.map((card: number) => (
                            <CardTile
                                key={`card S ${template?.cards[card][0]}`}
                                name={template?.cards[card][1] || ''}
                                image_url={template?.cards[card][2] || ''}
                            />
                        ))}
                    </div>
                </div>
            </DragDropContext>
        </>
    )
}