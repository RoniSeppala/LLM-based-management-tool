import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                bgcolor: 'blue',
                color: 'white',
                padding: 2,
                textAlign: 'center',
            }}>
            <Typography variant="body1">
                © 2025 My AI Chat. All rights reserved.
            </Typography>
        </Box>
    )
}
export default Footer