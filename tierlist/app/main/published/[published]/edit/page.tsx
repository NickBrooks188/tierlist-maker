'use client';
import styles from './Create.module.css'
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

export default function Create() {

    const templates = useAppSelector(state => state.allLists.templates)
    const published = useAppSelector(state => state.list.published)
    const [template, setTemplate] = useState<Template>()
    const [disabled, setDisabled] = useState(true)
    const params = useParams()
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (templates && published) {
            setTemplate(templates[published.template])
        }
        console.log(template)
    }, [params, templates])


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
                <div className={styles.s_header}>S</div>
                <div className={styles.tier_divider} />
                <div className={styles.a_header}>A</div>
                <div className={styles.tier_divider} />

                <div className={styles.b_header}>B</div>
                <div className={styles.tier_divider} />
                <div className={styles.c_header}>C</div>
                <div className={styles.tier_divider} />
                <div className={styles.d_header}>D</div>
                <div className={styles.tier_divider} />
                <div className={styles.f_header}>F</div>

            </div>

            <div className={styles.untiered}>
                Untiered
                {template?.cards && Object.values(template.cards).map((card: any) => (

                    <CardTile
                        key={`card ${card[0]}`}
                        name={card[1]}
                        image_url={card[2]}
                    />
                ))}
            </div>

        </>
    )
}