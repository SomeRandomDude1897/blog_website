import { createContext, useState } from "react";

const ScrollContext = createContext({});

export const ScrollProvider = ({children}) => {
    const [scroll, setScroll] = useState(0);

    return ( 
        <ScrollContext.Provider value = {{scroll, setScroll}}>
            {children}
        </ScrollContext.Provider>
     );
}
 
export {ScrollContext};