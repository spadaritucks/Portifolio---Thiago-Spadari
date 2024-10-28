"use client"
import "@/Assets/css/component-styles/modal.css"
import { ReactNode, useEffect, useState } from "react";
interface ModalProps {
    title: String;
    children: ReactNode
    modalOpen: boolean
    modalClose: () => void

}


export default function Modal({ title, children, modalOpen, modalClose }: ModalProps) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (modalOpen) {
            setShow(true);
        } else {
            const timer = setTimeout(() => setShow(false), 300); // Tempo da animação
            return () => clearTimeout(timer);
        }
    }, [modalOpen]);

    return (
        <section className={`modal-content ${show ? 'show' : ''}`}>
            <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
                <button onClick={modalClose}>Fechar</button>
            </div>
            <div className="modal-body">{children}</div>
        </section>
    )

}