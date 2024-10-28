'use client'
import "@/Assets/css/component-styles/input.css"
import { useEffect, useState } from "react";

type InputTypes = "text" | "email" | "password" | "file" | "checkbox"

interface InputProps {
    label: string;
    placeholder?: string;
    name: string;
    type: InputTypes;
    value?: any
}





export default function Input({ label, placeholder, type, name, value }: InputProps) {

    

    return (
        <>
            <div className= {`${type === "checkbox" ? "input-wrapper-checkbox"  : "input-wrapper"}`}>
                <label htmlFor={label} className="input-label">{label}</label>
                <input type={type} placeholder={placeholder} name={name} value={value} />
            </div>
        </>
    )
}