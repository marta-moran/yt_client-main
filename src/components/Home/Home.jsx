import { useEffect, useState } from 'react'
import './Home.css'
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

import usersService from '../../services/users.service';

function Home() {
    const userNormal = "Ravenloop"

    const [user, setUser] = useState([])

    useEffect(() => {
        if (localStorage.length !== 0) {
            usersService.isAdmin(localStorage.getItem('authToken'))
                .then(user => setUser(user))
                .catch(err => console.log(err))
        }

    }, [])

    return (
        <div className='home-section'>
            <h1>¡Hola
                {
                    user?.role === "ADMIN" ? <span className='color'> {user.username}</span> : <span className='color'> {userNormal}</span>
                }!</h1>
            <p>Bienvenido/a a la aplicación MGTC. Con esta aplicación podrás buscar cualquier canal de Youtube y
                ver sus vídeos y estadísiticas. Ha sido desarrollado con React, aunque también me he servido de una
                base de datos de mongoDB para almacenar el usuario administrador y un pequeño backend con nodeJS.</p>


            {
                user?.role !== "ADMIN" && (
                    <>
                        <p className='warning'>Recuerda que si no eres CEO no podrás logearte.</p>
                        <Link to="/login"><Fab variant="extended">
                            Login
                        </Fab></Link>

                    </>

                )
            }

        </div>
    )
}

export default Home