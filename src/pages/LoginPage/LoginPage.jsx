import './LoginPage.css'
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState, useContext } from 'react';
import AuthService from '../../services/auth.service';
import { AuthContext } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [user, setUser] = useState({ username: "", password: "", email: "" })

    const { storeToken, setIsLoading } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        AuthService
            .login(user)
            .then(token => {
                storeToken(token)
                setIsLoading(false)
                navigate('/')
            })
            .catch(e => console.log(e))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <LoginForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    )
}

export default LoginPage