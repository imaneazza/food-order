import logo from '../assets/logo.jpg'
import Button from "./UI/Button.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgress from "../store/UserProgress.jsx";

export default function Header() {
    const context = useContext(CartContext)
    const totalElements = context.items.reduce((total, item) => total + item.quantity, 0)
    const contextModal = useContext(UserProgress)


    function handleShowCart(){
        contextModal.showCart();
    }
    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt="Food Logo "/>
                <h1>REACTFOOD</h1></div>

            <nav>
                <Button typeText onClick={handleShowCart}>Cart ({totalElements})</Button>
            </nav>
        </header>
    )
}