import { createContext, useReducer } from 'react'
import userReducer from './userReducer'

export interface UserContextState {
    userName: string | null
    email: string | null
    isLoggedIn: boolean
    signUp: (cb?: () => void) => void
    logIn: (cb?: () => void) => void
    logOut: (cb?: () => void) => void
    loading: boolean
    token?: string
}

const initialState: UserContextState = {
    userName: null,
    email: null,
    isLoggedIn: false,
    signUp: () => {},
    logIn: () => {},
    logOut: () => {},
    loading: false,
    token: undefined
}

export const UserContext = createContext<UserContextState>(initialState)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(userReducer, initialState)

    function signUp(cb?: () => void) {
        dispatch({ type: 'LOADING' })

        dispatch({ type: 'USER_SIGN_UP', payload: { token: 'thisistoken' } })

        if (cb) {
            cb()
        }
    }

    function logIn(cb?: () => void) {
        dispatch({ type: 'LOADING' })

        dispatch({ type: 'USER_SIGN_IN', payload: { token: 'thisistoken' } })

        if (cb) {
            cb()
        }
    }

    function logOut(cb?: () => void) {
        dispatch({ type: 'LOADING' })

        dispatch({ type: 'USER_SIGN_OUT' })
        if (cb) {
            cb()
        }
    }

    return (
        <UserContext.Provider
            value={{
                userName: null,
                email: null,
                isLoggedIn: state.isLoggedIn,
                signUp: signUp,
                logIn: logIn,
                logOut: logOut,
                loading: state.loading,
                token: state.token
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
