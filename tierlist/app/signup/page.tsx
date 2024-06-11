'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { thunkSignup, thunkAuthenticate } from "@/app/redux/session";
import { useAppDispatch } from "@/app/redux/store";
import { useRouter } from 'next/navigation'
import styles from './Signup.module.css'

export default function Page() {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true)
    const [image, setImage] = useState<string>("")

    const dispatch = useAppDispatch()
    const router = useRouter();


    useEffect(() => {
        if (email && password && confirmPassword) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password, confirmPassword])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setErrors({ password: 'Passwords must match' })
            return
        }

        const user = {
            email,
            password,
            image_url: ''
        }

        const serverResponse: { [key: string]: string } = await dispatch(thunkSignup(user))
        console.log(serverResponse)
        if (serverResponse.token) {
            localStorage.setItem('token', serverResponse.token)
            router.push('/main')
        } else {
            setErrors(serverResponse)
        }
    }

    return (
        <main className='main'>
            <Link href={'/'}>
                <Image src='https://tierforge.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
                    width={183}
                    height={100}
                    alt="Tier Forge logo"
                    className="logo"
                />
            </Link>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.signup_form}>
                <label>
                    Email<span className='asterisk'>*</span>
                </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <p>{errors.email}</p>
                <label>
                    Profile picture (optional)
                </label>
                <div className="signup-file-upload-wrapper">
                    <input
                        type="file"
                        accept='image/*'
                        onChange={(e) => console.log(e.target.files ? e.target.files[0] : '')}
                    />
                </div>
                <p>{errors.image_url}</p>
                <label>
                    Password<span className='asterisk'>*</span>
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p>{errors.password}</p>
                <label>
                    Confirm Password<span className='asterisk'>*</span>
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={disabled} className="button-dark" >Sign Up</button>
            </form>
        </main>
    )
}