import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate()

    const handleNavigation = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate("/");
                break;
            case 1:
                navigate("/search");
                break;
            case 2:
                navigate("/my-profile");
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
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="VideoLibrary" icon={<VideoLibraryIcon />} />
            </BottomNavigation>
        </Box>
    );
}

export default Footer