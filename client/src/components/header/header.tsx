import style from './header.module.scss'

export function Header() {
    return (
        <header className={style.headerWrapper}>
            <div className={style.headerContent}>
                <div className={style.logoWrapper}>
                    <img src="/images/job-board-logo.png" alt="job" />
                </div>
            </div>
        </header>
    )
}
