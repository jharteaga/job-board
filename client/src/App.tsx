import './sass/global.scss'
import { SignUpForm, Layout, SignInForm, PrivateRoute } from './components/'
import { Switch, Route } from 'react-router-dom'
import { UserProvider } from './contextProvider'

function App(): JSX.Element {
    return (
        <UserProvider>
            <Layout>
                <Switch>
                    <PrivateRoute path="/this-private">
                        <h2>This is private</h2>
                    </PrivateRoute>
                    <Route path="/jobs">
                        <div className="App">Job offers</div>
                    </Route>
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
        </UserProvider>
    )
}

export default App
