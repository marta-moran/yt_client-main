import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'


const Footer = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)


    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate("/");
                break;
            case 1:
                user?.role === "ADMIN" ? navigate("/search") : navigate('/login')
                break;
            case 2:
                user?.role === "ADMIN" ? navigate("/my-profile") : navigate('/login')
                break;
            default:
                break;
        }
    };


    return (
        <Box sx={{ width: "100%", position: "fixed", bottom: "0" }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleNavigation}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                {user?.role === "ADMIN" && <BottomNavigationAction label="Search" icon={<SearchIcon />} />}
                {user?.role === "ADMIN" && <BottomNavigationAction label="VideoLibrary" icon={<VideoLibraryIcon />} />}
            </BottomNavigation>
        </Box>
    );
}

export default Footer
