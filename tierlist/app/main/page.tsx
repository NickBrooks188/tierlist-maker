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
        <div>Main page</div>
    )
}