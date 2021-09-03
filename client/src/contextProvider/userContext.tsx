import { createContext, useState } from 'react'

interface UserContextState {
    userName: string | null
    isLoggedIn: boolean
    logIn: (cb?: () => void) => void
}

const initialState: UserContextState = {
    userName: null,
    isLoggedIn: false,
    logIn: () => {}
}

export const UserContext = createContext(initialState)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function logIn(cb?: () => void) {
        setIsLoggedIn((prev) => (!prev ? true : false))
        if (cb) {
            cb()
        }
    }

    return (
        <UserContext.Provider
            value={{ userName: null, isLoggedIn: isLoggedIn, logIn: logIn }}
        >
            {children}
        </UserContext.Provider>
    )
}
