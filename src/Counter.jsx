import { useReducer } from "react";

const ACTION = {
    DECREMENT: "DECREMENT",
    INCREMENT: "INCREMENT",
    RESET: "RESET",
    CHANGE_COUNT: "CHANGE_COUNT"
}

function reducer(count, action) {
    // switch(action.type){//we add const to avoid mistakes
    //     case "DECREMENT":
    //         return count - 1
    //     case "INCREMENT":
    //         return count + 1
    //     case "RESET":
    //         return 0
    //     case "CHANGE_COUNT":
    //         return count + action.payload.value
    //     default:
    //         return count
    // }
    switch(action.type){
        case ACTION.DECREMENT:
            return count - 1
        case ACTION.INCREMENT:
            return count + 1
        case ACTION.RESET:
            return 0
        case ACTION.CHANGE_COUNT:
            return count + action.payload.value
        default:
            return count
    }
}


export function Counter({ initialCount = 0}) {
    const[count, dispatch] = useReducer(reducer, initialCount)

    return (
        <>
            <button onClick={() => dispatch ({ type: ACTION.DECREMENT})}>-</button>
            {count}
            <button onClick={() => dispatch ({ type: ACTION.INCREMENT})}>+</button>
            <br/>
            <button onClick={() => dispatch ({ type: ACTION.RESET})}>Reset</button>
            <br/>
            <button onClick={() => dispatch ({ type: ACTION.CHANGE_COUNT, payload: { value: 5 }}
            )}>
                +5
            </button>
        </>
    )
}