import React, { createElement } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { SvgIcon } from "@mui/material";

const ITEM_HEIGHT = 48;

type OptionType = {
  label: string;
  onClick: () => void;
  icon?: typeof SvgIcon;
  iconColor?: string;
};

interface IMenuIconProps {
  options: OptionType[];
}

export default function MenuIcon(props: IMenuIconProps) {
  const { options = [] } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderIcon = (icon: typeof SvgIcon | undefined, iconColor?: string) =>
    icon ? (
      <ListItemIcon>
        {createElement(icon, { style: { color: iconColor || "inherit" } })}
      </ListItemIcon>
    ) : null;

  return options.length > 0 ? (
    <>
      <IconButton
        data-testid="menu-icon"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        data-testid="menu-dropdown"
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map(({ label, onClick, icon, iconColor }, index) => (
          <MenuItem key={`${index}_${label}`} onClick={onClick}>
            {renderIcon(icon, iconColor)}
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : (
    <></>
  );
}
