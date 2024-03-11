import React, { useEffect, useState } from "react";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AppBar, Box, IconButton, Link, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";

import profile from "../../Assets/profile.png";
import MainIcon from "../../Assets/RoadDealerlogolightbg.png";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleHomePageNavigation, handleModel } from "../../Redux/Reducer";
import SideMenu from "../reusableComponents/SideMenu";

import { homeMenu, LogIn, menuContact } from "./Uitilites";

const NavBar = () => {
    const dispatch = useAppDispatch();
    const Theme = useTheme();
    const { breakPoints } = useAppSelector((state) => state);
    const isTab = useMediaQuery(Theme.breakpoints.down("md"));
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const [sideMenu, setsideMenu] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });
    type Anchor = "top" | "left" | "bottom" | "right";

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(currentScrollPos < 10 || prevScrollPos > currentScrollPos);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);
    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setsideMenu({ ...sideMenu, [anchor]: open });
    };
    const handleRoutes = (name: any) => {
        if (name) {
            dispatch(handleHomePageNavigation(name));
        }
    };
    return (
        <Box component="div" width="100%" display="flex" height="112px">
            <AppBar
                sx={{ boxShadow: "none !important", position: visible ? "fixed" : "sticky", top: visible ? 0 : "-112px", transition: "top 0.3s" }}
            >
                <Box
                    sx={{
                        backgroundColor: "#302939",
                        padding: 1.5,
                        display: "flex",
                        justifyContent: "space-between",
                        px: 7,
                        flexDirection: { xs: "column", md: "row" }
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: !breakPoints?.sm ? "block" : "flex" },
                            gap: { xs: 2, md: 1.6 },
                            alignItems: { xs: "center", md: "flex-end" }
                        }}
                    >
                        {breakPoints?.sm
                            ? menuContact.map((item: any) => (
                                  <Link href={item.link} target="_blank">
                                      <Typography sx={{ color: "#EBDDFF", display: "flex", alignItems: "center", fontSize: "15px" }}>
                                          <img src={item.icon} width="16px" height="16px" alt="contact" />
                                          &nbsp;&nbsp;
                                          {item.content}
                                      </Typography>
                                  </Link>
                              ))
                            : menuContact.map(
                                  (item: any) =>
                                      (item.content && (
                                          <Link href={item.link} target="_blank">
                                              <Typography
                                                  sx={{
                                                      color: "#EBDDFF",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      fontSize: "15px",
                                                      flexBasis: { xs: "100%", md: "auto" },
                                                      flexDirection: { xs: "column", md: "row" }
                                                  }}
                                              >
                                                  <img src={item.icon} width="16px" height="16px" alt="contact" />
                                                  &nbsp;&nbsp;
                                                  {item.content}
                                              </Typography>
                                          </Link>
                                      )) ||
                                      null
                              )}
                    </Box>
                    <Box>
                        <Typography
                            ml={!breakPoints?.sm ? 8 : ""}
                            sx={{ color: "#EBDDFF", display: "flex", gap: 1, alignItems: "center", cursor: "pointer" }}
                            onClick={handleOpenUserMenu}
                        >
                            <img src={profile} width="16px" height="16px" alt="profile" /> My Account
                        </Typography>
                        <Menu
                            sx={{ mt: { xs: 2, md: 0 } }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {LogIn.map((item: any) => (
                                <MenuItem
                                    onClick={() => dispatch(handleModel({ open: true, type: "Login" }))}
                                    sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
                                >
                                    <Typography fontWeight="bold">{item.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
                <Toolbar sx={{ backgroundColor: "#fff", color: "#000" }}>
                    <Box width="100%" display="flex" height="auto" justifyContent="space-between" alignItems="center" sx={{ pl: 1, pr: 2 }}>
                        <Box display="flex" justifyContent="flex-start">
                            <Box component="img" width="100px" height="50px" src={MainIcon} alt="Logo" />
                        </Box>
                        {!isTab ? (
                            <Box display="flex" justifyContent="flex-end" width={{ md: "60%", lg: "80%", xl: "50%" }}>
                                {homeMenu.map((menu: any, index: number) => (
                                    <Box
                                        px={2}
                                        sx={{ cursor: "pointer", color: "#000", fontWeight: 600 }}
                                        key={index}
                                        onClick={() => handleRoutes(menu.menuName)}
                                    >
                                        <Box component="div">{menu.menuName}</Box>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box display="flex" justifyContent="end">
                                <IconButton onClick={toggleDrawer("right", true)}>
                                    <MenuRoundedIcon sx={{ color: "#000" }} />
                                </IconButton>
                                <SideMenu menuData={homeMenu} closeIcon state={sideMenu} handleClose={toggleDrawer("right", false)} />
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
