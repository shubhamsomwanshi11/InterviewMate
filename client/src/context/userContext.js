import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser])


    return <userContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </userContext.Provider>
}

export default UserProvider;