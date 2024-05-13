'use client';
import { useAppSelector, useAppDispatch } from "../redux/store"
import { useEffect } from "react";
import { thunkGetAllTemplates, thunkGetAllPublished } from "@/app/redux/alllists";
import TemplateTile from "@/app/components/TemplateTile/templatetile";
import PublishedTile from "@/app/components/PublishedTile/publishedtile";
import styles from "./Main.module.css"

export default function Page() {
    const templates = useAppSelector(state => state.allLists.templates)
    const published = useAppSelector(state => state.allLists.published)


    const dispatch = useAppDispatch()
    useEffect(() => {

        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
            const publishedData: any = await dispatch(thunkGetAllPublished())
            console.log(templateData, publishedData)
        }

        fetchAsync()


    }, [])

    return (
        <div className={styles.main_wrapper}>
            <div className={styles.main_header}>Templates</div>
            <div className={styles.templates_wrapper}>
                {templates && Object.values(templates).map((template: any) => (
                    <TemplateTile key={`template-${template.id}`}
                        image_url={template.background_image_url}
                        name={template.name}
                        description={template.description}
                    />
                ))}
            </div>
            <div className={styles.divider} />
            <div className={styles.main_header}>Published Lists</div>
            <div className={styles.published_wrapper}>
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
                {published && Object.values(published).map((published_list: any) => (
                    <PublishedTile
                        key={`published-${published_list.id}`}
                        name={published_list.name}
                        description={published_list.description}
                        s_tier={published_list.s_tier}
                        a_tier={published_list.a_tier}
                        b_tier={published_list.b_tier}
                        c_tier={published_list.c_tier}
                        d_tier={published_list.d_tier}
                        f_tier={published_list.f_tier}
                    />
                ))}
            </div>
        </div>
    )
}