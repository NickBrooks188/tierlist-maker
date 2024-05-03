'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/app/page.module.css";
import { useSelector } from "react-redux";
import { setSessionState, testFunction } from "@/app/redux/session";
import { useDispatch } from "react-redux";


export default function Page() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true)
    const test = useSelector((state) => state)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(testFunction())
    }, [])

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
            <form onSubmit={(e) => console.log('here')}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {/* <p>{errors.email}</p> */}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {/* <p>{errors.password}</p> */}
                <button type="submit" disabled={disabled} className="button-dark">Log In</button>
            </form>
        </main>
    )
}