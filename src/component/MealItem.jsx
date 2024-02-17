import {currencyFormatter} from "../utils/formatter.js";
import Button from "./UI/Button.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";

export default function MealItem({meal}) {
    const context = useContext(CartContext)

    function handleMealAdd() {
        context.addItem(meal)
    }

    return (<li className="meal-item " >
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt="meal detail "/>
            <div>
                <h3>{meal.name}</h3>
                <p className={'meal-item-price'}> {currencyFormatter.format(meal.price)}</p>
                <p className={'meal-item-description'}> {meal.description}</p>
            </div>
            <div className="meal-item-actions">
                <Button onClick={handleMealAdd}>Add to cart</Button>
            </div>
        </article>
    </li>)
}