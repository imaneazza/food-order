import Header from "./component/Header.jsx";
import Meals from "./component/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressProvider} from "./store/UserProgress.jsx";
import Cart from "./component/Cart.jsx";
import Checkout from "./component/Checkout.jsx";

function App() {
    return (
        <CartContextProvider>
            <UserProgressProvider>
                <Header/>
                <Meals/>
                <Cart/>
                <Checkout/>
            </UserProgressProvider>
        </CartContextProvider>
    );
}

export default App;
