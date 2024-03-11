import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button, Drawer, Grid, IconButton, Paper, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

import API from "../../../API";
import { RolesData } from "../../../config";
import { GetChatNotificationByUserID } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { showAlert } from "../../../Redux/Reducer";
import { filterMessagesByDate } from "../../../reusableFunctions/ReusableFunctions";
import { en } from "../../../translate/en";
import SpinnerComponent from "../Spinner";

// import { isSameDay, isSameWeek } from "./logics";
import { notificationProps } from "./types";

type Anchor = "top" | "left" | "bottom" | "right";

const AppNotifications: React.FC<notificationProps> = ({ handleClose, state, menuData, totalcount, notificationCount }) => {
    const { user, breakPoints } = useAppSelector((e) => e);
    const dispatch = useAppDispatch();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [filteredButton, setFilteredButton] = useState<string>("today");
    const [filteredMenu, setFilteredMenu] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const handleHover = (index: number | null) => {
        setHoveredIndex(index);
    };

    const notificationId: any =
        user?.RoleId === RolesData.SuperAdmin.RoleId || user?.RoleId === RolesData.RoadDealerAdmin.RoleId ? null : user?.UserID;

    const chatApiGet = async () => {
        await dispatch(GetChatNotificationByUserID(notificationId));
    };

    const handleClick = async (data: any) => {
        const chatObj = {
            Sender_UserID: user?.UserID,
            Receiver_UserID: Number(data?.Sender_UserId) ?? data?.Sender_UserId,
            InventoryID: data?.Inventory_ID,
            RoomID: data?.RoomID,
            Sender_UserName: `${user.First_Name} ${user.Last_Name}`,
            Receiver_UserName: data?.Sender_UserName
        };

        sessionStorage.setItem("chatObj", JSON.stringify(chatObj));

        const newTab = window.open("/chat", "_blank");
        if (newTab) {
            newTab.focus();
        }

        const updateNotification = {
            Chat_Users_ID: data.Chat_Users_ID,
            IsRead: true,
            IsCleared: false,
            ModifyBy: user.Email,
            Message_ID: null,
            IsAdminRead: !!(user.RoleId === 1 || user.RoleId === 2),
            IsAdminCleared: false
        };

        try {
            await API.Chat.updateNotification(updateNotification);
            chatApiGet();
        } catch (error) {
            dispatch(
                showAlert({
                    open: true,
                    type: "error",
                    message: en.internalServerError,
                    closeIcon: true
                })
            );
        }
    };

    const handleButtonClick = (filterType: string) => {
        const { todayMessages, yesterdayMessages, thisWeekMessages } = filterMessagesByDate(menuData);
        setFilteredButton(filterType);

        if (filterType === "today") {
            setFilteredMenu(todayMessages);
        } else if (filterType === "yesterday") {
            setFilteredMenu(yesterdayMessages);
        } else if (filterType === "thisWeek") {
            setFilteredMenu(thisWeekMessages);
        }
    };

    useEffect(() => {
        handleButtonClick("today");
    }, [notificationCount]);

    useEffect(() => {
        dispatch(GetChatNotificationByUserID(notificationId));
    }, [filteredMenu]);

    useEffect(() => {
        setFilteredMenu(menuData);
    }, []);

    const handleDelete = async (index: any) => {
        try {
            setLoading(true);
            const notificationRes: any = await API.Chat.updateNotification({
                Chat_Users_ID: index?.Chat_Users_ID,
                IsRead: true,
                IsCleared: true,
                Message_ID: index?.Message_ID,
                ModifyBy: user?.Email,
                IsAdminRead: !!(user.RoleId === 1 || user.RoleId === 2),
                IsAdminCleared: !!(user.RoleId === 1 || user.RoleId === 2)
            });

            if (notificationRes?.data?.status) {
                const newMenuData = filteredMenu.filter((item: any) => item?.Message_ID !== index?.Message_ID);
                setFilteredMenu(newMenuData);
                await dispatch(GetChatNotificationByUserID(notificationId));
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            dispatch(
                showAlert({
                    open: true,
                    type: "error",
                    message: en.internalServerError,
                    closeIcon: true
                })
            );
        }
    };

    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : !breakPoints?.sm ? 300 : 450
            }}
            role="presentation"
        >
            {/* Rest of your Drawer content */}
            <Box
                sx={{
                    width: anchor === "top" || anchor === "bottom" ? "auto" : !breakPoints?.sm ? 300 : 450
                }}
                role="presentation"
                // onClick={handleClose}
                // onKeyDown={handleClose}
            >
                <Box
                    sx={{ backgroundColor: "#5318A3" }}
                    display="flex"
                    alignItems="flex-start"
                    flexDirection={!breakPoints?.sm ? "column" : "row"}
                    p={1}
                    justifyContent="space-evenly"
                    minHeight={40}
                >
                    <Typography variant="body1" ml={!breakPoints?.sm ? 12 : 20} mt={0.5} color="#fff">
                        Notifications
                    </Typography>
                    {totalcount > 0 && (
                        <Button size="small" sx={{ backgroundColor: "#7E3CD6", color: "#fff", fontWeight: 600, ml: !breakPoints?.sm ? 14 : 0 }}>
                            {totalcount} New
                        </Button>
                    )}
                </Box>
                <Box p={1} display="flex" flexDirection={!breakPoints?.sm ? "column" : "row"} justifyContent="space-evenly">
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 10,
                            mb: 1,
                            backgroundColor: filteredButton === "today" ? "#7E3CD6" : "white",
                            color: filteredButton === "today" ? "white" : " black"
                        }}
                        onClick={() => handleButtonClick("today")}
                    >
                        Today
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 10,
                            mb: 1,
                            backgroundColor: filteredButton === "yesterday" ? "#7E3CD6" : "white",
                            color: filteredButton === "yesterday" ? "white" : " black"
                        }}
                        onClick={() => handleButtonClick("yesterday")}
                    >
                        Yesterday
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 10,
                            mb: 1,
                            backgroundColor: filteredButton === "thisWeek" ? "#7E3CD6" : "white",
                            color: filteredButton === "thisWeek" ? "white" : " black"
                        }}
                        onClick={() => handleButtonClick("thisWeek")}
                    >
                        This Week
                    </Button>
                </Box>
                {filteredMenu?.length > 0 ? (
                    <Grid container direction={isMobile ? "row" : "column"}>
                        {filteredMenu?.map((e: any, index: number) => (
                            <Box
                                component={Paper}
                                p={1}
                                sx={{
                                    border: 0,
                                    borderRadius: 0,
                                    boxShadow: 0,
                                    position: "relative",
                                    "&:hover": {
                                        backgroundColor: "#F5EFFD",
                                        "& .delete-icon": {
                                            visibility: "visible"
                                        }
                                    }
                                }}
                                onMouseEnter={() => handleHover(index)}
                                onMouseLeave={() => handleHover(null)}
                            >
                                {loading ? (
                                    <SpinnerComponent open={loading} />
                                ) : (
                                    <Grid item lg={12} md={6} xs={2} pl={2}>
                                        <Box display="block" columnGap={1}>
                                            <Typography fontWeight={600}>{e.UserName ?? "-"}</Typography>
                                            <Typography fontWeight={600} color="gray">
                                                {e.Message_Content ?? "-"}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" columnGap={2} justifyContent="space-between" pr={2}>
                                            <Box display="flex" justifyContent="flex-start" columnGap={2}>
                                                <Typography>
                                                    {new Date(e.Message_DT).toLocaleString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true
                                                    }) ?? "-"}
                                                </Typography>
                                            </Box>
                                            <Box
                                                component="a"
                                                color="#F06547"
                                                sx={{ cursor: "pointer", ml: !breakPoints?.sm ? 18 : 0 }}
                                                onClick={() => {
                                                    handleClick(e);
                                                }}
                                            >
                                                View Chat
                                            </Box>
                                            {hoveredIndex === index && (
                                                <IconButton
                                                    onClick={() => handleDelete(e)}
                                                    className="delete-icon"
                                                    sx={{ position: "absolute", top: 0, right: 0, visibility: "hidden" }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </Grid>
                                )}
                            </Box>
                        ))}
                    </Grid>
                ) : (
                    <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No Data Found</Typography>
                )}
            </Box>
        </Box>
    );

    return (
        <Box component="div" boxShadow="none" borderRadius={0} marginTop={10}>
            {/* Rest of your component structure */}
            {(["left", "right", "top", "bottom"] as const)?.map((anchor, i: any) => (
                <React.Fragment key={i}>
                    <Drawer
                        key={i}
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={handleClose}
                        sx={{
                            height: 300,
                            boxShadow: "none",
                            // Apply marginTop to the Drawer component
                            marginTop: 10,
                            "& .css-1v2uejr": {
                                top: 65,
                                borderRadius: 0
                            },
                            "& .css-919eu4": {
                                top: 65,
                                left: 226
                            }
                        }}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </Box>
    );
};

export default AppNotifications;
