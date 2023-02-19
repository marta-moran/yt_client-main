import './SignupPage.css'
import { useEffect, useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AuthService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

    const [user, setUser] = useState({ username: "", password: "", email: "" })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        AuthService
            .signup(user)
            .then(user => {
                navigate('/login')
                // DAR LA BIENVENIDA AL USUARIO!!!
            })
            .catch(e => console.log(e))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <SignUpForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    )
}

export default SignupPage