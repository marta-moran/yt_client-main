import './SignupPage.css'
import { useEffect, useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AuthService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const SignupPage = () => {

    const [user, setUser] = useState({ username: "", password: "", email: "" })

    const navigate = useNavigate()

    const [error, setError] = useState(false)
    const [errorDescription, setErrorDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        AuthService
            .signup(user)
            .then(user => {
                navigate('/login')

            })
            .catch(e => {
                console.log(e.response.data.err)
                setError(true)
                setErrorDescription(e.response.data.err)
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <>
            <SignUpForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            {
                error && <Alert severity="error">{errorDescription}</Alert>
            }
        </>

    )
}

export default SignupPage