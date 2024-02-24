import useHttp from "../hooks/useHook.js";
import MealItem from "./MealItem.jsx";

const requestConfig = {method: "GET"}
export default function Meals() {
    const {data, error, loading} = useHttp('http://localhost:3000/meals', requestConfig)
    return (<>
        {data && !loading && <ul id="meals">
            {data.map(meal => {
                return <MealItem meal={meal} key={meal.id}/>
            })}


        </ul>}
        {error && !loading && <div className={'error'}>
            <h2>An error Occured</h2>
            <p>{error}</p>
        </div>
        }
        {loading && <p>Fetching DATA ....</p>}


    </>)
}