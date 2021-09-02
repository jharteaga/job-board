import './sass/global.scss'
import { SignUpForm, Layout } from './components/'
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
