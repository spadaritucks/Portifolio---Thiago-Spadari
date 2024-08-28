'use client'
import Link from "next/link";
import '@/Assets/css/component-styles/navbar.css'
import { useState } from "react";

export default function Navbar() {

   

    return (
        <nav className="nav-area">
            <h2 className="logo-title">Thiago Spadari</h2>
            <div className="links">
                <Link href=''>Contact</Link>
                <Link href=''>About me</Link>
            </div>
        </nav>
    )
}