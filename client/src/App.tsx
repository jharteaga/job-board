import './sass/global.scss'
import { Header, SignUpForm } from './components/'

function App(): JSX.Element {
    return (
        <div className="App">
            <Header />
            <SignUpForm />
        </div>
    )
}

export default App
