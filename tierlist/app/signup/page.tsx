'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabled, setDisabled] = useState(true)
    const [image, setImage] = useState("")


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
                    Email<span className='asterisk'>*</span>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => console.log(e.target.value)}
                        required
                    />
                </label>
                {/* <p>{errors.email}</p> */}
                <label>
                    Profile picture (optional)
                    <div className="signup-file-upload-wrapper">
                        <input
                            type="file"
                            accept='image/*'
                            onChange={(e) => console.log(e.target.files[0])}
                        />
                    </div>
                </label>
                {/* <p>{errors.image}</p> */}
                <label>
                    Password<span className='asterisk'>*</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => console.log(e.target.value)}
                        required
                    />
                </label>
                {/* <p>{errors.password}</p> */}
                <label>
                    Confirm Password<span className='asterisk'>*</span>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => console.log(e.target.value)}
                        required
                    />
                </label>
                {/* <p>{errors.confirmPassword}</p> */}
                <button type="submit" disabled={disabled} >Sign Up</button>
            </form>
        </main>
    )
}