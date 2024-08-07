import styles from "./Loading.module.css";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Loading() {

    return (
        <div className={styles.loading_wrapper} >
            <Image src='https://tierforge.s3.us-west-1.amazonaws.com/fade-stagger-squares.svg' alt="Loading" width={40} height={40} />
        </div >
    )
}