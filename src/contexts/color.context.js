import { createContext } from 'react'
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const ColorContext = createContext()

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const ColorProviderWrapper = (props) => {
    return (
        <ColorContext.Provider value={{ theme }}>
            {props.children}
        </ColorContext.Provider>
    )
}

export { ColorProviderWrapper, ColorContext }