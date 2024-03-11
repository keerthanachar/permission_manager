import * as React from "react";
import { Link } from "react-router-dom";

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useAppDispatch } from "../../../Redux/hooks";
import { handleModel } from "../../../Redux/Reducer";
import { en } from "../../../translate/en";

import { NavMenuProps } from "./types";

// eslint-disable-next-line const-case/uppercase
const drawerWidth = 500;
type Anchor = "top" | "left" | "bottom" | "right";
const SideMenu: React.FC<NavMenuProps> = ({ menuData, state, handleClose, showLogo, closeIcon, logo, notification = false }) => {
    const dispatch = useAppDispatch();
    const [selectedIndex, setSelectedIndex] = React.useState<any>();
    const handleIndex = (index: any, menuName: any) => {
        if (menuName === en.login) {
            dispatch(handleModel({ open: true, type: "Login" }));
        } else if (menuName === en.signUp) {
            dispatch(handleModel({ open: true, type: "Signup" }));
        }
        setSelectedIndex(index);
    };
    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : notification ? drawerWidth : 300 }}
            role="presentation"
            onClick={handleClose}
            onKeyDown={handleClose}
            borderRadius={0}
        >
            <Box display="flex">
                {closeIcon && (
                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <IconButton>
                            <HighlightOffRoundedIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {showLogo && (
                <>
                    <List sx={{ backgroundColor: "#101010" }}>
                        <Box component="div" display="flex" width="100%" justifyContent="center">
                            <img src={logo} alt="Logo" />
                        </Box>
                    </List>
                    <Divider />
                </>
            )}
            {menuData?.map((item: any, i: number) => (
                <>
                    <List sx={{ pl: 2 }} key={i}>
                        {item?.parentMenuText && (
                            <ListItem key={i} disablePadding>
                                <ListItemText
                                    sx={{
                                        color: "#948f8f"
                                    }}
                                    primary={item?.parentMenuText}
                                />
                            </ListItem>
                        )}
                        <ListItem key={item} disablePadding selected={selectedIndex === i}>
                            <ListItemButton component={Link} to={item?.menuPath} onClick={() => handleIndex(i, item.menuName)}>
                                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                                <ListItemText primary={item.menuName} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider orientation="horizontal" />
                </>
            ))}
        </Box>
    );

    return (
        <Box component="div">
            {(["left", "right", "top", "bottom"] as const).map((anchor, i: any) => (
                <React.Fragment key={i}>
                    <Drawer key={i} anchor={anchor} open={state[anchor]} onClose={handleClose}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </Box>
    );
};
export default SideMenu;
