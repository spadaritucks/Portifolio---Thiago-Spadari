'use client'
import "@/Assets/css/component-styles/select.css"
import { useEffect, useState } from "react";



interface SelectProps {
    label: string;
    name: string;
    value?: any
    children: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}





export default function Select({ label, name, value, children, onChange }: SelectProps) {

    

    return (
        <>
            <div className="select-wrapper">
                <label htmlFor={label} className="select-label">{label}</label>
                <select onChange={onChange} name={name}>{children}</select>
            </div>
        </>
    )
}