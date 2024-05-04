'use client'
import TopNav from '@/app/components/topnav';
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/redux/store";
import { thunkAuthenticate } from "@/app/redux/session";
export default function Layout({ children }: { children: React.ReactNode }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <TopNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{isLoaded && children}</div>
        </div>
    );
}