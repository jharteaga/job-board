import { UserContextState } from './userContext'

type ActionType =
    | { type: 'LOADING' }
    | { type: 'USER_SIGN_UP'; payload: any }
    | { type: 'USER_SIGN_IN'; payload: any }
    | { type: 'USER_SIGN_OUT' }

export default function userReducer(
    state: UserContextState,
    action: ActionType
) {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'USER_SIGN_UP':
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.payload.token
            }
        case 'USER_SIGN_IN':
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.payload.token
            }
        case 'USER_SIGN_OUT':
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                token: undefined
            }
    }
}
