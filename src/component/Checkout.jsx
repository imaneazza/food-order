import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgress from "../store/UserProgress.jsx";
import {currencyFormatter} from "../utils/formatter.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../hooks/useHook.js";

const configRequest = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }

}
export default function Checkout() {
    const {data, error, loading, sendRequest, clearData} = useHttp('http://localhost:3000/orders', configRequest)
    const context = useContext(CartContext)
    const contextModal = useContext(UserProgress)
    const cartTotal = context.items.reduce((total, item) => {
        return total + (item.quantity * item.price)
    }, 0)


    function handleClose() {
        contextModal.hideCheckout()
    }

    function handleFinish() {
        contextModal.hideCheckout()
        context.clearItems()
        clearData()
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formdata = new FormData(event.target)

        const data = Object.fromEntries(formdata.entries())
        console.log(data)
        sendRequest(JSON.stringify({
            order: {
                items: context.items,
                customer: data
            }
        }))

    }

    const open = contextModal.progress === 'checkout'
    if (data && !error) {
        return <Modal open={open}
                      onClose={handleFinish}>
            <h2>Success </h2>
            <p>Your order was submitted successfully !</p>
            <p className="modal-action">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

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
            {error && !loading && <div className={'error'}>
                <h2>Failed to submit Order</h2>
                <p>{error}</p>
            </div>
            }
            {loading && <span>  Sending data ...</span>}
            {!loading && <p className="modal-action">
                <Button typeText onClick={handleClose} type='button'>close</Button>
                <Button>Submit Order </Button>
            </p>}
        </form>


    </Modal>
}