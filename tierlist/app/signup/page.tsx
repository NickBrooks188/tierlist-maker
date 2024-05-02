import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <Link href={'/'}>
                <Image src='https://jello-bucket.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
                    width={183}
                    height={100}
                    alt="Tier Forge logo"
                />
            </Link>
            <div>Signup page</div>
        </>
    )
}