import colors from "@/Themes/basic";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

const MenuItemAcc = ({ text, icon, onClick, logout = false, active }) => {
  const [hover, setHover] = useState(false);

  return (
    <MenuItem
      sx={{
        bgcolor: active ? colors.primaryLight : "#000",
        color: "white",
        ":hover": {
          bgcolor: colors.primaryLight,
          color: colors.white,
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <ListItemIcon>{icon("white")}</ListItemIcon>
      <Typography
        variant="caption"
        sx={{
          color: "white",
        }}
      >
        {text}
      </Typography>
    </MenuItem>
  );
};

export default MenuItemAcc;
