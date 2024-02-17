import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgress from "../store/UserProgress.jsx";
import {currencyFormatter} from "../utils/formatter.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";

export default function Checkout() {
    const context = useContext(CartContext)
    const contextModal = useContext(UserProgress)
    const cartTotal = context.items.reduce((total, item) => {
        return total + (item.quantity * item.price)
    }, 0)

    function handleClose() {
        contextModal.hideCheckout()
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formdata = new FormData(event.target)

        const data = Object.fromEntries(formdata.entries())
        console.log(data)
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: context.items,
                    customer: data
                }
            })
        })
    }

    const open = contextModal.progress === 'checkout'
    return <Modal open={open}
                  onClose={contextModal.progress === 'checkout' ? handleClose : null}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p> Total Amount : {currencyFormatter.format(cartTotal)}</p>
            <Input id={'name'} label={'Full Name'} type={'text'}/>
            <Input id={'email'} label={'Email Adress'} type={'email'}/>
            <Input id={'street'} label={'Street'} type={'text'}/>
            <div className="control-row">
                <Input id={'postal-code'} label={'Postal Code'} type={'text'}/>
                <Input id={'city'} label={'City'} type={'text'}/>

            </div>
            <p className="modal-action">
                <Button typeText onClick={handleClose} type='button'>close</Button>
                <Button>Submit Order </Button>
            </p>
        </form>


    </Modal>
}