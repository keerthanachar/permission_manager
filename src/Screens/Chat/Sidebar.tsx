import React, { useMemo, useState } from "react";

import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import { Avatar, Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { lighten } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import API from "../../API";
import DialogBox from "../../Components/reusableComponents/Dailog";
import { GetChatUserList, GetMessageByChatUserId } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { showAlert } from "../../Redux/Reducer";

import ChatList from "./ChatList";
import { ChatProps } from "./types";

/**
 * The main sidebar.
 */
function Sidebar({ socket }: ChatProps) {
    const dispatch = useAppDispatch();
    const { user, ArchiveChats, SelectedUser, ChatUsersList } = useAppSelector((state) => state);

    // const parameterValues = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    // const InitialChat = [
    //     {
    //         Receiver_UserName: parameterValues?.Receiver_UserName,
    //         VehicleName: `${parameterValues?.year} ${parameterValues?.make} ${parameterValues?.model}`
    //     }
    // ];

    // const ReceiversList = ChatUserList?.length ? ChatUserList : InitialChat;
    // const [searchText, setSearchText] = useState("");

    // function handleSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    //     setSearchText(event.target.value);
    // }
    const [chatSortedList, setChatSortedList] = React.useState<any>([]);

    React.useEffect(() => {
        // Sort the ChatUsersList based on Message_DT and update chatSortedList state
        const sortedList: any = [...ChatUsersList].sort((a, b) => {
            const dateA = new Date(a.Message_DT);
            const dateB = new Date(b.Message_DT);
            return dateB.getTime() - dateA.getTime();
        });
        setChatSortedList(sortedList);
    }, [ChatUsersList]);

    const [confirm, setConfirm] = useState(false);
    const handleRemoveArchive = async (e: any) => {
        try {
            const res: any = await API.Chat.updateChatArchive({ ChatArchive_ID: e?.ChatArchive_ID, IsChatArchived: false });
            if (res?.status) {
                setConfirm(false);
                // dispatch(getChatsByUserID({ Sender_UserId: user?.UserID, Receiver_UserId: null }));
                await dispatch(GetMessageByChatUserId(SelectedUser?.Chat_Users_ID));
                await dispatch(GetChatUserList(user?.UserID));
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: "Chat is UnArchived successfully",
                        closeIcon: true
                    })
                );
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log("error: ", error);
        }
    };
    return (
        <Box
            component="div"
            sx={{ width: "550px", display: "flex", flexDirection: "column", flex: "auto", height: "80vh" }}
            // className="flex flex-col flex-auto h-full"
        >
            <Box
                // className="py-16 px-32 border-b-1"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? lighten(theme.palette.background.default, 0.4)
                            : lighten(theme.palette.background.default, 0.02),
                    py: 3,
                    px: 3,
                    borderBottom: 0
                }}
            >
                <Box component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    {user && (
                        <Box
                            component="div"
                            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            // onClick={() => setUserSidebarOpen(true)}
                            // onKeyDown={() => setUserSidebarOpen(true)}
                            role="button"
                            tabIndex={0}
                        >
                            {/* <UserAvatar className="relative" user={user} /> */}
                            <Avatar sx={{ bgcolor: "#ececec", position: "relative", height: 30, width: 30, fontWeight: "bold" }}>
                                <Typography fontWeight={700}>{user?.First_Name?.split("")?.[0]}</Typography>
                            </Avatar>
                            <Typography className="mx-16 font-medium" mx={2}>
                                {user?.First_Name ?? ""} {user?.Last_Name ?? ""}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {useMemo(
                    () => (
                        <Paper
                            elevation={0}
                            sx={{
                                width: "100%",
                                display: "flex",
                                paddingX: 16,
                                paddingY: 4,
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 3.2,
                                borderRadius: 15,
                                boxShadow: "none",
                                height: 5
                            }}
                            // className="flex p-4 items-center w-full px-16 py-4 border-1 h-40 rounded-full shadow-none"
                        >
                            <SearchSharpIcon fontSize="medium" />
                            <Input
                                placeholder="Search or start new chat"
                                // className="flex flex-1 px-8"
                                sx={{ display: "flex", flex: 1, px: 2 }}
                                disableUnderline
                                fullWidth
                                // value={searchText}
                                inputProps={{
                                    "aria-label": "Search"
                                }}
                                // onChange={handleSearchText}
                            />
                        </Paper>
                    ),
                    []
                )}
            </Box>

            <div>
                <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    {useMemo(() => {
                        // function getFilteredArray<T>(arr: T[], _searchText: string): T[] {
                        //     if (_searchText.length === 0) {
                        //         return arr;
                        //     }
                        //     return null;
                        // }

                        // const filteredContacts = getFilteredArray([...contacts], searchText);

                        // const filteredChatList = getFilteredArray([...chatListContacts], searchText);

                        // const container = {
                        //     show: {
                        //         transition: {
                        //             staggerChildren: 0.1
                        //         }
                        //     }
                        // };

                        // const item = {
                        //     hidden: { opacity: 0, y: 20 },
                        //     show: { opacity: 1, y: 0 }
                        // };

                        return (
                            <Box
                                sx={{
                                    display: "flex",
                                    background: "#fff",
                                    flexDirection: "column",
                                    flexShrink: 0,
                                    height: "80vh",
                                    overflow: "auto"
                                }}
                                // className="flex flex-col shrink-0"
                            >
                                {/* {filteredChatList.length > 0 && ( */}
                                <div>
                                    <Typography className="font-xl text-20 px-32 py-10" color="secondary.main">
                                        Chats
                                    </Typography>
                                </div>

                                {ArchiveChats && ArchiveChats?.length ? (
                                    <IconButton sx={{ borderRadius: 0 }}>
                                        <Box sx={{ width: "100%", display: "flex", px: 6, py: 2 }} onClick={() => setConfirm(true)}>
                                            <ArchiveOutlinedIcon />
                                            <Typography sx={{ px: 2 }}>Archived</Typography>
                                            <Typography sx={{ px: 10 }}>{ArchiveChats.length}</Typography>
                                        </Box>
                                    </IconButton>
                                ) : (
                                    ""
                                )}
                                {chatSortedList?.length > 0 &&
                                    chatSortedList
                                        ?.filter((item: any) => item?.Chat_Users_List !== undefined && item?.Chat_Users_List !== null)
                                        .map((chat: any) => (
                                            <Box component="div">
                                                <ChatList item={chat} socket={socket} />
                                            </Box>
                                        ))}
                            </Box>
                        );
                    }, [chatSortedList?.length, ArchiveChats?.length])}
                </List>
            </div>
            <DialogBox title="Archived Chats" open={confirm} onClose={() => setConfirm(false)}>
                <Box>
                    {ArchiveChats?.map((item: any) => (
                        <Box py={2} width="100%" display="flex" alignItems="center">
                            <Avatar sx={{ bgcolor: "#ececec", height: 40, width: 40 }}>
                                <Typography fontWeight={700}>
                                    {item?.Chat_Users_List?.userName?.split("")?.[0] ?? item?.First_Name?.split("")?.[0]}
                                </Typography>
                            </Avatar>
                            <Typography px={2}>{item?.Chat_Users_List?.userName}</Typography>
                            <IconButton onClick={() => handleRemoveArchive(item)}>
                                <UnarchiveOutlinedIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="filled" onClick={() => setConfirm(false)}>
                        Cancel
                    </Button>
                </Box>
            </DialogBox>
        </Box>
    );
}

export default Sidebar;
