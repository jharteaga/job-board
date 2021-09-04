import { useContext } from 'react'
import style from './header.module.scss'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { UserContext } from '../../contextProvider'

export function Header() {
    const history = useHistory()
    const location = useLocation()

    const { from }: { from: { pathname: string } } = (location.state as {
        from: { pathname: string }
    }) || {
        from: { pathname: location.pathname }
    }

    const { isLoggedIn, logIn, logOut, token } = useContext(UserContext)
    return (
        <header className={style.headerWrapper}>
            <div className={style.headerContent}>
                <div className={style.logoWrapper}>
                    <img src="/images/job-board-logo.png" alt="job" />
                </div>
                <div className="style.menuWrapper">
                    <button
                        onClick={() => {
                            if (!isLoggedIn) {
                                logIn(() => {
                                    history.replace(from)
                                })
                            } else {
                                logOut(() => {
                                    history.replace(from)
                                })
                            }
                        }}
                    >
                        {isLoggedIn ? token : ''}
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </button>
                    <nav className="style.menuItems">
                        <ul>
                            <li>
                                <Link to="/this-private">Private</Link>
                            </li>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/signin">Signin</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                            <li>
                                <Link to="/jobs">Jobs</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
