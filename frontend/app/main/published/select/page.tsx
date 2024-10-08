'use client';
import styles from './Select.module.css'
import TemplateTile from '@/app/components/TemplateTile/templatetile'
import { useAppSelector, useAppDispatch } from '@/app/redux/store'
import { useEffect, useState, useCallback } from 'react'
import { thunkGetAllTemplates } from '@/app/redux/alllists'
import { thunkCreatePublished } from '@/app/redux/onelist';
import { useRouter } from 'next/navigation';
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from 'next/navigation';

export default function Select() {
    const selection_id = Number(useSearchParams().get('selection_id'))
    const templates = useAppSelector(state => state.allLists.templates)
    const sessionUser = useAppSelector(state => state.session.user)
    const [selection, setSelection] = useState(selection_id || -1)
    const [disabled, setDisabled] = useState(true)
    const [templateName, setTemplateName] = useState('')
    const [templateDescription, setTemplateDescription] = useState('')
    const router = useRouter()

    const dispatch = useAppDispatch()

    useEffect(() => {

        const fetchAsync = async () => {
            const templateData: any = await dispatch(thunkGetAllTemplates())
        }

        fetchAsync()

    }, [dispatch])

    const handleSelect = useCallback((templateId: number) => {
        setSelection(templateId)
    }, [])

    const updateName = useCallback((name: string) => {
        if (name.length < 25) {
            setTemplateName(name)
        }
    }, [])

    const updateDescription = useCallback((description: string) => {
        if (description.length < 45) {
            setTemplateDescription(description)
        }
    }, [])

    useEffect(() => {
        if (selection !== -1 && templateName.length) {
            setDisabled(false)
        }
    }, [selection, templateName])

    const create = useCallback(async () => {
        const templateData = {
            name: templateName,
            description: templateDescription,
            template_id: selection,
            owner: sessionUser.id,
            public: true
        }

        const serverData = await dispatch(thunkCreatePublished(templateData))
        if (!serverData.error) {
            router.push(`/main/published/${serverData.id}/edit`)
        } else {
            console.error(serverData)
        }
    }, [selection, templateName, templateDescription, sessionUser])

    return (
        <div className={styles.template_selection}>
            <Link href='/main'>
                <div className="back_main"><FontAwesomeIcon icon={faChevronLeft} />Back</div>
            </Link>
            <form className={styles.form_wrapper}>
                <label>List Name</label>
                <input type="text" placeholder="Name" onChange={e => updateName(e.target.value)} value={templateName} />
                <label>List Description</label>
                <input type="text" placeholder="Description" onChange={e => updateDescription(e.target.value)} value={templateDescription} />
            </form>
            <div className={styles.templates_wrapper}>
                <Link href='/main/templates/create'>
                    <TemplateTile
                        image_url={''}
                        name={"Create your own"}
                        description={"Build your own tier list template"}
                        selected={false}
                    />
                </Link>
                {templates && Object.values(templates).map((template: any) => (
                    <div onClick={e => handleSelect(template.id)} key={`template-${template.id}`}>
                        <TemplateTile
                            image_url={template.background_image_url}
                            name={template.name}
                            description={template.description}
                            selected={selection === template.id}
                        />
                    </div>
                ))}
            </div>
            <button disabled={disabled} onClick={create} className="button-dark">Use this template<FontAwesomeIcon icon={faCaretRight} /></button>
        </div>
    )
}