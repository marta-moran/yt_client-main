import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';


function Profile() {
    const { user } = useContext(AuthContext)
    const itemsLocalStorage = []


    const getLocalStorage = () => {
        let almacenamiento = localStorage.getItem("historial"); // "shin chan, lady gaga"
        if (almacenamiento) {
            let items = almacenamiento.split(","); // ["shin chan", "lady gaga"]

            for (let i = 0; i < items.length; i++) {
                itemsLocalStorage.push(items[i])
            }
        }
    }


    useEffect(() => {
        getLocalStorage()
    }, [getLocalStorage()])

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
                                    itemsLocalStorage.length !== 0 ? itemsLocalStorage.map((item, index) => <p key={index}>{item}</p>) : null
                                }
                            </div>
                            <div>
                                <DeleteIcon onClick={() => localStorage.removeItem('historial')} sx={{ color: 'red', fontSize: '2.5em' }}></DeleteIcon>
                            </div>
                        </div>
                    </>
                )
            }

        </>



    )
}

export default Profile