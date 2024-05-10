'use client';
import { useAppSelector, useAppDispatch } from "../redux/store"
import { useEffect } from "react";
import { thunkGetAllTemplates, thunkGetAllPublished } from "@/app/redux/alllists";

export default function Page() {
    const templates = useAppSelector(state => state.allLists.templates)
    const published = useAppSelector(state => state.allLists.published)


    const dispatch = useAppDispatch()
    useEffect(() => {

        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
            const publishedData: any = await dispatch(thunkGetAllPublished())
        }

        fetchAsync()


    }, [])

    return (
        <>
            <div className='templates-wrapper'>
                {templates && Object.values(templates).map((template: any) => (
                    <div key={`template-${template.id}`}>
                        {template.name}
                    </div>
                ))}
            </div>
            <div className='published-wrapper'>
                {published && Object.values(published).map((published_list: any) => (
                    <div key={`template-${published_list.id}`}>
                        {published_list.name}
                    </div>
                ))}
            </div>
        </>
    )
}