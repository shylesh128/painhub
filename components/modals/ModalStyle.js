import { IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

const ModalStyle = ({ open, onClose, title, children, width = "600px" }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: width,
          backgroundColor: "#1c1c1c",
          borderRadius: "1.563rem",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          position: "relative",
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            style={{
              color: "#D9D9D9",
              fontSize: "1.5em",
              fontWeight: "600",
            }}
          >
            {title}
          </Typography>
        </div>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <MdClose color="#D9D9D9" />
        </IconButton>

        {children}
      </div>
    </Modal>
  );
};

export default ModalStyle;
