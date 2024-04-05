import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
} from "@mui/material";

import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdChat,
  MdEdit,
  MdLogout,
  MdNotificationsNone,
} from "react-icons/md";

import { PiUserSwitch } from "react-icons/pi";
import { UserContext } from "@/services/userContext";
import MenuItemAcc from "./MenuItemAcc";
import ProfileForItem from "./ProfileForItem";
import colors from "@/Themes/basic";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useContext(UserContext);

  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutWithMenuClose = () => {
    handleMenuClose();

    logout();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ padding: "4px" }}>
          <MdChat
            fontSize="large"
            color={colors.bgColorActive}
            size={30}
            onClick={() => {
              router.push("/chat");
            }}
          />
        </Box>

        <Box sx={{ padding: "4px" }}>
          <MdEdit
            fontSize="large"
            color={colors.bgColorActive}
            size={30}
            onClick={() => {
              router.push("/");
            }}
          />
        </Box>

        <Box
          sx={{
            backgroundColor: "#000",
            height: "2.25rem",
            minWidth: "fit-content",
            padding: 0,
            borderRadius: "2.5rem",
          }}
        >
          <List
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            <ListItemButton
              onClick={handleMenuClick}
              sx={{
                padding: 0,
                margin: 0,
                minWidth: "6.875rem",
              }}
            >
              <ListItemIcon
                style={{
                  minWidth: "fit-content",
                  padding: 5,
                  borderRadius: 15,
                }}
              >
                <Avatar
                  alt="avatar"
                  src={user && user.photo ? user.photo : undefined}
                  sx={{
                    width: "1.563rem",
                    height: "1.563rem",
                    minWidth: "fit-content",
                    bgcolor: "#000",
                    color: "white",
                  }}
                ></Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  user?.firstName
                    ? `${user?.firstName} ${user.lastName}`
                    : user.name
                }
                sx={{
                  color: "white",
                  textAlign: "left",
                  width: "fit-content",
                  minWidth: "fit-content",
                }}
              />
              <ListItemIcon
                style={{
                  minWidth: "1.875rem",
                }}
              >
                {open ? (
                  <MdArrowDropUp color="white" />
                ) : (
                  <MdArrowDropDown color="white" />
                )}
              </ListItemIcon>
            </ListItemButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                style: {
                  width: "21.875rem",
                },
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0 0.125rem 0.5rem rgba(0,0,0,0.32))",
                  mt: 1.5,
                  backgroundColor: "#000",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 14,
                    height: 10,
                    bgcolor: "black",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                  borderRadius: "0.75rem",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <ProfileForItem />
              <Divider />

              <MenuItemAcc
                text="Notification Preferences"
                icon={(color) => (
                  <MdNotificationsNone size={25} color={color} />
                )}
                onClick={() => {
                  // console.log("Notifcation Prefences");
                }}
              />

              <Divider sx={{ backgroundColor: "white" }} />

              <MenuItemAcc
                text="Sign Out"
                icon={(color) => <MdLogout size={25} color={color} />}
                onClick={handleLogoutWithMenuClose}
                logout={true}
              />
            </Menu>
          </List>
        </Box>
      </div>
    </div>
  );
};

export default AccountMenu;
