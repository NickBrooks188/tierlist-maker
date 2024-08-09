import styles from "./MainLoading.module.css";
import Image from "next/image";

export default function MainLoading() {

    return (
        <div className={styles.loading_wrapper} >
            <Image src='https://tierforge.s3.us-west-1.amazonaws.com/fade-stagger-squares.svg' alt="Loading" width={40} height={40} />
        </div >
    )
}