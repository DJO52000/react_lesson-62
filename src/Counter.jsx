import { useReducer } from "react";

function reducer(count, action) {
    switch(action.type){
        case "DECREMENT":
            return count - 1
        case "INCREMENT":
            return count + 1
        case "RESET":
            return 0
        default:
            return count
    }
}


export function Counter({ initialCount = 0}) {
    const[count, dispatch] = useReducer(reducer, initialCount)

    return (
        <>
            <button onClick={() => dispatch ({ type: "DECREMENT"})}>-</button>
            {count}
            <button onClick={() => dispatch ({ type: "INCREMENT"})}>+</button>
            <button onClick={() => dispatch ({ type: "RESET"})}>Reset</button>
        </>
    )
}