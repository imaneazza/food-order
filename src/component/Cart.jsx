import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../utils/formatter.js";
import Button from "./UI/Button.jsx";
import UserProgress from "../store/UserProgress.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const context = useContext(CartContext)
    const contextModal = useContext(UserProgress)
    const cartTotal = context.items.reduce((total, item) => {
        return total + (item.quantity * item.price)
    }, 0)
    const existingItems = context.items && context.items.length > 0

    function handleClose() {
        contextModal.HideCart()
    }

    function handleCheckout() {
        contextModal.showCheckout()
    }

    const open = contextModal.progress === 'cart'


    return (
        <Modal className={'cart'} open={open}
               onClose={ contextModal.progress === 'cart' ? handleClose:null}>
            <h2>Your Cart </h2>
            <ul>
                {context.items.map(item => {
                    return <CartItem item={item}
                                     addItem={() => context.addItem(item)}
                                     removeItem={() => context.removeItem(item.id)}/>
                })}
            </ul>

            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button typeText onClick={handleClose}>Close</Button>
                {existingItems && <Button onClick={handleCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )

}