import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../contextProvider'

export function PrivateRoute({
    children,
    path,
    ...rest
}: {
    children: React.ReactNode
    path: string
}) {
    const { isLoggedIn } = useContext(UserContext)
    return (
        <Route
            {...rest}
            path={path}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
