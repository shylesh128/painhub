import React from "react";

const Margin = ({ value = 2 }) => {
  return (
    <div
      style={{
        marginTop: `${value}rem`,
      }}
    />
  );
};

export default Margin;
