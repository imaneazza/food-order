import Header from "./component/Header.jsx";
import Meals from "./component/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";

function App() {
    return (
        <CartContextProvider>

            <Header/>
            <Meals/>
        </CartContextProvider>
    );
}

export default App;
