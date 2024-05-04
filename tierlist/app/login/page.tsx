'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/app/page.module.css";
import { thunkLogin, thunkAuthenticate } from "@/app/redux/session";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from 'next/navigation'


export default function Page() {
    const [errors, setErrors] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true)
    const test = useAppSelector((state) => state);
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

        const credentials = {
            email,
            password
        }

        const serverResponse: { [key: string]: string } = await dispatch(thunkLogin(credentials))
        console.log(serverResponse)
        if (serverResponse.message) {
            setErrors(serverResponse.message)
        } else {
            const data = await dispatch(thunkAuthenticate())
            console.log('88888', data)
        }
    }

    return (
        <main className='main'>
            <Link href={'/'}>
                <Image src='https://jello-bucket.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
                    width={183}
                    height={100}
                    alt="Tier Forge logo"
                    className="logo"
                />
            </Link>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {(errors) && <p>{errors}</p>}
                <button type="submit" disabled={disabled} className="button-dark">Log In</button>
            </form>
        </main>
    )
}