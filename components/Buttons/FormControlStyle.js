import { FormControl } from "@mui/material";

const FormControlStyle = (props) => {
  if (props.theme) {
    return (
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          "& .MuiSelect-select": {
            backgroundColor: "white",
            borderRadius: "25px",
            color: "#0053B3",
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "Ubuntu",
            outline: "red",
          },
          "& .MuiInputBase-formControl": {
            borderRadius: "25px",
            border: "1px solid #0053B3",
          },
          "& .MuiSvgIcon-root": {
            color: "#0053B3",
          },
        }}
        size="small"
      >
        {props.children}
      </FormControl>
    );
  }
  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        "& .MuiSelect-select": {
          backgroundColor: "white",
          borderRadius: "25px",
          color: "#000000",
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "Ubuntu",
          outline: "red",
        },
        "& .MuiInputBase-formControl": {
          borderRadius: "25px",
          border: "1px solid #000000",
        },
        "& .MuiSvgIcon-root": {
          color: "#000000",
        },
      }}
      size="small"
    >
      {props.children}
    </FormControl>
  );
};

export default FormControlStyle;
