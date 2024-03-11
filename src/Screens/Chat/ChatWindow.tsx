import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import { useParams } from "react-router-dom";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Avatar, FormControl, Input, Link } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { lighten, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import API from "../../API";
import { RolesData } from "../../config";
import { GetChatUserList } from "../../Redux/asyncThunk";
// import { getChatsByUserID } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleChatWindowView, handleSendMessage, showAlert } from "../../Redux/Reducer";
import { formatTimestamp, getFileUrl } from "../../reusableFunctions/ReusableFunctions";

import { ChatProps } from "./types";

const StyledMessageRow = styled("div")(({ theme }) => ({
    "&.contact": {
        "& .bubble": {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            "& .time": {
                marginLeft: 12
            }
        },
        "&.first-of-group": {
            "& .bubble": {
                borderTopLeftRadius: 20
            }
        },
        "&.last-of-group": {
            "& .bubble": {
                borderBottomLeftRadius: 20
            }
        }
    },
    "&.me": {
        paddingLeft: 40,

        "& .bubble": {
            marginLeft: "auto",
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            marginBottom: 10,
            "& .time": {
                justifyContent: "flex-end",
                right: 0,
                marginRight: 12
            }
        },
        "&.first-of-group": {
            "& .bubble": {
                borderTopRightRadius: 20
            }
        },

        "&.last-of-group": {
            "& .bubble": {
                borderBottomRightRadius: 20
            }
        }
    },
    "&.contact + .me, &.me + .contact": {
        paddingTop: 20,
        marginTop: 20
    },
    "&.first-of-group": {
        "& .bubble": {
            borderTopLeftRadius: 20,
            paddingTop: 13
        }
    },
    "&.last-of-group": {
        "& .bubble": {
            borderBottomLeftRadius: 20,
            paddingBottom: 13,
            "& .time": {
                display: "flex"
            }
        }
    }
}));
function ChatWindow({ socket }: ChatProps) {
    const dispatch = useAppDispatch();
    const { user, SelectedUser, ChatMessageWindow } = useAppSelector((state) => state);
    const parameterValues = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const IsSuperAdmin = user.RoleId === RolesData.SuperAdmin.RoleId;
    const IsRdAdmin = user.RoleId === RolesData.RoadDealerAdmin.RoleId;

    // message Window Local States
    const [messageText, setMessageText] = React.useState<any>("");
    const [file, setFile] = React.useState<any>(null);
    const [loadingFile, setLoadingFile] = React.useState<any>();
    // function scrollToBottom() {
    //     if (!chatRef.current) {
    //         return;
    //     }
    //     chatRef.current.scrollTo({
    //         top: chatRef.current.scrollHeight,
    //         behavior: "smooth"
    //     });
    // }
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (!selectedFile) {
            setFile(null);
        }
        if (selectedFile) {
            // Check file type
            if (selectedFile.type === "image/png" || selectedFile.type === "image/jpeg") {
                setLoadingFile(true);
                try {
                    const fileResponse = await getFileUrl(selectedFile);
                    setFile(fileResponse);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error("Error uploading file:", error);
                    dispatch(showAlert({ open: true, type: "error", message: "Failed to upload file" }));
                } finally {
                    setLoadingFile(false);
                }
            } else {
                dispatch(showAlert({ open: true, type: "error", message: "Your file must have either a .png or .jpeg" }));
                setLoadingFile(false);
            }
        } else {
            setLoadingFile(false);
            event.target.files = null;
            // No file selected, clear the file state
            setFile(null);
        }
    };

    function isFirstMessageOfGroup(item: any, i: number) {
        return i === 0 || (ChatMessageWindow[i - 1] && ChatMessageWindow[i - 1].Sender_ID !== item.Sender_ID);
    }

    function isLastMessageOfGroup(item: any, i: number) {
        return i === ChatMessageWindow.length - 1 || (ChatMessageWindow[i + 1] && ChatMessageWindow[i + 1].Sender_ID !== item.Sender_ID);
    }

    // function onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
    //     setMessageText(ev.target.value);
    // }

    // function onMessageSubmit(ev: React.FormEvent<HTMLFormElement>) {
    //     ev.preventDefault();
    //     if (messageText === "") {
    //         return;
    //     }

    //     dispatch(
    //         sendMessage({
    //             messageText,
    //             contactId
    //         })
    //     ).then(() => {
    //         setMessageText("");
    //     });
    // }

    // if (!user || !chat || !selectedContact) {
    //     return <Error404Page />;
    // }
    const handleMesssage = async () => {
        try {
            const newMessageParams = {
                Chat_Users_ID: SelectedUser?.Chat_Users_ID,
                Sender_ID: user?.UserID,
                Message_Content: messageText ?? null,
                File: file?.Location ?? null,
                Message_DT: new Date(),
                Room_ID: SelectedUser?.Room_ID
                // Inventory_ID: SelectedReceiver?.Inventory_ID ?? ChatUsers?.InventoryID,
                // Bid_ID: SelectedReceiver?.BidID ?? ChatUsers?.BidID ?? null,
                // File: file?.Location ?? null,
                // Message: messageText ?? null,
                // Sender_UserId: user?.UserID,
                // UserName: `${user?.First_Name} ${user?.Last_Name}`,
                // Receiver_UserId: SelectedReceiver?.Receiver_UserId ?? ChatUsers?.Receiver_UserID,
                // IsSent: 1,
                // MessageDT: new Date()
            };
            socket.emit("send_message", newMessageParams);
            const res: any = await API.Chat.addMessage(newMessageParams);
            dispatch(GetChatUserList(user?.UserID));
            if (res?.status) {
                setMessageText("");
                setFile(null);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log("error");
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleMesssage();
        }
        if (e.key === "Backspace") {
            handleFileChange(e);
        }
    };
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
    React.useEffect(() => {
        socket.on("receive_message", (data) => {
            dispatch(handleSendMessage(data));
        });
    }, [socket]);
    // React.useEffect(() => {
    //     socket.emit("join_room", { RoomID: ChatUsers?.RoomID });
    // }, []);
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the last message when ChatMessageWindow changes
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [ChatMessageWindow]);
    return (
        <Box
            // className="w-full border-b-1"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light" ? lighten(theme.palette.background.default, 0.4) : lighten(theme.palette.background.default, 0.02),
                width: "100%",
                // borderBottom: 1,
                // py: 1.9,
                height: "60px"
            }}
        >
            <Toolbar
                sx={{ width: "100%", px: 16 }}
                // className="flex items-center justify-between w-full"
            >
                {screenWidth < 800 && (
                    <Box style={{ position: "absolute", left: "5%" }} onClick={() => dispatch(handleChatWindowView(false))}>
                        <ArrowBackIcon />
                    </Box>
                )}
                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                    {/* <IconButton aria-label="Open drawer" onClick={() => setMainSidebarOpen(true)} className="flex lg:hidden" size="large">
                            <FuseSvgIcon>heroicons-outline:chat</FuseSvgIcon>
                        </IconButton> */}

                    <div
                        className="flex items-center cursor-pointer"
                        // onClick={() => {
                        // setContactSidebarOpen(true);
                        // }}
                        // onKeyDown={() => null}
                        role="button"
                        tabIndex={0}
                    >
                        {/* <Avatar sx={{ bgcolor: "#000", height: 30, width: 30, fontWeight: "bold" }}>{user?.name?.split("")?.[0]}</Avatar> */}

                        <Avatar sx={{ bgcolor: "#ececec", position: "relative", height: 30, width: 30, fontWeight: "bold" }}>
                            <Typography fontWeight={700}>
                                {SelectedUser?.Chat_Users_List?.userName?.split("")?.[0] ?? parameterValues?.Receiver_UserName?.split("")?.[0] ?? ""}
                            </Typography>
                        </Avatar>
                        <Typography color="inherit" className="text-16 font-semibold px-4">
                            {SelectedUser?.Chat_Users_List?.userName ?? parameterValues?.Receiver_UserName ?? ""}
                        </Typography>
                    </div>
                </Box>
            </Toolbar>
            <div className="typeMessage ">
                <div>
                    <Box
                        component="div"
                        // ref={chatRef}
                        // className="flex flex-1 flex-col overflow-y-auto"
                        sx={{ display: "flex", flex: 0, flexDirection: "column", height: "80vh", overflow: "auto", scrollbarWidth: "smooth" }}
                        // ref={chatWindowRef}
                    >
                        {ChatMessageWindow?.length > 0 && SelectedUser?.Chat_Users_List?.UserID ? (
                            <div className="flex flex-col pt-16 px-16 pb-40">
                                {ChatMessageWindow?.map(
                                    (item: any, i: number) => (
                                        // item?.Chat_ID && (
                                        <StyledMessageRow
                                            key={i}
                                            ref={i === ChatMessageWindow.length - 1 ? lastMessageRef : null}
                                            className={clsx(
                                                "flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-4",
                                                item?.Sender_ID === user?.UserID ? "me" : "contact",
                                                { "first-of-group": isFirstMessageOfGroup(item, i) },
                                                { "last-of-group": isLastMessageOfGroup(item, i) },
                                                i + 1 === ChatMessageWindow?.length && "pb-96"
                                            )}
                                        >
                                            <div className="bubble flex relative items-center justify-center p-12 max-w-full">
                                                {item?.File ? (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "flex-end",
                                                            alignItems: "center",
                                                            borderRadius: 10,
                                                            paddingX: 2
                                                        }}
                                                    >
                                                        <img src={item?.File} style={{ width: 200, height: 100, borderRadius: 10 }} alt="file" />
                                                        <Link
                                                            href={item?.File}
                                                            download={item?.File}
                                                            style={{ color: "#000", textDecoration: "none", paddingLeft: 4 }}
                                                        >
                                                            <DownloadForOfflineIcon />
                                                        </Link>
                                                    </Box>
                                                ) : (
                                                    <Box>
                                                        <div className="leading-tight whitespace-pre-wrap">{item?.Message_Content}</div>
                                                    </Box>
                                                )}
                                                {(user?.RoleId === 3 || user?.RoleId === 4) && (
                                                    <Typography
                                                        className="time absolute hidden w-full text-11 mt-18 -mb-34 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap"
                                                        color="text.secondary"
                                                        sx={{ marginBottom: "-25px", left: 5, padding: 1 }}
                                                        fontSize={11}
                                                    >
                                                        {/* Uncomment the next line if you want to display a second Typography variant */}
                                                        {/* <Typography variant="body2" fontSize={12}></Typography> */}
                                                        {/* Uncomment the next line if you want to use formatDistanceToNow */}
                                                        {/* {formatDistanceToNow(new Date(item?.MessageDT), { addSuffix: true })} */}
                                                        {formatTimestamp(item?.Message_DT)}
                                                    </Typography>
                                                )}
                                                {item?.Sender_ID === user?.UserID && isFirstMessageOfGroup(item, i) && (
                                                    <Typography
                                                        className="time absolute hidden w-full text-11 mt-20  ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap"
                                                        color="text.secondary"
                                                        sx={{ marginBottom: "-45px", left: item?.IsRead ? -13 : 13, padding: 1 }}
                                                        fontSize={11}
                                                    >
                                                        {item?.IsRead ? "Seen" : "Delivered"}
                                                    </Typography>
                                                )}
                                            </div>
                                            {(user?.RoleId === 1 || user?.RoleId === 2) && (
                                                <Box sx={{ padding: 1 }}>
                                                    <Typography variant="body2" sx={{ display: "flex", flexDirection: "column" }} fontSize={11}>
                                                        {`${item?.UserName ?? ""}`}
                                                    </Typography>
                                                    <Typography variant="body2" fontSize={11}>
                                                        {formatTimestamp(item?.Message_DT ?? "-")}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </StyledMessageRow>
                                    )
                                    // )
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">Select a user to Chat</div>
                        )}
                    </Box>
                    <Box height="auto">
                        <Paper
                            square
                            // component="form"
                            // className="relative border-t-1 bottom-0 right-0 left-0 py-16 px-16"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? lighten(theme.palette.background.default, 0.4)
                                        : lighten(theme.palette.background.default, 0.02),
                                display: "flex",
                                alignItems: "flex-end",
                                width: "100%",
                                py: 1,
                                px: 2,
                                borderRadius: 0
                            }}
                            elevation={1}
                            // noValidate
                        >
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    // justifyContent: "space-between",
                                    alignItems: "center",
                                    position: "realtive",
                                    width: "100%"
                                }}
                                // className="flex items-center relative"
                            >
                                {/* <IconButton type="submit" size="small">
                                        Emoji
                                    </IconButton> */}
                                <FormControl>
                                    <IconButton sx={{ px: 3, cursor: "pointer" }} type="submit" size="large">
                                        <Input
                                            style={{ display: "none" }}
                                            id="file-input"
                                            type="file"
                                            hidden
                                            disabled={IsSuperAdmin || IsRdAdmin}
                                            onChange={handleFileChange}
                                            onKeyDown={handleKeyDown}
                                            // disabled={user?.RoleId === 1 || user?.RoleId === 2}
                                        />
                                        <label htmlFor="file-input">
                                            {/* <div> */}
                                            <AttachmentIcon sx={{ cursor: "pointer" }} />
                                            {/* </div> */}
                                        </label>
                                    </IconButton>
                                </FormControl>

                                <InputBase
                                    autoFocus={false}
                                    id="message-input"
                                    // className="flex-1 flex grow shrink-0 h-44 mx-8 px-16 border-2 rounded-full"
                                    placeholder={loadingFile ? "Uploading..." : "Type your message"}
                                    readOnly={loadingFile || IsSuperAdmin || IsRdAdmin}
                                    value={messageText || file?.key || ""}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        if (file?.key && newValue.length < file.key.length) {
                                            // Clear the content if the new value length is less than the file.key length
                                            setFile("");
                                        } else {
                                            setMessageText(newValue);
                                        }
                                    }}
                                    onKeyDown={messageText !== "" || file?.key ? handleKeyDown : () => {}}
                                    sx={{
                                        backgroundColor: "background.paper",
                                        height: "50px",
                                        borderRadius: 10,
                                        width: "100%",
                                        p: 2,
                                        cursor: loadingFile ? "not-allowed" : "none"
                                    }}
                                />
                                <IconButton type="submit" size="large" onClick={messageText !== "" || file?.key ? handleMesssage : () => {}}>
                                    <SendRoundedIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                </div>
            </div>
        </Box>
    );
}

export default ChatWindow;
