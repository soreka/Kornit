import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 800 : 800],
                }}
                size='10rem'
                thickness={10}
                {...props}
                value={100}
            />
            <CircularProgress variant="determinate" {...props} color="success" size='10rem' thickness='10' sx={{
                position: 'absolute',
                left: 0,
            }} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" sx={{ color: 'white', fontWeight: '700', fontSize: '2rem' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export default CircularProgressWithLabel;