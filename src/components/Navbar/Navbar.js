import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Settings } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";

import "./Navbar.css";

import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles({
  linkStyle: {
    marginLeft: "5px",
    padding: "5px",
    textDecoration: "none",
    minWidth: 100,
    color: "white",
    fontSize: 22,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

function Navbar() {
  const classes = useStyles();

  const { state, signout } = useContext(AuthContext);
  const history = useHistory();

  const goToPage = useCallback((page) => history.push(`/${page}`), [history]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {/* <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}

          {state.user && state.token ? (
            <React.Fragment>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Link to="/" className={classes.linkStyle}>
                    Dashboard
                  </Link>
                  <Link to="/wallets" className={classes.linkStyle}>
                    Wallets
                  </Link>
                </Box>
                <div>
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }} src={state.user.avatar} />
                  </IconButton>
                </div>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => goToPage("profile")}>
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }} src={state.user.avatar} /> Profile
                </MenuItem>

                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <MenuItem onClick={() => signout().then(() => goToPage("login"))}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 3 }}
                onClick={() => goToPage("login")}
              >
                Login
              </Button>
            </Box>
          )}
        </div>
        {/* <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav> */}
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
