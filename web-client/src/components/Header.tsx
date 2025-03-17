import React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import '../styles/Header.css'
import { GitHub } from '@mui/icons-material'

const Header: React.FC = () => {
    return (
        <>
            <AppBar position="static" className='header'>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <h1>My App</h1>
                    <IconButton
                        href="https://github.com/RoniSeppala/LLM-based-management-tool"
                    >
                        <GitHub fontSize='large' />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Header