import * as React from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import API from "../../API";
import chatIcon from "../../Assets/chatIcon.png";
import previewCar from "../../Assets/previewCar.jpg";
import DialogBox from "../../Components/reusableComponents/Dailog";
import Select from "../../Components/reusableComponents/Select";
import { useAppSelector } from "../../Redux/hooks";

const MyBidsDetailList = ({ MyBids, Inventory }: any) => {
    const { user, dealers } = useAppSelector((state) => state);
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
        };

        await API.Chat.CreateChat(chatObj);

        sessionStorage.setItem("chatObj", JSON.stringify(chatObj));

        const newTab = window.open("/chat", "_blank");

        if (newTab) {
            newTab.focus();
        }
    };

    return (
        <Grid container p={1} mt={2} style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
            <Grid item lg={4} spacing={1} p={1}>
                <Box>
                    <img style={{ width: "100%", height: 120, objectFit: "cover" }} src={firstVehiclePhoto ?? previewCar} alt="" />
                </Box>
                <Box style={{ display: "flex", marginTop: "10px", marginBottom: "10px", gap: "6px" }}>
                    <Box
                        style={{
                            textAlign: "center",
                            backgroundColor: "#F3F3F8",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }}
                    >
                        <Typography style={{ fontSize: "10px", fontWeight: 500 }}>MILEAGE</Typography>
                        <Typography style={{ fontSize: "10px", fontWeight: 600 }}>
                            {`${Inventory?.OdometerReading} - ${Inventory?.OdometerType === "Kilometers" ?? "-" ? "KM" : "MI"}`}
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            textAlign: "center",
                            backgroundColor: "#F3F3F8",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }}
                    >
                        <Typography style={{ fontSize: "10px", fontWeight: 500 }}>STOCK#</Typography>
                        <Typography style={{ fontSize: "10px", fontWeight: 600 }}>{Inventory?.StockNo ?? "-"}</Typography>
                    </Box>
                    <Box
                        style={{
                            textAlign: "center",
                            backgroundColor: "#F3F3F8",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }}
                    >
                        <Typography style={{ fontSize: "10px", fontWeight: 500 }}>VIN</Typography>
                        <Typography style={{ fontSize: "10px", fontWeight: 600 }}>{Inventory?.VIN ?? "-"}</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item lg={5.5} gap={2}>
                <Box mt={1}>
                    <Typography style={{ fontWeight: 600, fontSize: "15px", color: "#393939", paddingLeft: 1 }} component="div">
                        {Inventory?.Year} {Inventory?.Make} {Inventory?.Model} {Inventory?.TransName ? `${Inventory?.TransName} • ` : ""}
                        {Inventory?.ExteriorColor}
                    </Typography>
                </Box>

                <Box>
                    <Typography style={{ fontWeight: 800, color: "#393939", padding: "5px" }} component="div">
                        {MyBids?.Notes ?? "Inquire for wholesale"}
                    </Typography>
                    <Divider variant="middle" light />
                    <Divider variant="middle" light />
                    <Divider variant="middle" light />
                    {MyBids?.Dealers?.map((item: any) => (
                        <Box>
                            <Typography variant="body2" style={{ color: "#393939", padding: 1, paddingLeft: 1.5 }} component="div">
                                DEALER DETAILS
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{ color: "#393939", display: "flex", alignItems: "center", paddingLeft: 1.5 }}
                                component="div"
                            >
                                {item?.Name ?? "-"}
                            </Typography>
                            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 1.5 }}>
                                <Typography style={{ display: "flex", alignItems: " flex-start" }}>
                                    <LocationOnIcon style={{ maxHeight: 15, marginTop: 0.4 }} />
                                    {item?.Address_1 ?? "-"}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Grid>

            <Grid item lg={2.5} gap={2}>
                <Box>
                    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box
                            style={{
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
                            <Typography style={{ color: "#393939", fontSize: "small", fontWeight: 500, marginTop: 1 }}>BID AMOUNT</Typography>
                            <Typography style={{ color: "#393939", fontSize: "medium", fontWeight: 800 }}>
                                US$ {`${Math.trunc(MyBids?.CurentPrice)}`}
                            </Typography>
                        </Box>

                        <Box
                            style={{
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
                                    };
                                    if (user.RoleId !== 1 && user.RoleId !== 2) {
                                        await API.Chat.CreateChat(chatObj);
                                    }
                                    sessionStorage.setItem("chatObj", JSON.stringify(chatObj));
                                    const newTab = window.open("chat", "_blank");

                                    if (newTab) {
                                        newTab.focus();
                                    }
                                }
                            }}
                        >
                            <Typography style={{ display: "flex", justifyContent: "center" }}>
                                <img src={chatIcon} alt="chat" style={{ color: "#5318A3" }} width={30} />
                            </Typography>
                            <Typography style={{ fontSize: "small", fontWeight: 800 }}>CHAT NOW</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <DialogBox title="Select Dealership to Chat" open={confirm} onClose={onClose}>
                <Select
                    id="DealerAssign"
                    value={dealership}
                    placeHolder="Select Dealership"
                    onChange={(e: any) => setDealership(e)}
                    list={DealershipData ?? []}
                />
                <Box>
                    <Box style={{ display: "flex", gap: 1 }}>
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
                        <Button onClick={handleSelectDealership} disabled={!dealership} variant="filled" style={{ display: "flex" }}>
                            Chat Now
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
        </Grid>
    );
};

export default MyBidsDetailList;
