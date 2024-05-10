'use client';
import { useAppSelector, useAppDispatch } from "../redux/store"
import { useEffect } from "react";
import { thunkGetAllTemplates, thunkGetAllPublished } from "@/app/redux/alllists";

export default function Page() {
    const test = useAppSelector(state => state)

    const dispatch = useAppDispatch()
    useEffect(() => {

        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
            const publishedData: any = await dispatch(thunkGetAllPublished())

            console.log(templateData, publishedData)

        }

        fetchAsync()


    }, [])
    console.log(test)

    return (
        <div>Main page</div>
    )
}