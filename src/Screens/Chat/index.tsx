import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { Box } from "@mui/material";

import { config } from "../../config";
import { GetChatUserList } from "../../Redux/asyncThunk";
// import { RolesData } from "../../config";
// import { getInitialChatsByUserID } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

const Chat = () => {
    const dispatch = useAppDispatch();
    const { user, chatWindowView } = useAppSelector((state) => state);
    const socket = io(config.API_BASE_URL, { transports: ["websocket", "polling"] });

    // const parameterValues = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    // const newUser = {
    //     Receiver_UserId: parameterValues?.UserID,
    //     Sender_UserId: user?.UserID,
    //     Receiver_UserName: parameterValues?.Receiver_UserName,
    //     Inventory_ID: parameterValues?.inventryid,
    //     Bid_ID: parameterValues?.bidid ?? null,
    //     IsChatArchived: null,
    //     ChatArchive_ID: null,
    //     VehicleName: `${parameterValues?.year} ${parameterValues?.make} ${parameterValues?.model}`,
    //     Chats: []
    // };
    // const ChatUser = user?.RoleId === RolesData.SuperAdmin.RoleId || user?.RoleId === RolesData.RoadDealerAdmin.RoleId ? null : user?.UserID;
    // const getInitialApis = async () => {
    //     const res: any = await dispatch(getInitialChatsByUserID({ Sender_UserId: ChatUser, Receiver_UserId: null }));
    //     const isNewUser = res?.payload?.data?.data?.filter((e: any) => e.Receiver_UserId === Number(newUser?.Receiver_UserId));
    //     if ((res.payload.data.data?.length < 1 || isNewUser < 1) && parameterValues?.viewChat !== "1") {
    //         dispatch(handleSelectedUserMessage({ User: newUser, initial: true }));
    //     }
    // };
    // const filteredData = ChatUserList?.map((chatUsersObject: any) => {
    //     const filteredUser = chatUsersObject?.Chat_Users_List?.find((item: any) => item.UserID !== user.UserID);
    //     return {
    //         ...chatUsersObject,
    //         Chat_Users_List: filteredUser || null // Replace with null or any default value if no user is found
    //     };
    // });

    // const storedState: any = JSON.parse(sessionStorage.getItem("chatObj") || "");
    React.useEffect(() => {
        const AccessId: any = user?.RoleId === 1 || user?.RoleId === 2 ? null : user?.UserID;
        // getInitialApis();
        // dispatch(getChatsByUserID({ Sender_UserId: user?.UserID, Receiver_UserId: storedState?.Receiver_UserID }))
        dispatch(GetChatUserList(AccessId));
    }, []);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // const [chatWindowVisible, setChatWindowVisible] = useState(false);

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
        <Box display="flex" flexDirection="column">
            <Box width="100%" display="flex">
                {!chatWindowView && <Sidebar socket={socket} />}
                {screenWidth > 800 && !chatWindowView && <ChatWindow socket={socket} />}
                {screenWidth < 800 && chatWindowView && <ChatWindow socket={socket} />}
            </Box>
        </Box>
    );
};
export default Chat;
