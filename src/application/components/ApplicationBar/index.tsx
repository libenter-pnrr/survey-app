import React from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useApplicationContext } from "@contexts/ApplicationProvider";
import { getMenu } from "@common/Menu";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
// @ts-ignore-next-line
import Logo from "@assets/img/libenter.png";
import MenuIcon from "@mui/icons-material/Menu";

const ApplicationBar = () => {
  const navigate = useNavigate();
  const { name, roles } = useApplicationContext();
  const { keycloak } = useKeycloak();
  const [open, setOpen] = React.useState(false);

  const pages = getMenu(roles);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 350 }}>
          <List>
            {pages.map((page) => (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate(page.path);
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText
                    primary={page.title}
                    secondary={page.subtitle}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>

      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <IconButton
                onClick={() => setOpen(!open)}
                sx={{
                  color: "white",
                }}
              >
                <MenuIcon />
              </IconButton>

              <img
                src={Logo}
                alt="Survey App"
                height="50"
                onClick={() => navigate("/")}
              />
            </Box>
            <div>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={name} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() =>
                    keycloak.logout({
                      redirectUri: window.location.origin,
                    })
                  }
                >
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ApplicationBar;
