import type React from "react";
import css from "../Modal/Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProps{
    children: React.ReactNode;
    onClose: () => void
}



export default function Modal({children, onClose}: ModalProps) {
    

    useEffect (() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                onClose()
            }
        }


        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden"

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)

            document.body.style.overflow = originalOverflow
        }
    }, [onClose])

if(typeof window === "undefined"){
    return null
}

const modalRoot = document.getElementById("modal-root");
if(!modalRoot) {
    return null
}



    return createPortal(<div
    className={css.backdrop}
    role="dialog"
    aria-modal="true"
    onClick={onClose}
    >
    <div className={css.modal}
    onClick={(e)=>{e.stopPropagation()}}
    >
        {children}
    </div>
</div>,
modalRoot
)
}