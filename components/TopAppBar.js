import React, { useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { UserContext } from "@/services/userContext";
import { useRouter } from "next/router";
import { MdChat, MdEdit } from "react-icons/md";

const TopAppBar = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          backgroundColor: "black",
          bottom: "auto",
          top: 0,
        }}
      >
        <Toolbar>
          <img
            src="/images/main.jpg"
            alt="pain hub logo"
            style={{
              height: "50px",
            }}
          />
          <Box sx={{ flexGrow: 1 }}></Box>

          <IconButton
            onClick={() => {
              router.push("/chat");
            }}
          >
            <MdChat color="#ffa31a" />
          </IconButton>

          <IconButton
            onClick={() => {
              router.push("/tweet");
            }}
          >
            <MdEdit color="#ffa31a" />
          </IconButton>

          {/* <Box>
            <IconButton onClick={handleAvatarClick}>
              <Avatar
                src=""
                alt="avatar"
                sx={{
                  height: "30px",
                  width: "30px",
                }}
              >
                {user?.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;
