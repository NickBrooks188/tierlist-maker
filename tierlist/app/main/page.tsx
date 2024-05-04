'use client';
import { useAppSelector } from "../redux/store"

export default function Page() {
    const test = useAppSelector(state => state.session)
    console.log('888888888')
    console.log(test)
    return (
        <div>Main page</div>
    )
}