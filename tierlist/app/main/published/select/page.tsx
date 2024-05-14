'use client';
import styles from './Select.module.css'
import TemplateTile from '@/app/components/TemplateTile/templatetile'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect, useState } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'
import { useRouter } from 'next/navigation';

export default function Select() {

    const templates = useAppSelector(state => state.allLists.templates)
    const [selection, setSelection] = useState(-1)
    const [disabled, setDisabled] = useState(true)
    const router = useRouter()


    const dispatch = useAppDispatch()
    useEffect(() => {

        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
        }

        fetchAsync()

    }, [])

    const handleSelect = (templateId: number) => {
        setSelection(templateId)
        setDisabled(false)
    }

    const create = () => {
        router.push(`/main/published/create/${selection}`)
    }

    return (
        <div className={styles.template_selection}>

            <div className={styles.templates_wrapper}>
                <TemplateTile
                    image_url={'create'}
                    name={"Create your own"}
                    description={"Build your own tier list template"}
                    selected={false}
                />
                {templates && Object.values(templates).map((template: any) => (
                    <div onClick={e => handleSelect(template.id)}>
                        <TemplateTile
                            key={`template-${template.id}`}
                            image_url={template.background_image_url}
                            name={template.name}
                            description={template.description}
                            selected={selection === template.id}
                        />
                    </div>
                ))}
            </div>
            <button disabled={disabled} onClick={create}>Use this template</button>
        </div>
    )
}