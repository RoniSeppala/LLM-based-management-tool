import React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import '../styles/Header.css'
import { GitHub } from '@mui/icons-material'

const Header: React.FC = () => {
    return (
        <>
            <AppBar position="static" className='header' sx={{
                background: 'linear-gradient(162deg,rgb(9, 22, 87), #764ba2)',
                borderBottom: '1px solid',
                borderImageSlice: 1,
                borderImageSource: "linear-gradient(to right,rgb(112, 112, 112)50% ,rgb(35, 30, 56))"
            }}>
                <Toolbar sx={{ justifyContent: 'space-between', color: 'rgb(4, 156, 98)', textShadow: '2px 2px 20px rgba(236, 236, 236, 0.51)' }}>
                    <h1>CM Tool</h1>
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