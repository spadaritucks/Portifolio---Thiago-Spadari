'use client'
import Link from "next/link";
import '@/Assets/css/component-styles/navbar.css'
import { useState } from "react";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

export default function Navbar() {

    const title = "<Thiago Spadari  />"

    const [open, setOpen] = useState<boolean>(false)

    const toogleDropdown = () => {
        setOpen(!open)
    }

    return (
        <>
        <nav className="nav-area">
            <h2 className="logo-title">{title}</h2>
            <div className= {`links ${open ?  'open' : '' }`}>
                <Link href='#menu'>Menu</Link>
                <Link href='#sobre-min-area'>Sobre mim</Link>
                <Link href='#project-section'>Projetos</Link>
            </div>
            <div className="hamburguer-area">
                {!open ? <MenuSharpIcon className="hamburguer-style" style={{cursor: 'pointer', transition: '1s ease-in', fontSize: '50px' }} onClick={toogleDropdown} /> 
                : <CloseSharpIcon style={{cursor: 'pointer', transition: '1s ease-in', fontSize: '50px'}} onClick={toogleDropdown} />}
            </div>
        </nav>
        
        
        
        
        
        </>
    )
}