import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({children}) => {

    const [context, setContext] = useState({ username: '' , name: ''})

    return (
        
        <DataContext.Provider value={{
            context,
            setContext    
        }}>
        {children}
        </DataContext.Provider>

    )
    }

export default DataProvider; 