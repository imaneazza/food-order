import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

export default function Modal({children, open, onClose,className=''}) {
    const modalref = useRef()
    useEffect(() => {
        if (open) {
            modalref.current.showModal()
        }

        return ()=>modalref.current.close()
    }, [open])
    return createPortal(<dialog ref={modalref} className={`${className} modal`} o
    onClose={onClose}>
        {children}
    </dialog>, document.getElementById('modal'))
}