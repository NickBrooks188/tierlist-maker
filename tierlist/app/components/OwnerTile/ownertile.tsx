import { image } from "html2canvas/dist/types/css/types/image";
import styles from "./OwnerTile.module.css";
import Image from "next/image";

export default function OwnerTile({ id, email, image_url }: { id: number, email: string, image_url: string }) {
    return (
        <div className={styles.owner_wrapper} >
            {image_url &&
                <Image src={image_url} alt={email} width={40} height={40} />}
            {!image_url && <div className={styles.no_image}> {email[0].toUpperCase()}</div>}
            {email}
        </div >
    )
}