import React, { useState } from 'react'

interface LoginState {
    email: string
    password: string
}

export function SignInForm() {
    const [login, setLogin] = useState<LoginState>({} as LoginState)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLogin((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const headers: {
            [header: string]: string
        } = {
            'Content-Type': 'application/json'
        }

        let body: {
            [key: string]: string | undefined
        }

        body = {
            email: login.email,
            password: login.password
        }

        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
        const data: { [data: string]: string } = await response.json()
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {JSON.stringify(login)}
                <div className="inputWrapper">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="inputWrapper">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
