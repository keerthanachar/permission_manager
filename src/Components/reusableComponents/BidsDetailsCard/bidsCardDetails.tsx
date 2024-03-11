import * as React from "react";
import { format } from "date-fns";

import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import API from "../../../API";
import chatIcon from "../../../Assets/chatIcon.png";
import { useAppSelector } from "../../../Redux/hooks";
import DialogBox from "../Dailog";
import Select from "../Select";

const BidsMoreDetailsCard = ({ BidsList, bidsCarDetails }: any) => {
    const { breakPoints, user, dealers } = useAppSelector((state) => state);
    // eslint-disable-next-line no-console
    const [confirm, setConfirm] = React.useState(false);
    const [dealership, setDealership] = React.useState<any>(null);
    const onClose = () => {
        setConfirm(false);
    };
    const onOpen = () => setConfirm(true);
    const DealershipData = dealers
        ?.filter((ee: any) => user?.Dealers?.some((e: any) => e?.DealerID === ee?.DealerID))
        .map((a: any) => ({
            ...a,
            label: `${a?.Name}`,
            value: a?.DealerID
        }));
    const handleSelectDealership = async () => {
        const jsonData = JSON.stringify(user);

        // Store the JSON strings in Local Storage under keys
        localStorage.setItem("userData", jsonData);

        const chatObj = {
            Sender_UserID: user?.UserID,
            Receiver_UserID: BidsList?.UserID,
            Inventory_ID: bidsCarDetails?.Inventory_ID,
            BidsID: BidsList?.Bid_ID,
            Room_ID: bidsCarDetails?.Inventory_ID,
            IsGroupChat: false,
            CreatedBy: user?.Email,
            Sender_DealerID: dealership?.DealerID,
            Receiver_DealerID: BidsList?.BID_DEALER?.DealerID
            //   Sender_UserName: `${user.First_Name} ${user.Last_Name}`,
            //   Receiver_UserName: `${carList?.Dealers?.[0]?.MainContact?.First_Name} ${carList?.Dealers?.[0]?.MainContact?.Last_Name}`,
        };

        await API.Chat.CreateChat(chatObj);

        sessionStorage.setItem("chatObj", JSON.stringify(chatObj));
        // Open a new tab
        const newTab = window.open("/chat", "_blank");

        if (newTab) {
            // Focus on the new tab
            newTab.focus();
        }
    };

    return (
        <Card sx={{ width: 280, mb: 2 }}>
            <CardContent sx={{ padding: "0px !important" }}>
                <Typography sx={{ fontWeight: 600, color: "#393939", padding: "14px", backgroundColor: "#F3F3F8" }} component="div">
                    {BidsList?.BID_DEALER?.Name}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 1 }}>
                    <Typography sx={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: " flex-start", width: "50%" }}>
                        <LocationOnIcon sx={{ fontSize: "small", margin: "5px", color: "#5318A3" }} />
                        {BidsList?.BID_DEALER?.Address_1}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Box
                            sx={{
                                padding: "8px",
                                backgroundColor: "#DDDDDD",
                                color: "#000000",
                                flexDirection: "column"
                            }}
                        >
                            <Typography sx={{ fontWeight: 500, fontSize: "smaller" }}>BID DATE</Typography>
                            <Typography sx={{ fontWeight: 600 }}>{format(new Date(BidsList?.CreatedDate), "MM.dd.yyyy")}</Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Typography
                        sx={{ fontWeight: 600, color: "#393939", fontSize: "small", display: "flex", alignItems: " center", paddingLeft: 1 }}
                        component="div"
                    >
                        <PersonSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} />{" "}
                        {BidsList?.LastName ? `${BidsList.FirstName} ${BidsList?.LastName}` : `${BidsList.FirstName} `}
                    </Typography>
                    <Typography
                        sx={{ fontWeight: 600, color: "#393939", fontSize: "small", display: "flex", alignItems: " center", paddingLeft: 1 }}
                        component="div"
                    >
                        <CallSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} /> {BidsList.PhoneNo}
                    </Typography>
                    <Typography
                        sx={{ fontWeight: 600, color: "#393939", fontSize: "small", display: "flex", alignItems: " center", paddingLeft: 1 }}
                        component="div"
                    >
                        <EmailSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} /> {BidsList.Email}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box
                        sx={{
                            padding: "5px",
                            backgroundColor: "#F3F3F8",
                            fontWeight: 300,
                            fontSize: "small",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            width: "110px",
                            margin: "8px"
                        }}
                    >
                        <Typography sx={{ color: "#393939", fontSize: "small", fontWeight: 500 }}>BID AMOUNT</Typography>
                        <Typography sx={{ color: "#393939", fontSize: "medium", fontWeight: 800 }}>US$ {BidsList.CurentPrice}</Typography>
                    </Box>

                    <Box
                        sx={{
                            padding: "5px",
                            backgroundColor: "#F3F3F8",
                            fontWeight: 300,
                            fontSize: "small",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            width: "110px",
                            margin: "8px",
                            cursor: "pointer"
                        }}
                        onClick={async () => {
                            if (DealershipData?.length > 1) {
                                onOpen();
                            } else {
                                // Convert user and chatData to JSON strings
                                const jsonData = JSON.stringify(user);

                                // Store the JSON strings in Local Storage under keys
                                localStorage.setItem("userData", jsonData);

                                // Open a new tab
                                const chatObj: any = {
                                    Sender_UserID: user?.UserID,
                                    Receiver_UserID: BidsList?.UserID,
                                    Inventory_ID: bidsCarDetails?.Inventory_ID,
                                    VehicleName: `${bidsCarDetails.Year}, ${bidsCarDetails.Make} ,${bidsCarDetails.Model}`,
                                    BidID: BidsList?.Bid_ID,
                                    Room_ID: bidsCarDetails?.Inventory_ID,
                                    IsGroupChat: false,
                                    CreatedBy: user?.Email,
                                    Sender_DealerID: DealershipData[0]?.DealerID,
                                    Receiver_DealerID: BidsList?.BID_DEALER?.DealerID
                                    // Sender_UserName: `${user?.First_Name} ${user?.Last_Name}`,
                                    // Receiver_UserName: `${BidsList?.LastName}` ? `${BidsList?.FirstName} ${BidsList?.LastName}` : `${BidsList?.FirstName}`
                                };
                                if (user.RoleId !== 1 && user.RoleId !== 2) {
                                    await API.Chat.CreateChat(chatObj);
                                }
                                // sessionStorage.setItem("chatObj", JSON.stringify(chatObj));
                                const newTab = window.open("/chat", "_blank");

                                if (newTab) {
                                    // Focus on the new tab
                                    newTab.focus();
                                }
                            }
                        }}
                    >
                        <Typography sx={{ display: "flex", justifyContent: "center" }}>
                            <img src={chatIcon} alt="chat" style={{ color: "#5318A3" }} width="20px" />
                        </Typography>
                        <Typography sx={{ fontSize: "small", fontWeight: 800 }}>CHAT NOW</Typography>
                    </Box>
                </Box>
            </CardContent>
            <DialogBox title="Select Dealership to Chat" open={confirm} onClose={onClose}>
                <Select
                    id="DealerAssign"
                    value={dealership}
                    placeHolder="Select Dealership"
                    onChange={(e: any) => setDealership(e)}
                    list={DealershipData ?? []}
                />
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
                                setDealership(null);
                                setConfirm(false);
                            }}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        <Button onClick={handleSelectDealership} disabled={!dealership} variant="filled" sx={{ display: "flex" }}>
                            Chat Now
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
        </Card>
    );
};
export default BidsMoreDetailsCard;
