import { listItemStyle } from "@/Themes/styles";
import { Typography } from "@mui/material";

export function PageLayout(props) {
  return (
    <ul>
      {props.pains.map((pain, index) => (
        <li
          key={index}
          style={listItemStyle}
          onClick={() => props.handleSelectPain(pain)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#2ecc71",
              }}
            ></div>
            <Typography>{pain.name}</Typography>
          </div>
        </li>
      ))}
    </ul>
  );
}
