'use client';
import styles from './Select.module.css'
import TemplateTile from '@/app/components/TemplateTile/templatetile'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'

export default function Select() {

    const templates = useAppSelector(state => state.allLists.templates)


    const dispatch = useAppDispatch()
    useEffect(() => {

        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
        }

        fetchAsync()


    }, [])
    return (
        <div className={styles.template_selection}>

            <div className={styles.templates_wrapper}>
                <TemplateTile
                    image_url={'create'}
                    name={"Create your own"}
                    description={"Build your own tier list template"}
                />
                {templates && Object.values(templates).map((template: any) => (
                    <TemplateTile
                        key={`template-${template.id}`}
                        image_url={template.background_image_url}
                        name={template.name}
                        description={template.description}
                    />
                ))}
            </div>
        </div>
    )
}