import React from "react";
import { Paper, Typography, Box, Avatar, IconButton } from "@mui/material";

import { MdClose, MdComment, MdFavorite, MdShare } from "react-icons/md";
import { letterToColorMap } from "@/utils/alphaToColors";

const Post = ({ text, username, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  function getColorForUsername(username) {
    const firstLetter = username.charAt(0).toUpperCase();
    return letterToColorMap[firstLetter] || "#000000";
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        marginBottom: 2,
        width: "100%",
        backgroundColor: "#1c1c1c",
        color: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #bdbdbd",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        {/* <Avatar
          sx={{
            width: 28,
            height: 28,
            mr: 1,
            backgroundColor: getColorForUsername(username),
          }}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar> */}
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: "bold",
            mr: 1,
            color: getColorForUsername(username),
            textTransform: "lowercase",
          }}
        >
          @{username}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
          {formattedTime}
        </Typography>
      </Box>
      <Typography sx={{ mb: 1, fontSize: "0.9rem", color: "grey" }}>
        {text}
      </Typography>
    </Paper>
  );
};

export default Post;
