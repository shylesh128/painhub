import {
  Box,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../styles/basicStyles";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const MenuItemAccSwitch = ({
  text,
  icon,
  isOpen,
  onClick,
  logout = false,
  active,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <MenuItem
      sx={{
        bgcolor: active ? colors.primaryLight : colors.bgColorInActive,
        color: active ? "white" : colors.iconInActive,
        ":hover": {
          bgcolor: colors.primaryLight,
          color: colors.white,
        },
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        height: "2.5rem",
        marginBottom: 0,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <Stack direction="row" alignItems="center">
        <ListItemIcon>
          {icon(hover || active ? colors.white : "black")}
        </ListItemIcon>

        <Typography
          variant="caption"
          sx={{
            color:
              hover || active ? colors.white : logout ? colors.red : "black",
          }}
        >
          {text}
        </Typography>
      </Stack>

      {isOpen ? (
        <MdKeyboardArrowUp size={20} />
      ) : (
        <MdKeyboardArrowDown size={20} />
      )}
    </MenuItem>
  );
};

export default MenuItemAccSwitch;
