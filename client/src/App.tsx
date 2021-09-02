import './sass/global.scss'
import { SignUpForm, Layout, SignInForm } from './components/'
import { Switch, Route } from 'react-router-dom'

function App(): JSX.Element {
    return (
        <Layout>
            <Switch>
                <Route path="/signup">
                    <div className="App">
                        <SignUpForm />
                    </div>
                </Route>
                <Route path="/signin">
                    <div className="App">
                        <SignInForm />
                    </div>
                </Route>
                <Route path="/">
                    <div className="App">
                        <h2>Home Page</h2>
                    </div>
                </Route>
            </Switch>
        </Layout>
    )
}

export default App
