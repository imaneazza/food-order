import {useEffect, useState} from "react";
import MealItem from "./MealItem.jsx";

export default function Meals() {
    const [mealsList, setMealsList] = useState([])
    useEffect(() => {
        async function getMeals() {
            try {
                let mealsresponse = await fetch('http://localhost:3000/meals');
                let data = await mealsresponse.json();
                setMealsList(data)
                console.log(data)
            } catch (e) {

            }

        }

        getMeals()
    }, [])

    return (<ul id="meals">
        {mealsList.map(meal => {
            return <MealItem meal={meal} key={meal.id}/>
        })}


    </ul>)
}