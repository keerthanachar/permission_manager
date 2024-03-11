import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, Button, Grid, Menu, MenuItem, Toolbar, Tooltip } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// import { ReactComponent as ArrowRight } from "../../../Assets/Arrow-right.svg";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactComponent as NotifyBell } from "../../../Assets/Notifybell.svg";
import MainIcon from "../../../Assets/RoadDealerCleanlogodarkbg.png";
// import RoadDealerfavicon from "../../../Assets/RoadDealerFav.png";
// import RoadDealericon from "../../../Assets/RoaddealerLogo.png";
import { config, RolesData } from "../../../config";
import { GetChatNotificationByUserID } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { updateUser } from "../../../Redux/Reducer";
import { en } from "../../../translate/en";
import DialogBox from "../Dailog";
import HoC from "..";

// import { useAppSelector } from "../../../Redux/hooks";
import { Logout, SidebarData } from "./constants";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const DRAWERWIDTH = 220;
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    borderRadius: 0,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));
// const openedMixin = (): CSSObject => ({
//     width: DRAWERWIDTH,
//     overflowX: "hidden"
// });

const closedMixin = (theme: Theme): CSSObject => ({
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp
    }),
    ...(open && {
        marginLeft: DRAWERWIDTH,
        width: `calc(100% - ${DRAWERWIDTH}px)`
    })
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: DRAWERWIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    borderRadius: 0,
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
        backgroundColor: "#313131",
        color: "#fff"
    })
}));
export default function SideBar({ children, menuData = [] }: any) {
    const [confirm, setConfirm] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const FilteredMenu: any = [];
    if (menuData?.length) {
        for (const sideMenu of SidebarData) {
            for (const menu of menuData) {
                if (sideMenu.title === menu?.Screen_Name && menu.IsView === 1) {
                    FilteredMenu.push(sideMenu);
                }
            }
        }
    }
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, breakPoints, Notifications } = useAppSelector((state: any) => state);
    // const notificationForDBS: any = chatNotify?.chatObjects?.filter((e: any) => {
    //     return (
    //         (e?.Sender_UserId !== user?.UserID && e?.DealerID !== user?.DealerID && Number(e?.DealerShip) === user?.DealerID) ||
    //         (e?.Sender_UserId !== user?.UserID && e?.UserName !== user?.First_Name && Number(e?.ReciverDealership) === user?.DealerID)
    //     );
    // });
    // const notificataionCountDBS: any = notificationForDBS?.filter((count: any) => {
    //     return count?.IsReceived === 0 && count?.IsRead === 0;
    // });
    // const notificataionCountSA: any = chatNotify?.chatObjects?.filter((count: any) => {
    //     return count?.IsReceived === 0 && count?.IsRead === 0;
    // });
    const [open, setOpen] = React.useState(false);
    const [notificationCount, setNotificationCount] = React.useState(false);
    const [clicked, setClicked] = React.useState("Home");
    const [sideMenu, setsideMenu] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });
    const uniqueSenderIDs = new Set();
    const uniqueUnreadCounts = [];

    for (const notification of Notifications) {
        if (!uniqueSenderIDs.has(notification.Sender_ID)) {
            uniqueSenderIDs.add(notification.Sender_ID);
            uniqueUnreadCounts.push(notification);
        }
    }
    const totalUnreadCount: any = Notifications?.filter((item: any) => !item.IsRead)?.length ?? "";
    const uniqueNotifications = [];
    if (user.RoleId === 1 || user.RoleId === 2) {
        const addedChatUsers: any[] = [];

        for (const notification of Notifications) {
            const chatUserId = notification.Chat_Users_ID;

            if (!addedChatUsers.includes(chatUserId)) {
                addedChatUsers.push(chatUserId);
                uniqueNotifications.push(notification);
            }
        }
    }
    const screenSize = () => {
        if (breakPoints?.sm) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        screenSize();
    }, [breakPoints?.sm]);
    const onClose = () => {
        setConfirm(false);
    };
    const notificationId: any =
        user?.RoleId === RolesData.SuperAdmin.RoleId || user?.RoleId === RolesData.RoadDealerAdmin.RoleId ? null : user?.UserID;
    const chatApiGet = async () => {
        // await dispatch(GetChatId());
        await dispatch(GetChatNotificationByUserID(notificationId));
    };
    const onOpen = () => setConfirm(true);
    const onDelete = (shouldLogout: boolean) => {
        if (shouldLogout) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            dispatch(updateUser({}));
            navigate("/");
            window.location.reload();
        } else {
            onClose();
        }
    };
    useEffect(() => {
        chatApiGet();
    }, []);
    useEffect(() => {
        const pathUrl = window.location.pathname;
        if (pathUrl === "/dashboard") {
            setClicked("Home");
        } else if (pathUrl === "/administrators") {
            setClicked("Administrators");
        } else if (pathUrl === "/dealers") {
            setClicked("Dealers");
        } else if (pathUrl === "/rolemanagement") {
            setClicked("Role Management");
        } else if (pathUrl === "/inventory") {
            setClicked("Inventory");
        } else if (pathUrl === "/product") {
            setClicked("Product Details");
        } else if (pathUrl === "/bids") {
            setClicked("Bid management");
        } else if (pathUrl === "/mybids") {
            setClicked("My Bids");
        } else if (pathUrl === "/buyfigure") {
            setClicked("Buy Figure");
        } else if (pathUrl === "/privatenetworks") {
            setClicked("Private Networks");
        } else if (pathUrl === "/mygarage") {
            setClicked("My Garage");
        }
    }, [window.location.pathname]);

    type Anchor = "top" | "left" | "bottom" | "right";
    const toggleDrawer = (anchor: Anchor, openDrawer: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setsideMenu({ ...sideMenu, [anchor]: openDrawer });
        setNotificationCount(true);
    };
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <AppBar position="fixed" color="inherit" open={open} elevation={0} enableColorOnDark sx={{ borderRadius: 0 }}>
                    <Toolbar sx={{ boxShadow: "none" }}>
                        {/* <Box position="relative" left={42}>
                        {open && (
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                            </Search>
                        )}
                    </Box> */}
                        <Box sx={{ flexGrow: 1 }} />
                        <Box flexGrow={0.5} pr={2}>
                            <Grid container display="flex" justifyContent="flex-end">
                                <Badge badgeContent={totalUnreadCount} color="error" onClick={toggleDrawer("right", true)} sx={{ cursor: "pointer" }}>
                                    <NotifyBell />
                                </Badge>
                                {/* {(user?.RoleId === 1 || user?.RoleId === 2) && Notifications?.[0]?.NotificationCount ? (
                                    <Badge
                                        badgeContent={totalUnreadCount}
                                        color="error"
                                        onClick={toggleDrawer("right", true)}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <NotifyBell />
                                    </Badge>
                                ) : Notifications?.length > 0 && user?.RoleId !== 4 ? (
                                    <Badge
                                        badgeContent={totalUnreadCount}
                                        color="error"
                                        onClick={toggleDrawer("right", true)}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <NotifyBell />
                                    </Badge>
                                ) : (
                                    <Badge badgeContent={totalUnreadCount} onClick={toggleDrawer("right", true)} sx={{ cursor: "pointer" }}>
                                        <NotifyBell />
                                    </Badge>
                                )} */}
                            </Grid>
                        </Box>
                        <Box
                            sx={{ flexGrow: 0.03, height: "65px", backgroundColor: "#f0f0f5", cursor: "pointer" }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={1}
                            onClick={handleOpenUserMenu}
                        >
                            <Avatar sx={{ bgcolor: "#F17070", p: 0.5, fontSize: 15, fontWeight: "bold" }}>{user?.RoleValue}</Avatar>
                            <Box>{user?.RoleName}</Box>
                        </Box>
                        <Menu anchorEl={anchorElUser} keepMounted open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                            {Logout.map((item: any) => (
                                <MenuItem
                                    onClick={() => {
                                        onOpen();
                                    }}
                                    sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}
                                >
                                    <Typography fontWeight="bold">{item.title}</Typography>
                                    <LogoutIcon />
                                </MenuItem>
                            ))}
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    open={!breakPoints?.sm ? false : open}
                    sx={{ "& .MuiDrawer-paper": { backgroundColor: "#313131", borderRadius: 0 }, display: "flex", flexDirection: "column" }}
                >
                    <DrawerHeader>
                        {!open && (
                            <img
                                src={MainIcon}
                                alt="Road Dealer"
                                style={{ position: "relative", minWidth: "90px", minHeight: "50px", transform: "translateX(20px)", top: "7px" }}
                            />
                        )}
                        {open && (
                            <img
                                src={config.roadDealerLogo || "https://roaddealer-images.s3.amazonaws.com/Road+dealer+Logo.png"}
                                // style={{ backgroundColor: "#313131", height: "100%", width: "100%" }}
                                style={{ position: "relative" }}
                                alt="Road Dealer"
                            />
                        )}
                    </DrawerHeader>
                    <List
                        sx={{
                            height: "100%",
                            marginTop: "auto",
                            marginRight: "1px"
                        }}
                        // onMouseOver={() => breakPoints.md && handleDrawerOpen()}
                        // onMouseLeave={() => breakPoints.md && handleDrawerClose()}
                    >
                        {FilteredMenu?.map((item: any, i: any) => (
                            <ListItem
                                key={item.title}
                                disablePadding
                                sx={{
                                    display: "block",
                                    inlineHeight: "20px",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    ":hover": {
                                        backgroundColor: "transparent",
                                        color: "#a462ff"
                                    }
                                }}
                            >
                                <Tooltip title={item.title} enterDelay={200} placement="top">
                                    <ListItemButton
                                        sx={{
                                            minHeight: "100%",
                                            justifyContent: open ? "initial" : "center"
                                        }}
                                        onClick={() => {
                                            setClicked(item.title);
                                            navigate(item.link);
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                // columnGap: 1,
                                                minWidth: 0,
                                                mr: open ? 2 : "auto",
                                                justifyContent: "center",
                                                color: clicked === item.title ? "#A462FF !important" : "#fff !important",
                                                fill: clicked === item.title ? "#A462FF !important" : "#fff !important",
                                                ":hover": {
                                                    backgroundColor: "transparent",
                                                    color: "#a462ff !important"
                                                },
                                                "#BIDS": {
                                                    fill: clicked === i ? "#fff " : "#393939"
                                                }
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                                            <Typography
                                                fontWeight={200}
                                                color="initial"
                                                sx={{
                                                    color: clicked === item.title ? "#A462FF !important" : "#fff !important",
                                                    ":hover": {
                                                        backgroundColor: "transparent",
                                                        color: "#A462FF !important"
                                                    },
                                                    fontSize: "16px"
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        ))}

                        {Logout.map((item: any) => (
                            <ListItem key={item.title} disablePadding sx={{ display: "block", marginLeft: -2 }}>
                                <ListItemButton
                                    sx={{
                                        justifyContent: open ? "initial" : "center"
                                    }}
                                    onClick={() => {
                                        onOpen();
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            // minWidth: 0,
                                            // mr: open ? 2 : "auto",
                                            justifyContent: "center",
                                            color: "#fff !important",
                                            ":hover": {
                                                backgroundColor: "transparent",
                                                color: "#A462FF !important"
                                            }
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={200}
                                            color="initial"
                                            sx={{
                                                color: "#fff !important",
                                                ":hover": {
                                                    backgroundColor: "transparent",
                                                    color: "#A462FF !important"
                                                },
                                                fontSize: "16px"
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" mt={8} sx={{ width: `calc(100% - ${DRAWERWIDTH}px)`, flexGrow: 1 }}>
                    {children}
                </Box>
            </Box>
            <DialogBox title="Confirm" open={confirm} onClose={onClose}>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>{en?.areYouWantToLogout}</Typography>
                    </Box>
                    <Box
                        component="div"
                        marginTop={1.5}
                        display="flex"
                        flexDirection={breakPoints?.sm ? "row" : "column-reverse"}
                        gap={1}
                        justifyContent="flex-end"
                        width="100%"
                        py={1}
                    >
                        <Box display="flex" gap={1}>
                            <Button
                                type="button"
                                onClick={() => {
                                    onDelete(false);
                                    handleCloseUserMenu();
                                }}
                                variant="outlined"
                            >
                                No
                            </Button>
                            <Button
                                onClick={() => {
                                    onDelete(true);
                                    handleCloseUserMenu();
                                }}
                                variant="filled"
                                sx={{ display: "flex" }}
                            >
                                Yes
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogBox>
            <HoC.AppNotifications
                menuData={user?.RoleId === 1 || user?.RoleId === 2 ? uniqueNotifications : Notifications}
                closeIcon
                state={sideMenu}
                handleClose={toggleDrawer("right", false)}
                totalcount={totalUnreadCount}
                notificationCount={notificationCount}
            />
        </>
    );
}
