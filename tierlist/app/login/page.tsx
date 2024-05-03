'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "@/app/page.module.css";


export default function Page() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true)

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
            <form onSubmit={console.log('here')}>
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
                <button type="submit" disabled={disabled} >Sign Up</button>
            </form>
        </main>
    )
}