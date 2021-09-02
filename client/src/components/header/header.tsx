import style from './header.module.scss'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header className={style.headerWrapper}>
            <div className={style.headerContent}>
                <div className={style.logoWrapper}>
                    <img src="/images/job-board-logo.png" alt="job" />
                </div>
                <div className="menuWrapper">
                    <nav className="menuItems">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/signin">Signin</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
