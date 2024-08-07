'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { thunkLogin, thunkAuthenticate, thunkLogout } from "@/app/redux/session";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from 'next/navigation'
import styles from './Login.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading/loading";


export default function Page() {
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const dispatch = useAppDispatch()

    useEffect(() => {
        document.title = 'Tier Forge: Log in'
    }, [])

    useEffect(() => {
        if (email && password) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const credentials = {
            email,
            password
        }

        const serverResponse: { [key: string]: string } = await dispatch(thunkLogin(credentials))
        if (serverResponse.token) {
            localStorage.setItem('token', serverResponse.token)
            router.push('/main')
        } else {
            setErrors(serverResponse.email)
            setLoading(false)
        }
    }

    return (
        <main className='main'>
            <Link href='/'>
                <div className="back"><FontAwesomeIcon icon={faChevronLeft} />Back</div>
            </Link>
            <Link href={'/'}>
                <Image src='https://tierforge.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
                    width={122}
                    height={67}
                    alt="Tier Forge logo"
                    className="logo"
                />
            </Link>
            {loading && <Loading />}
            <form className={styles.login_form} onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Email
                </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {(errors) && <p>{errors}</p>}
                <button type="submit" disabled={disabled} className="button-dark">Log In</button>
            </form>
        </main>
    )
}