import { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';

const NonResponderCard = ({ name , email , phone_number , mobile_phone_number }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleRemindClick = (event) => {
        event.stopPropagation(); // Prevent event bubbling that might cause unintended behavior
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                bgcolor: '#FFF',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid rgba(0, 0, 0, 0.1)', // Add border instead of shadow
                position: 'relative', // Ensure the card stays in place
            }}
        >
            <Typography variant='body1' sx={{ color: '#354052', fontWeight: '800' }}>
                {name}
            </Typography>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleRemindClick}
                sx={{ bgcolor: '#354052', color: '#FFF', fontWeight: '800' }}
            >
                Remind
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleMenuClose}>Gmail</MenuItem>
                <MenuItem onClick={handleMenuClose}>SMS</MenuItem>
                <MenuItem onClick={handleMenuClose}>Call</MenuItem>
            </Menu>
        </Box>
    );
};

export default NonResponderCard;