import {createContext, useState} from "react";

const UserProgress = createContext({
    progress: '',
    showCart: () => {
    },
    HideCart: () => {
    },
    showCheckout: () => {
    },
    hideCheckout: () => {
    }
})

export function UserProgressProvider({children}) {
    const [progress, setProgress] = useState('')

    function showCart() {
        setProgress('cart')
    }

    function HideCart() {
        setProgress('')
    }

    function showCheckout() {
        setProgress('checkout')
    }

    function hideCheckout() {
        setProgress('')
    }

    const contextData = {
        progress: progress,
        showCart: showCart,
        HideCart: HideCart,
        showCheckout: showCheckout,
        hideCheckout: hideCheckout
    }

    return <UserProgress.Provider value={contextData}>{children}</UserProgress.Provider>
}

export default UserProgress;