import {createContext, useReducer} from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {
    },
    removeItem: (id) => {
    }
})

function cartReducer(state, action) {
    let existingItem
    const updatedItems = [...state.items]
    switch (action.type) {
        case "ADD_ITEM":
            existingItem = state.items.findIndex(item => item.id == action.item.id)
            if (existingItem > -1) {
                updatedItems[existingItem] = {
                    ...updatedItems[existingItem],
                    quantity: updatedItems[existingItem].quantity + 1
                }

            } else {
                updatedItems.push({
                    ...action.item,
                    quantity: 1
                })

            }
            return {...state, items: updatedItems}
        case "REMOVE_ITEM":
            existingItem = state.items.findIndex(item => item.id == action.id)
            const existingItemdata = updatedItems[existingItem];
            if (existingItemdata.quantity == 1) {
                updatedItems.splice(existingItem, 1)
            } else {
                existingItemdata.quantity -= 1
                updatedItems[existingItem] = existingItemdata
            }

            return {...state, items: updatedItems}


    }
    return state
}

export function CartContextProvider({children}) {
    const [cart, dispatchCart,] = useReducer(cartReducer, {
        items: []
    })
    const cartContext = {
        items: cart.items,
        addItem: (item) => dispatchCart({type: 'ADD_ITEM', item: item}),
        removeItem: (id) => dispatchCart({type: 'REMOVE_ITEM', id: id})
    }
    console.log(cartContext)
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>

}

export default CartContext