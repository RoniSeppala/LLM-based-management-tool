import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                color: 'rgb(4, 156, 98)',
                padding: 2,
                textAlign: 'center',
                background: 'linear-gradient(to left,rgb(68, 42, 99) 5% , #764ba2)'
            }}>
            <Typography variant="body1">
                © 2025 LLM chat. All rights reserved.
            </Typography>
        </Box>
    )
}
export default Footer