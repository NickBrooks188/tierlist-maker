import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
    return (
        <div>Top navbar

            <Link href={'/'}>
                <Image src='https://jello-bucket.s3.us-west-1.amazonaws.com/TierForgeLogo.svg'
                    width={46}
                    height={25}
                    alt="Tier Forge logo"
                />
            </Link>
        </div>
    )
}