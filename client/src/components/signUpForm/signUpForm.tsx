import { useState } from 'react'

interface FormStateUser {
    email: string
    userName: string
    password: string
}

interface FormStateEmployee extends FormStateUser {
    userType: 'employee'
    linkedIn?: string
    twitter?: string
    github?: string
    portfolioLink?: string
    resume?: File
}

interface FormStateEmployer extends FormStateUser {
    userType: 'employer'
    companyName: string
    industrySector: string
    companyWebsite: string
    companyDescription: string
}

type FormState = FormStateEmployee | FormStateEmployer

export default function SignUpForm() {
    const [formState, setFormState] = useState<FormState>({} as FormState)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState((prev) => {
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
        interface SocialMediaRequest {
            twitter?: string
            linkedin?: string
            github?: string
        }
        let body: {
            name: string
            email: string
            password: string
            role: string
            socialMedia?: SocialMediaRequest
        }

        if (formState.userType === 'employee') {
            body = {
                name: formState.userName,
                email: formState.email,
                password: formState.password,
                role: formState.userType
            }
            if (formState.twitter || formState.linkedIn || formState.github) {
                body.socialMedia = {}

                if (formState.twitter) {
                    body.socialMedia.twitter = formState.twitter
                }
                if (formState.linkedIn) {
                    body.socialMedia.linkedin = formState.linkedIn
                }
                if (formState.github) {
                    body.socialMedia.github = formState.github
                }
                // if (formState.github) {
                //     body = { socialMedia: { github: formState.github } }
                // }
                // if (formState.portfolioLink) {
            }
            //     body = { portfolioLink: formState.portfolioLink }
            // }
            // if (formState.resume) {
            //     body = { resume: formState.resume }
            // }
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            })
            const data: { [data: string]: string } = await response.json()
            console.log(data)
        }
    }
    return (
        <div>
            <p>{JSON.stringify(formState)}</p>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="userName">User name: </label>
                    <input
                        type="text"
                        id="useName"
                        name="userName"
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
                <div className="inputWrapper">
                    <span>User Type:</span> <br />
                    <label htmlFor="userTypeEmployee">Employee</label>
                    <input
                        type="radio"
                        id="userTypeEmployee"
                        name="userType"
                        value="employee"
                        onChange={handleChange}
                    />
                    <label htmlFor="userTypeEmployer">Employer</label>
                    <input
                        type="radio"
                        id="userTypeEmployer"
                        name="userType"
                        value="employer"
                        onChange={handleChange}
                    />
                </div>
                {formState.userType === 'employer' ? (
                    <div className="employerWrapper">
                        <div className="inputWrapper">
                            <label htmlFor="companyName">Company name:</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="industrySector">
                                Industry Sector:
                            </label>
                            <input
                                type="text"
                                id="industrySector"
                                name="industrySector"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="companyWebsite">
                                Company website:
                            </label>
                            <input
                                type="text"
                                id="companyWebsite"
                                name="companyWebsite"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {formState.userType === 'employee' ? (
                    <div className="employeeWrapper">
                        <div className="inputWrapper">
                            <label htmlFor="github">GitHub: </label>
                            <input
                                type="text"
                                name="github"
                                id="github"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="linkedIn">LinkedIn: </label>
                            <input
                                type="text"
                                name="linkedIn"
                                id="linkedIn"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="portfolioLink">Portfolio: </label>
                            <input
                                type="text"
                                name="portfolioLink"
                                id="portfolioLink"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="twitter">Twitter: </label>
                            <input
                                type="text"
                                name="twitter"
                                id="twitter"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="resume">Resume: </label>
                            <input
                                type="file"
                                name="resume"
                                id="resume"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
