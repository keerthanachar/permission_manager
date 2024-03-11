import React from "react";

// import CarIcon from "@mui/icons-material/DirectionsCar";
import EmojiTransportationOutlinedIcon from "@mui/icons-material/EmojiTransportationOutlined";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
// import LockResetIcon from "@mui/icons-material/LockReset";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import { ReactComponent as ManageAccountsIcon } from "../../../Assets/awesome-user-cog.svg";
import { ReactComponent as GroupsIcon } from "../../../Assets/awesome-users.svg";
import { ReactComponent as BidsIcon } from "../../../Assets/bids.svg";
import { ReactComponent as HomeIcon } from "../../../Assets/ionic-md-home.svg";
import { ReactComponent as LogoutIcon } from "../../../Assets/logout.svg";
import { ReactComponent as DealersIcon } from "../../../Assets/map-car-dealer.svg";
import GrGarageIcon from "../Icons/GrGarage";
import GrStorageIcon from "../Icons/GrStorage";
import RiAuctionLineIcon from "../Icons/RiAuctionLine";

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/dashboard",
        key: "home"
    },
    {
        title: "Administrators",
        icon: <GroupsIcon />,
        link: "/administrators"
    },
    {
        title: "Dealers",
        icon: <DealersIcon />,
        link: "/dealers",
        key: "dealers"
    },
    {
        title: "Role Management",
        icon: <ManageAccountsIcon />,
        link: "/rolemanagement",
        key: "rolemanagement"
    },
    {
        title: "Buy Figure",
        icon: <EmojiTransportationOutlinedIcon sx={{ width: "23px", height: "25px" }} />,
        link: "/buyfigure",
        key: "buyfigure"
    },
    {
        title: "Inventory",
        icon: <GrStorageIcon />,
        link: "/inventory",
        key: "inventory"
    },
    {
        title: "Product Details",
        icon: <InventoryOutlinedIcon sx={{ width: "23px", height: "30px" }} />,
        link: "/product",
        key: "product"
    },
    {
        title: "Bid Management",
        icon: <BidsIcon />,
        link: "/bids",
        key: "bids"
    },
    {
        title: "My Bids",
        icon: <RiAuctionLineIcon />,
        link: "/mybids",
        key: "mybids"
    },
    {
        title: "My Garage",
        icon: <GrGarageIcon />,
        link: "/mygarage",
        key: "mygarage"
    },
    {
        title: "Vehicle Requests",
        icon: <ForwardToInboxRoundedIcon sx={{ width: "23px", height: "30px" }} />,
        link: "/reachOutRequests",
        key: "reachOutRequests"
    },
    {
        title: "Private Networks",
        icon: <VerifiedUserOutlinedIcon sx={{ width: "23px", height: "33px" }} />,
        link: "/privatenetworks",
        key: "privateNetworks"
    }
];
export const Logout = [
    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/dealers",
        key: "dealers"
    }
];

export const Notification = [
    {
        Name: "chetan",
        text: "Your car has been bid by Manu",
        date: "12/11/2023",
        time: "3:30 PM"
    },
    {
        Name: "Karthik",
        text: "Your car has been bid by chetan",
        date: "12/11/2023",
        time: "3:30 PM"
    },
    {
        Name: "Gokul",
        text: "Your car has been bid by Karthik",
        date: "12/11/2023",
        time: "3:30 PM"
    },
    {
        Name: "Krishna",
        text: "Your car has been bid by Gokul",
        date: "12/11/2023",
        time: "3:30 PM"
    }
];
