import * as React from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, CardMedia, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import API from "../../API";
import chatIcon from "../../Assets/chatIcon.png";
import previewCar from "../../Assets/previewCar.jpg";
import DialogBox from "../../Components/reusableComponents/Dailog";
import Select from "../../Components/reusableComponents/Select";
import { useAppSelector } from "../../Redux/hooks";

const MyBidsDetailCard = ({ MyBids, Inventory }: any) => {
    const { breakPoints, user, dealers } = useAppSelector((state) => state);
    const firstVehiclePhoto = Array.isArray(MyBids?.VehiclePhotos) ? MyBids?.VehiclePhotos[0] : null;
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
            Receiver_UserID: MyBids?.Dealers?.[0]?.MainContact?.UserID,
            Inventory_ID: Inventory?.Inventory_ID,
            BidsList: MyBids?.Bid_ID,
            Room_ID: Inventory?.Inventory_ID,
            IsGroupChat: false,
            CreatedBy: user?.Email,
            Sender_DealerID: dealership?.DealerID,
            Receiver_DealerID: MyBids?.Dealers?.[0]?.DealerID
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
        <Card sx={{ width: !breakPoints?.sm ? "100%" : 280, height: "100%" }}>
            <CardMedia sx={{ height: 180 }} image={firstVehiclePhoto ?? previewCar} title="car" />
            <CardContent sx={{ padding: "8px !important" }}>
                <Box mt={1}>
                    <Typography sx={{ fontWeight: 600, fontSize: "15px", color: "#393939", pl: 1 }} component="div">
                        {Inventory?.Year} {Inventory?.Make} {Inventory?.Model}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#393939", pl: 1 }}>
                        {/* {Inventory?.TransName ? `${Inventory?.TransName} • ` : `${Inventory?.TransName}`} {Inventory?.ExteriorColor} */}
                        {Inventory?.TransName ? `${Inventory?.TransName} • ` : ""}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#393939", pl: 1 }}>
                        {Inventory?.ExteriorColor}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "10px", marginBottom: "10px", gap: "6px" }}>
                    <Box
                        sx={{
                            textAlign: "center",
                            backgroundColor: "#F3F3F8",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }}
                    >
                        <Typography sx={{ fontSize: "10px", fontWeight: 500 }}>MILEAGE</Typography>
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                            {`${Inventory?.OdometerReading} - ${Inventory?.OdometerType === "Kilometers" ?? "-" ? "KM" : "MI"}`}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: "center",
                            backgroundColor: "#F3F3F8",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }}
                    >
                        <Typography sx={{ fontSize: "10px", fontWeight: 500 }}>STOCK#</Typography>
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>{Inventory?.StockNo ?? "-"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: "center",
                            backgroundColor: "#F3F3F8",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }}
                    >
                        <Typography sx={{ fontSize: "10px", fontWeight: 500 }}>VIN</Typography>
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>{Inventory?.VIN ?? "-"}</Typography>
                    </Box>
                </Box>
                <Typography sx={{ fontWeight: 800, color: "#393939", padding: "10px" }} component="div">
                    {MyBids?.Notes ?? "Inquire for wholesale"}
                </Typography>
                <Divider variant="middle" light />
                <Divider variant="middle" light />
                <Divider variant="middle" light />
                {MyBids?.Dealers?.map((item: any) => (
                    <>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#393939", p: 1, pl: 1.5 }} component="div">
                                DEALER DETAILS
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: "#393939", display: "flex", alignItems: "center", paddingLeft: 1.5 }}
                                component="div"
                            >
                                {item?.Name ?? "-"}
                            </Typography>
                            <Box pl={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ display: "flex", alignItems: " flex-start" }}>
                                    <LocationOnIcon sx={{ maxHeight: 15, mt: 0.4 }} />
                                    {item?.Address_1 ?? "-"}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box
                                sx={{
                                    marginTop: "10px",
                                    padding: "5px",
                                    backgroundColor: "#F3F3F8",
                                    fontWeight: 300,
                                    fontSize: "small",
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "center",
                                    width: "110px",
                                    margin: "8px",
                                    height: "70px"
                                }}
                            >
                                <Typography sx={{ color: "#393939", fontSize: "small", fontWeight: 500, mt: 1 }}>BID AMOUNT</Typography>
                                <Typography sx={{ color: "#393939", fontSize: "medium", fontWeight: 800 }}>
                                    US$ {`${Math.trunc(MyBids?.CurentPrice)}`}
                                </Typography>
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
                                    // Convert user and chatData to JSON strings
                                    // const jsonData = JSON.stringify(user);

                                    // Store the JSON strings in Local Storage under keys
                                    // localStorage.setItem("userData", jsonData);

                                    // Open a new tab
                                    if (DealershipData?.length > 1) {
                                        onOpen();
                                    } else {
                                        const chatObj = {
                                            Sender_UserID: user?.UserID,
                                            Receiver_UserID: MyBids.Dealers[0]?.MainContact?.UserID,
                                            Inventory_ID: Inventory?.Inventory_ID,
                                            BidsList: MyBids?.Bid_ID,
                                            Room_ID: Inventory?.Inventory_ID,
                                            IsGroupChat: false,
                                            CreatedBy: user?.Email,
                                            Sender_DealerID: DealershipData[0]?.DealerID,
                                            Receiver_DealerID: MyBids?.Dealers?.[0]?.DealerID
                                            // Sender_UserName: `${user?.First_Name} ${user?.Last_Name}`,
                                            // Receiver_UserName: `${item?.MainContact?.First_Name} ${item?.MainContact?.Last_Name}`,
                                        };
                                        if (user.RoleId !== 1 && user.RoleId !== 2) {
                                            await API.Chat.CreateChat(chatObj);
                                        }
                                        // sessionStorage.setItem("chatObj", JSON.stringify(chatObj));
                                        const newTab = window.open("chat", "_blank");

                                        if (newTab) {
                                            // Focus on the new tab
                                            newTab.focus();
                                        }
                                    }
                                }}
                            >
                                <Typography sx={{ display: "flex", justifyContent: "center" }}>
                                    <img src={chatIcon} alt="chat" style={{ color: "#5318A3" }} width={30} />
                                </Typography>
                                <Typography sx={{ fontSize: "small", fontWeight: 800 }}>CHAT NOW</Typography>
                            </Box>
                        </Box>
                    </>
                ))}
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

export default MyBidsDetailCard;
