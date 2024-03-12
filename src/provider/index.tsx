import React, {useReducer, useMemo, createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";
interface GlobakContextData {
    loading: boolean,
    isAuth: boolean
}

const INIT_STATE = {
    loading: false,
    isAuth: false
} as GlobakContextData

const GlobalContext = createContext<any>({});

const reducer = (state: GlobakContextData, {type, payload}: {type: string, payload: any}) => {
    return {...state, [type]: payload}
}

const useGlobalContext = () => {
    return useContext(GlobalContext)
}

const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    const navigate = useNavigate()
    React.useEffect(() => {
      (async () =>{
        await isUserAuth();
      })()
    }, [])

    const isUserAuth = async () => {
      if (!!localStorage.getItem("access")) {
        dispatch({
          type: "isAuth",
          payload: true
        })
      }
    }

    React.useEffect(() => {
      if (!state.isAuth) {
          navigate("/login");
      }
  }, [state]);

    return (
        <GlobalContext.Provider
          value={useMemo(() => [
            state, { dispatch }
          ], [state])}
        >
          {children}
        </GlobalContext.Provider>
      )
}

export { GlobalContext, useGlobalContext, Provider };