import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

import { useRouter } from "next/router";
import React, { useContext } from "react";

import { UserContext } from "@/services/userContext";
import colors from "@/Themes/basic";

const ProfileForItem = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  if (user) {
    return (
      <Box
        sx={{
          width: "100%",
          padding: "8px 16px",
        }}
      >
        <Grid
          container
          sx={{
            placeItems: "center",
          }}
        >
          <Grid
            item
            xs={3}
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="avatar"
                src={user?.photo ? user.photo : undefined}
                sx={{
                  width: 50,
                  height: 50,
                  minWidth: "fit-content",
                  bgcolor: colors.avatarBgColor,
                  color: colors.avatarColor,
                }}
              ></Avatar>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>

              {/* <Button
                sx={{
                  bgcolor: colors.white,
                  borderRadius: 15,
                  borderWidth: "1px",
                  borderColor: colors.primaryLight,
                  borderStyle: "solid",
                  padding: 0.5,
                  color: colors.primaryLight,
                  fontWeight: 500,
                }}
                onClick={() => {
                  router.push("/profile");
                }}
              >
                <Typography
                  sx={{
                    fontSize: "8px",
                  }}
                  variant="button"
                >
                  Edit Profile
                </Typography>
              </Button> */}
            </Box>

            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: 1.5,
                color: "white",
              }}
              variant="body1"
            >
              {user.role ? user.role : "Profession"}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: colors.secondary,
                lineHeight: 1.5,
              }}
            >
              {user?.username}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default ProfileForItem;
