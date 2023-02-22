import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";


function Profile() {
    const { user } = useContext(AuthContext)
    const itemsLocalStorage = []
    const navigate = useNavigate()
    const [historial, setHistorial] = useState([])



    const getLocalStorage = () => {
        let almacenamiento = localStorage.getItem("historial");
        if (almacenamiento) {
            let items = almacenamiento.split(",");

            for (let i = 0; i < items.length; i++) {
                itemsLocalStorage.push(items[i])
            }

            setHistorial(itemsLocalStorage)
        }
    }

    const handleClick = () => {
        localStorage.removeItem('historial')
        setHistorial([])
    }


    useEffect(() => {
        getLocalStorage()
    }, [])

    return (
        <>
            {
                user && (
                    <>
                        <div className="profile-content">
                            <div>
                                <img src={user.avatar} alt={user.username} />
                            </div>
                            <div>
                                <h3>{user.username}</h3>
                                <h3 className="grey">{user.email}</h3>
                            </div>

                        </div>

                        <div className="history">
                            <div>
                                <h4>Historial de búsquedas</h4>
                                {
                                    historial.length !== 0 ? historial.map((item, index) => <p key={index}>{item}</p>) : null
                                }
                            </div>
                            <div>
                                <DeleteIcon onClick={handleClick} sx={{ color: 'red', fontSize: '2.5em' }}></DeleteIcon>
                            </div>
                        </div>
                    </>
                )
            }

        </>



    )
}

export default Profile