import React from "react";
import { Paper, Typography, Box, Avatar, IconButton } from "@mui/material";

import { MdClose, MdComment, MdFavorite, MdShare } from "react-icons/md";

const Post = ({ text, username, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2, // reduce padding
        marginBottom: 2, // reduce margin
        width: "100%",
        backgroundColor: "#1c1c1c",
        color: "#ffffff",
        borderRadius: "8px", // reduce border radius
        border: "1px solid #bdbdbd",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar sx={{ width: 28, height: 28, mr: 1 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mr: 1 }}>
          {username}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="caption" sx={{ color: "#bdbdbd" }}>
          {formattedTime}
        </Typography>
      </Box>
      <Typography sx={{ mb: 1, fontSize: "0.9rem" }}>{text}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{ color: "#bdbdbd", "&:hover": { color: "#ffffff" } }}
          >
            <MdFavorite />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#bdbdbd", ml: 0.5 }}>
            42
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{ color: "#bdbdbd", "&:hover": { color: "#ffffff" } }}
          >
            <MdComment />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#bdbdbd", ml: 0.5 }}>
            18
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{ color: "#bdbdbd", "&:hover": { color: "#ffffff" } }}
          >
            <MdShare />
          </IconButton>
          <Typography variant="caption" sx={{ color: "#bdbdbd", ml: 0.5 }}>
            Share
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Post;
