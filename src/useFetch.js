import { useEffect, useReducer } from "react"


const ACTIONS = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR"
}

function reducer( state, {type, payload}) {
    switch(type) {
        case ACTIONS.FETCH_START:
            return {
                isError: false,
                isLoading: true
            }
        case ACTIONS.FETCH_SUCCESS:
            return {
                data: payload.data,
                isLoading: false,
                isError: false
            }
        case ACTIONS.FETCH_ERROR:
            return {
                isLoading: false,
                isError: true
            }
        default:
            return state
    }}


export function useFetch(url, options = {}) {
    const [state, dispatch] = useReducer(reducer, { isError: false, isLoading: true })
    // const [data, setData] = useState()//rewriting the code too use useReducer
    // const [isError, setIsError] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch({ type: ACTIONS.FETCH_START })
        // setData(undefined)//solved with reducer function, switch part
        // setIsError(false)
        // setIsLoading(true)

        const controller = new AbortController()

        fetch(url, { signal: controller.signal, ...options })
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
                return Promise.reject(res)
            })
            .then((data) => {
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } })
            })
            .catch((e) => {
                if (e.name === "AbortError") return

                dispatch({ type: ACTIONS.FETCH_ERROR })
            })

        return () => {
            controller.abort()
        }
    }, [url])

    return state
}
