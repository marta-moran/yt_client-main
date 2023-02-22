import './LoginPage.css'
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState, useContext } from 'react';
import AuthService from '../../services/auth.service';
import { AuthContext } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const LoginPage = () => {

    const [user, setUser] = useState({ username: "", password: "", email: "" })

    const { storeToken, setIsLoading, authenticateUser } = useContext(AuthContext)

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        AuthService
            .login(user)
            .then(token => {
                storeToken(token)
                setIsLoading(false)
                authenticateUser()
                console.log(user)
                navigate('/')
            })
            .catch(e => {
                console.log(e)
                setError(true)
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <>
            <LoginForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            {
                error && <Alert severity="error">Usuario o contraseña incorrecta</Alert>
            }
        </>



    )
}

export default LoginPage