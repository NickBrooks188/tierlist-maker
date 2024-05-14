'use client';
// import styles from './Select.module.css'
import TemplateTile from '@/app/components/TemplateTile/templatetile'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect, useState } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'
import { useParams } from 'next/navigation';

export default function Create() {

    const templates = useAppSelector(state => state.allLists.templates)
    const [template, setTemplate] = useState({})
    const [disabled, setDisabled] = useState(true)
    const params = useParams()

    useEffect(() => {
        const templateId = Number(params.template)
        if (templates[templateId]) {
            setTemplate(templates[templateId])
        }
        console.log(template)
    }, [params, templates])


    const dispatch = useAppDispatch()
    useEffect(() => {

        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
        }

        fetchAsync()

    }, [])


    return (
        <div >
            Create page
        </div>
    )
}