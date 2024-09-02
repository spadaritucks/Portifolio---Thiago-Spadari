'use client'
import Link from "next/link";
import '@/Assets/css/component-styles/navbar.css'
import { useState } from "react";

export default function Navbar() {

    const title = "<Thiago Spadari  />"

    return (
        <nav className="nav-area">
            <h2 className="logo-title">{title}</h2>
            <div className="links">
                <Link href='#menu'>Menu</Link>
                <Link href='#sobre-min-area'>Sobre mim</Link>
                <Link href='#project-section'>Projetos</Link>
            </div>
        </nav>
    )
}