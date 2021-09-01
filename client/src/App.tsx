import './sass/global.scss'
import Header from './components/header/header'
import SignUpForm from './components/signUpForm/signUpForm'

function App(): JSX.Element {
    return (
        <div className="App">
            <Header />
            <SignUpForm />
        </div>
    )
}

export default App
