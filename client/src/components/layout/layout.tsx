import React from 'react'
import { Header } from '..'
import { BrowserRouter as Router } from 'react-router-dom'

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Router>
                <Header />
                <main>{children}</main>
                <footer>&copy; Job-board, 2021.</footer>
            </Router>
        </>
    )
}
