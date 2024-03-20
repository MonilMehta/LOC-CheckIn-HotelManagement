import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link as Lk } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const MenuItemWrapper = styled(MenuItem)(({ theme }) => ({
    "&:hover": {
      borderBottom: `4px solid black`,
      transition: "border-bottom 0.3s ease-in-out",
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: isSmallScreen ? "100%" : "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: isSmallScreen ? "100%" : "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar
      sx={{ position: "sticky", backgroundColor: "white", color: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CheckIn
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Add your menu items here */}
            </Menu>
          </Box>

          {/* <MenuItem key="Product" onClick={handleCloseNavMenu}>
            <Typography textAlign="center">
              <Button>Product</Button>
            </Typography>
          </MenuItem> */}

          <MenuItemWrapper key="Product" onClick={handleCloseNavMenu}>
            <Typography textAlign="center">
              <Button>
                <Lk to="/" style={{ textDecoration: "none", color: "black" }}>
                  Home
                </Lk>
              </Button>
            </Typography>
          </MenuItemWrapper>

          {/* <MenuItem key="Pricing" onClick={handleCloseNavMenu}>
            <Typography textAlign="center">
              <Button>Pricing</Button>
            </Typography>
          </MenuItem> */}
          {/* <MenuItem key='Blog' onClick={handleCloseNavMenu}>
            <Typography textAlign="center">
              <Button>Blog</Button>
            </Typography>
          </MenuItem> */}
          <MenuItemWrapper>
            <Typography>
              <Button>
                <AppsOutlinedIcon style={{ color: "black" }} />
              </Button>
            </Typography>
          </MenuItemWrapper>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search", color: "black" }}
            />
          </Search>

          {/* <MenuItem>
            <Typography>
              <Button>
                <NotificationsOutlinedIcon style={{color:'black'}}/>
              </Button>
            </Typography>
          </MenuItem> */}
          {/* <MenuItem>
            <Typography>
              <Button>
                <PersonAddAltOutlinedIcon style={{color:'black'}}/>
              </Button>
            </Typography>
          </MenuItem> */}
          <div style={{ flexGrow: 1 }} />
          <div
            style={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              justifyContent: "flex-end",
            }}
          >
            <MenuItemWrapper>
              <Typography>
                <Button>
                  <InstagramIcon style={{ color: "black" }} />
                </Button>
              </Typography>
            </MenuItemWrapper>
            <MenuItemWrapper>
              <Typography>
                <Button>
                  <XIcon style={{ color: "black" }} />
                </Button>
              </Typography>
            </MenuItemWrapper>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key="Account" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem key="SignUp" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Lk to="/Signup" style={{color:'black',textDecoration:'none'}}>SignUp</Lk>
                  </Typography>
                </MenuItem>
                <MenuItem key="SignIn" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Lk to="/SignIn" style={{color:'black',textDecoration:'none'}}>SignIn</Lk>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
