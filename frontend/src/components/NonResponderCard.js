import { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";

import { useNavigate } from "react-router-dom";
import apiClient from '../pages/apiClient';


const NonResponderCard = ({
  name,
  email,
  phone_number,
  mobile_phone_number,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customerName, setCustomerName] = useState("Ahmed");
  const handleRemindClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleSendNotification = async (type) => {
    try {
        const response = await apiClient.post('/notifications',{
            type:type , 
            name:name    
        });
        console.log(response);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
};


  return (
    <Box
      sx={{
        bgcolor: "#FFF",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.1)", // Add border instead of shadow
        position: "relative", // Ensure the card stays in place
      }}
    >
      <Typography variant="body1" sx={{ color: "#354052", fontWeight: "800" }}>
        {name}
      </Typography>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleRemindClick}
        sx={{ bgcolor: "#354052", color: "#FFF", fontWeight: "800" }}
      >
        Remind
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleSendNotification("email")}>
          Email
        </MenuItem>
        <MenuItem onClick={() => handleSendNotification("sms")}>SMS</MenuItem>
        <MenuItem onClick={() => handleSendNotification("call")}>Call</MenuItem>
      </Menu>
    </Box>
  );
};

export default NonResponderCard;
