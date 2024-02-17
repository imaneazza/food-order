import logo from '../assets/logo.jpg'
import Button from "./UI/Button.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";

export default function Header() {
    const context = useContext(CartContext)
    const totalElements = context.items.reduce((total,item)=>total+item.quantity,0)

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt="Food Logo "/>
                <h1>REACTFOOD</h1></div>

            <nav>
                <Button type={'text'}>Cart ({totalElements})</Button>
            </nav>
        </header>
    )
}