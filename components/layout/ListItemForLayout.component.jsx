import colors from "@/Themes/basic";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
export const ListItemForLayout = ({
  tabName,
  active,
  icon,
  onClick,
  collapse,
  list,
  subList,
}) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(active ? true : false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip
        title={tabName}
        placement="right-start"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "rgb(0,0,0,0.79)",
              "& .MuiTooltip-arrow": {
                color: "rgb(0,0,0,0.79)",
              },
            },
          },
        }}
      >
        <ListItemButton
          onClick={collapse ? handleClick : onClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            bgcolor: active ? colors.bgColorActive : colors.bgColorInActive,
            color: active ? colors.colorActive : colors.iconInActive,
            borderRadius: "4px",
            height: 40,
            ":hover": {
              bgcolor: colors.bgColorActive,
              color: colors.colorActive,
              iconcolor: colors.colorActive,
            },
            margin: "4px",
            paddingLeft: "10px",
          }}
        >
          <ListItemIcon
            style={{
              marginRight: -25,
              marginLeft: subList ? 20 : 0,
            }}
          >
            {icon(
              active
                ? colors.colorActive
                : hover
                ? colors.colorActive
                : colors.iconInActive
            )}
          </ListItemIcon>

          <ListItemText primary={tabName} />
          {collapse && (open ? <MdExpandLess /> : <MdExpandMore />)}
        </ListItemButton>
      </Tooltip>
      {collapse && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense={true}>
            {list.map((listItem, i) => (
              <ListItemForLayout
                subList={true}
                key={i}
                tabName={listItem.tabName}
                icon={listItem.icon}
                active={listItem.active}
                onClick={listItem.onClick}
                collapse={listItem.collapse}
                list={listItem.list}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
