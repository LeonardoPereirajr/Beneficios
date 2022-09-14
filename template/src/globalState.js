import { createContext, useContext, useState } from "react";


const GlobalContext = createContext();

export function GlobalStateProvider({ children }) {
    const [globalState, setGlobalState] = useState(null);

    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default function useGlobalState() {
    const { globalState, setGlobalState } = useContext(GlobalContext);

    return { globalState, setGlobalState }
}
