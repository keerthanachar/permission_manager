import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "./Components/NavBar";
import HoC from "./Components/reusableComponents";
import SideBar from "./Components/reusableComponents/SideBar";
import RoutesEnum from "./Enums/Routes.enum";
// import RoutesEnum from "./Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { handleChatOpen, updateUser } from "./Redux/Reducer";
import Chat from "./Screens/Chat";
// import MainChat from "./Screens/InAppChat/ChatMain";
// import ChatApp from "./Screens/chat/ChatApp";
// import SocketIo from "./Screens/InAppChat/index";
import RoutesPage from "./Routes";

const App = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state);
    const { open } = useAppSelector((state: any) => state.modal);
    // eslint-disable-next-line no-console
    console.log("user: ", user);
    // eslint-disable-next-line no-console
    // console.log("socket: ", socket);
    const location = useLocation();

    // Access the path from location.pathname
    const currentPath = location.pathname;
    const dispatch = useAppDispatch();
    const userData: any = localStorage.getItem("user");
    React.useEffect(() => {
        dispatch(updateUser(JSON.parse(userData)));
        if (currentPath === "/chat") {
            dispatch(handleChatOpen({ open: true }));
        } else {
            navigate(RoutesEnum.dashboard);
        }
    }, [userData]);
    return (
        <Box component="div">
            {!user?.UserID && <NavBar />}
            {user?.UserID ? (
                currentPath !== "/chat" ? (
                    <SideBar menuData={user?.Screens}>
                        <RoutesPage />
                    </SideBar>
                ) : (
                    <Routes>
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                )
            ) : (
                <RoutesPage />
            )}
            {open && <HoC.Modal />}
        </Box>
    );
};

export default App;
