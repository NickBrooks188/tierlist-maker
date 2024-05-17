'use client';
import styles from './Edit.module.css'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect, useState } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'
import { useParams } from 'next/navigation';
import CardTile from '@/app/components/CardTile/cardtile';
import { thunkGetOnePublished } from '@/app/redux/onelist';

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
    const [untiered, setUntiered] = useState<[]>([])


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


    return (
        <>
            <div className={styles.tiers}>
                <div className={styles.tier}>
                    <div className={styles.s_header}>S</div>
                    {(sTier.length && template?.cards) && sTier.map((card: number) => (
                        <CardTile
                            key={`card S ${template?.cards[card][0]}`}
                            name={template?.cards[card][1] || ''}
                            image_url={template?.cards[card][2] || ''}
                        />
                    ))}
                </div>
                <div className={styles.tier_divider} />
                <div className={styles.tier}>
                    <div className={styles.a_header}>A</div>
                    {(aTier.length && template?.cards) && aTier.map((card: number) => (
                        <CardTile
                            key={`card S ${template?.cards[card][0]}`}
                            name={template?.cards[card][1] || ''}
                            image_url={template?.cards[card][2] || ''}
                        />
                    ))}
                </div>
                <div className={styles.tier_divider} />
                <div className={styles.tier}>
                    <div className={styles.b_header}>B</div>
                    {(bTier.length && template?.cards) && bTier.map((card: number) => (
                        <CardTile
                            key={`card S ${template?.cards[card][0]}`}
                            name={template?.cards[card][1] || ''}
                            image_url={template?.cards[card][2] || ''}
                        />
                    ))}
                </div>
                <div className={styles.tier_divider} />
                <div className={styles.tier}>
                    <div className={styles.c_header}>C</div>
                    {(cTier.length && template?.cards) && cTier.map((card: number) => (
                        <CardTile
                            key={`card S ${template?.cards[card][0]}`}
                            name={template?.cards[card][1] || ''}
                            image_url={template?.cards[card][2] || ''}
                        />
                    ))}
                </div>
                <div className={styles.tier_divider} />
                <div className={styles.tier}>
                    <div className={styles.d_header}>D</div>
                    {(dTier.length && template?.cards) && dTier.map((card: number) => (
                        <CardTile
                            key={`card S ${template?.cards[card][0]}`}
                            name={template?.cards[card][1] || ''}
                            image_url={template?.cards[card][2] || ''}
                        />
                    ))}
                </div>
                <div className={styles.tier_divider} />
                <div className={styles.tier}>
                    <div className={styles.f_header}>F</div>
                    {(fTier.length && template?.cards) && fTier.map((card: number) => (
                        <CardTile
                            key={`card S ${template?.cards[card][0]}`}
                            name={template?.cards[card][1] || ''}
                            image_url={template?.cards[card][2] || ''}
                        />
                    ))}
                </div>
            </div>

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

        </>
    )
}