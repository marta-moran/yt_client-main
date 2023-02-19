import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { ColorContext } from '../../contexts/color.context';

const SubmitButton = ({ children }) => {

    const { theme } = useContext(ColorContext)

    return (
        <ThemeProvider theme={theme}>
            <Button
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {children}
            </Button>
        </ThemeProvider>
    )
}

export default SubmitButton