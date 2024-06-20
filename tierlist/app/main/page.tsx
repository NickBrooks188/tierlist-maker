'use client';
import { useAppSelector, useAppDispatch } from "../redux/store"
import { useEffect } from "react";
import { thunkGetAllTemplates, thunkGetAllPublished } from "@/app/redux/alllists";
import TemplateTile from "@/app/components/TemplateTile/templatetile";
import PublishedTile from "@/app/components/PublishedTile/publishedtile";
import styles from "./Main.module.css"
import Link from "next/link";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
    const templates = useAppSelector(state => state.allLists.templates)
    const published = useAppSelector(state => state.allLists.published)
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
            const publishedData: any = await dispatch(thunkGetAllPublished())
        }
        fetchAsync()
    }, [])

    useEffect(() => {
        document.title = 'Tier Forge: Main'
    }, [])

    const publishedScrollRight = () => {
        const publishedList = document.getElementById('published')
        if (publishedList) {
            publishedList.scrollBy({ left: 448, top: 0, behavior: 'smooth' })
        }
    }

    const publishedScrollLeft = () => {
        const publishedList = document.getElementById('published')
        if (publishedList) {
            publishedList.scrollBy({ left: -448, top: 0, behavior: 'smooth' })
        }
    }

    const templateScrollRight = () => {
        const templatesList = document.getElementById('templates')
        if (templatesList) {
            templatesList.scrollBy({ left: 448, top: 0, behavior: 'smooth' })
        }
    }

    const templateScrollLeft = () => {
        const templatesList = document.getElementById('templates')
        if (templatesList) {
            templatesList.scrollBy({ left: -448, top: 0, behavior: 'smooth' })
        }
    }

    return (
        <div className={styles.main_wrapper}>
            <div className={styles.main_header}>Templates</div>
            <div className={styles.templates_wrapper} id='templates'>
                <Link href='/main/templates/create'>
                    <TemplateTile
                        image_url={'create'}
                        name={"+ Create your own"}
                        description={"Build your own tier list template"}
                        selected={false}
                    />
                </Link>
                {templates && Object.values(templates).map((template: any) => (
                    <Link href={`/main/published/select?selection_id=${template.id}`}>
                        <TemplateTile
                            key={`template-${template.id}`}
                            image_url={template.background_image_url}
                            name={template.name}
                            description={template.description}
                            selected={false}
                        />
                    </Link>
                ))}
                <div className={styles.next_templates} onClick={templateScrollRight}><FontAwesomeIcon icon={faAngleRight} /></div>
                <div className={styles.prev_templates} onClick={templateScrollLeft}><FontAwesomeIcon icon={faAngleLeft} /></div>
            </div>
            <div className={styles.divider} />
            <div className={styles.main_header}>Published Lists</div>
            <div className={styles.published_wrapper} id='published'>
                <Link href='/main/published/select'>
                    <PublishedTile
                        name={"Publish a tier list"}
                        description={"Choose from existing templates"}
                        s_tier={[-1]}
                        a_tier={[]}
                        b_tier={[]}
                        c_tier={[]}
                        d_tier={[]}
                        f_tier={[]}
                    />
                </Link>
                {published && Object.values(published).map((published_list: any) => (
                    <Link href={`/main/published/${published_list.id}/edit`} key={`published-${published_list.id}`}>
                        <PublishedTile
                            name={published_list.name}
                            description={templates ? templates[published_list.template]?.name : ''}
                            s_tier={published_list.s_tier}
                            a_tier={published_list.a_tier}
                            b_tier={published_list.b_tier}
                            c_tier={published_list.c_tier}
                            d_tier={published_list.d_tier}
                            f_tier={published_list.f_tier}
                        />
                    </Link>
                ))}
                <div className={styles.next_published} onClick={publishedScrollRight}><FontAwesomeIcon icon={faAngleRight} /></div>
                <div className={styles.prev_published} onClick={publishedScrollLeft}><FontAwesomeIcon icon={faAngleLeft} /></div>

            </div>
        </div>
    )
}