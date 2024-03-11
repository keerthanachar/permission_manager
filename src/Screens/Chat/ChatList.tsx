import React, { useEffect, useState } from "react";
import { isValid } from "date-fns";
import format from "date-fns/format";

import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { Avatar, IconButton, ListItem } from "@mui/material";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
// import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import API from "../../API";
import { RolesData } from "../../config";
import { GetChatUserList, GetMessageByChatUserId } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleChatWindowView, handleSelectedUserMessage, showAlert } from "../../Redux/Reducer";

import { ChatProps } from "./types";
/**
 * The chat list item.
 */
function ChatListItem({ item, socket }: ChatProps) {
    const dispatch = useAppDispatch();
    const { user, SelectedUser, ChatUsersList } = useAppSelector((state: any) => state);
    const IsSuperAdmin = user.RoleId === RolesData.SuperAdmin.RoleId;
    const IsRdAdmin = user.RoleId === RolesData.RoadDealerAdmin.RoleId;
    const handleArchive = async (e?: any) => {
        if (e?.ChatArchive_ID) {
            try {
                const res: any = await API.Chat.updateChatArchive({ ChatArchive_ID: e?.ChatArchive_ID, IsChatArchived: true });
                if (res?.status) {
                    // dispatch(getChatsByUserID({ Sender_UserId: user?.UserID, Receiver_UserId: null }));
                    await dispatch(GetChatUserList(user?.UserID));
                    dispatch(handleSelectedUserMessage(null));
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: "Chat is Archived successfully",
                            closeIcon: true
                        })
                    );
                }
            } catch (error: any) {
                // eslint-disable-next-line no-console
                console.log("error: ", error);
            }
        } else {
            try {
                const ArchiveParams = {
                    Chat_Users_ID: e?.Chat_Users_ID,
                    ArchiverUserID: user?.UserID,
                    ArchivedUserID: e?.Chat_Users_List?.UserID,
                    CreatedBy: user?.Email
                    // Chat_Id: e?.Chat_ID,
                    // DealerID: Number(e?.DealerShip) ?? e?.DealerID,
                    // InventoryID: e?.Inventory_ID,
                    // BidID: Number(e?.Bid_ID),
                    // ArchiverUserID: user?.UserID,
                    // ArchivedUserID: Number(item?.Receiver_UserId),
                };
                const res: any = await API.Chat.addChatArchive(ArchiveParams);
                if (res?.status) {
                    // dispatch(getChatsByUserID({ Sender_UserId: user?.UserID, Receiver_UserId: null }));
                    dispatch(GetMessageByChatUserId(SelectedUser?.Chat_Users_ID));
                    await dispatch(GetChatUserList(user?.UserID));

                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: "Chat is Archived successfully",
                            closeIcon: true
                        })
                    );
                }
            } catch (error: any) {
                // eslint-disable-next-line no-console
                console.log("error: ", error);
            }
        }
    };
    // const parsedDates = ChatUsersList.map((e: any) => ({
    //     ...e,
    //     CreatedDate: new Date(e.CreatedDate)
    // }));

    // parsedDates.sort((a: any, b: any) => b.CreatedDate - a.CreatedDate);

    // const latestData = parsedDates[0];
    useEffect(() => {
        dispatch(handleSelectedUserMessage(ChatUsersList));
        dispatch(GetMessageByChatUserId(ChatUsersList?.Chat_Users_ID));
    }, []);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenWidth]);

    return (
        <ListItem
            className="px-32 py-16"
            selected={item?.Chat_Users_List?.UserID === SelectedUser?.Chat_Users_List?.UserID && item?.Room_ID === SelectedUser?.Room_ID}
            sx={{ cursor: "pointer", borderBottom: "1px solid #E1E1E1" }}
        >
            <Avatar sx={{ bgcolor: "#ececec", height: 40, width: 40 }}>
                <Typography fontWeight="bold">{item?.Chat_Users_List?.userName?.split("")?.[0] ?? ""}</Typography>
            </Avatar>
            <ListItemText
                classes={{
                    root: "min-w-px px-10",
                    primary: "font-medium text-14",
                    secondary: "truncate"
                }}
                primary={`${item?.Chat_Users_List?.userName}` ?? ""}
                secondary={
                    <>
                        <Typography component="span" fontSize="small" color="text.primary" display="block" overflow="hidden">
                            {item?.Year && item.Make && item.Model ? `${item?.Year} ${item.Make} ${item.Model}` : item?.BR_VehicleName ?? ""}
                        </Typography>
                        {/* <Box maxWidth={30}>
                            <Typography component="span" variant="body2" color="skyblue" overflow="hidden">
                                {item?.Message_Content ?? "**"}
                            </Typography>
                        </Box> */}
                    </>
                }
                onClick={() => {
                    dispatch(handleSelectedUserMessage(item));
                    socket.emit("join_room", { Room_ID: item?.Room_ID });
                    if (screenWidth < 800) {
                        dispatch(handleChatWindowView(true));
                    }
                    // dispatch(getChatsByUserID({ Sender_UserId: item?.Sender_UserId, Receiver_UserId: item?.Receiver_UserId }));
                    dispatch(GetMessageByChatUserId(item?.Chat_Users_ID));
                }}
            />
            <ListItemText
                classes={{
                    root: "min-w-px px-16",
                    primary: "font-medium text-14",
                    secondary: "truncate"
                }}
                primary={
                    <>
                        <Typography component="span" fontSize="small" mt={1} color="text.primary" display="block" overflow="hidden">
                            {item?.Chat_Users_List?.DealerName ?? ""}
                        </Typography>
                        {/* <Box maxWidth={30}>
                            <Typography component="span" variant="body2" color="skyblue">
                                {item?.Message ?? "**"}
                            </Typography>
                        </Box> */}
                    </>
                }
                secondary={
                    <span style={{ fontSize: "small" }}>
                        {isValid(new Date(item?.MessageDT)) ? format(new Date(item?.MessageDT), "MMM d, yyyy") : format(new Date(), "MMM d, yyyy")}
                    </span>
                }
                onClick={() => {
                    dispatch(handleSelectedUserMessage(item));
                }}
            />
            {item?.Sender_UserId && (
                <div className="flex flex-col justify-center items-end">
                    {item?.LastChatDate && (
                        <Typography className="whitespace-nowrap mb-8 font-medium text-12" color="text.secondary">
                            {format(new Date(item?.LastChatDate), "PP")}
                        </Typography>
                    )}
                    {/* <div className="items-center">
                        {item?.muted && <IconButton>Volume</IconButton>}
                        {Boolean(item.IsRead) && (
                            <Box
                                sx={{
                                    backgroundColor: "secondary.main",
                                    color: "secondary.contrastText"
                                }}
                                className="flex items-center justify-center min-w-20 h-20 rounded-full font-medium text-10 text-center"
                            >
                                {item.IsRead}
                            </Box>
                        )}
                    </div> */}
                </div>
            )}
            {ChatUsersList?.length > 0 && (
                <IconButton disabled={IsSuperAdmin || IsRdAdmin} onClick={() => handleArchive(item)}>
                    <ArchiveOutlinedIcon />
                </IconButton>
            )}
        </ListItem>
    );
}

export default ChatListItem;
