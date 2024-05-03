import { Box, Paper, Typography } from "@mui/material";

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
        <Typography variant="caption" sx={{ color: "#ffa31a" }}>
          {formattedTime}
        </Typography>
      </Box>
      <Typography sx={{ mb: 1, fontSize: "1rem", color: "#fff", opacity: 0.8 }}>
        {text}
      </Typography>
    </Paper>
  );
};

export default Post;
