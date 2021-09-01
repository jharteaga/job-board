import { useState } from 'react'

export default function SignUpForm() {
    const [email, setEmail] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log(email, userName)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="inputWrapper">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>
                <div className="inputWrapper">
                    <label htmlFor="userName">User name: </label>
                    <input
                        type="text"
                        id="useName"
                        name="userName"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUserName(e.target.value)
                        }
                    />
                </div>
                <div className="inputWrapper">
                    <span>User Type:</span> <br />
                    <label htmlFor="userTypeEmployee">Employee</label>
                    <input
                        type="radio"
                        id="userTypeEmployee"
                        name="userType"
                        value="employee"
                    />
                    <label htmlFor="userTypeEmployer">Employer</label>
                    <input
                        type="radio"
                        id="userTypeEmployer"
                        name="userType"
                        value="employer"
                    />
                </div>
                <div className="employerWrapper">
                    <div className="inputWrapper">
                        <label htmlFor="companyName">Company name:</label>
                        <input type="text" id="companyName" />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="industrySector">Industry Sector:</label>
                        <input type="text" id="industrySector" />
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="companyWebsite">Company website:</label>
                        <input type="text" id="companyWebsite" />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
