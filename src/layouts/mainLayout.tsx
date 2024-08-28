'use client'
import Navbar from "@/components/navbar";
import { Children, FC, ReactNode } from "react";



export const MainLayout:FC<{children: ReactNode}> = ({children}) => {

    return (
        <>
            <Navbar />
            {children}
        </>

    )
}