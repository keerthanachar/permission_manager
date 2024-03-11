import * as React from "react";
import { useNavigate } from "react-router-dom";

import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import previewCar from "../../../Assets/previewCar.jpg";
import RoutesEnum from "../../../Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { updateInventory } from "../../../Redux/Reducer";
import { convertoValueObject } from "../../../Screens/Inventory/AddInventory/Logics";

const InventoryCard = ({ carList, handleCardClick, selectedInventoryIds }: any) => {
    const apiObjectValue: any = convertoValueObject(carList);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state);
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 5)?.[0];
    // eslint-disable-next-line const-case/uppercase
    const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg|bmp|ico|tiff|jfif|jfif-tbn|pjpeg|pjp|avif|apng)\??.*$/gim;
    const handleEdit = () => {
        // const Year = data.Year.toString();
        // const OEMCertified = data.OEMCertified === 1 ? "Yes" : "No";
        // const DealerCertified = data.DealerCertified === 1 ? "Yes" : "No";
        // const editData = { ...data, DealerCertified, OEMCertified, Year };
        dispatch(updateInventory(apiObjectValue));
        navigate(RoutesEnum.addInventory);
    };
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // You can change this to the desired currency
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(carList.RDPrice);

    const targetDate = new Date(carList?.CreatedDate);
    const currentDate = new Date();
    // Calculate the difference in milliseconds
    const timeDifference = currentDate.getTime() - targetDate.getTime();
    // Convert the difference to days
    const stockInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return (
        <Card
            sx={{
                width: 280,
                height: "100%",
                boxShadow: selectedInventoryIds?.some((item: any) => item.InventoryID === carList.Inventory_ID)
                    ? "0px 0px 10px 2px rgba(0, 0, 255, 0.5)"
                    : "0px 4px 8px rgba(0, 0, 0, 0.1)",
                border: selectedInventoryIds?.some((item: any) => item.InventoryID === carList.Inventory_ID)
                    ? "2px solid lightblue"
                    : "2px solid transparent"
            }}
            key={carList.Inventory_ID}
            onClick={() =>
                handleCardClick?.({
                    InventoryID: carList.Inventory_ID,
                    IsPrivateNetwork: carList.IsPrivateNetwork ?? 0,
                    ModifiedBy: user.Email
                })
            }
        >
            <CardMedia sx={{ height: 180 }} image={carList?.VehiclePhoto[0]?.match(regex) ? carList?.VehiclePhoto[0] : previewCar} title="car" />
            <CardContent sx={{ padding: "8px !important" }}>
                <Typography sx={{ fontWeight: 600, color: "#393939", paddingLeft: "6px" }} component="div">
                    {carList?.Year ?? "-"} {carList?.Make ?? "-"} {carList?.Model ?? "-"}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "small", fontWeight: 600, paddingLeft: "6px" }} color="text.secondary">
                    {carList?.TransName ? `${carList?.TransName} ` : ""}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "small", fontWeight: 600, paddingLeft: "6px" }} color="text.secondary">
                    {carList?.ExteriorColor}
                </Typography>
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
                            {`${carList?.OdometerReading} - ${carList.OdometerType === "Kilometers" ?? "-" ? "KM" : "MI"}`}
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
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>{carList?.StockNo ?? "-"}</Typography>
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
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>{carList?.VIN ?? "-"}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "6px" }}>
                    <Typography sx={{ fontWeight: 500, fontSize: carList.price === "Inquire for wholesale" ? "small" : "medium" }}>
                        {carList.RDPrice === "Inquire for wholesale"
                            ? carList.RDPrice
                            : carList.RDPrice?.length > 0
                            ? `USD ${formattedAmount}`
                            : "Inquire for Price"}
                    </Typography>
                    {/* user?.DealerID === carList.DealerID ---> only that dealer will get the edit */}
                    {screen?.IsEdit ? (
                        <Stack direction="row" spacing={2}>
                            <Button
                                sx={{
                                    padding: "5px",
                                    backgroundColor: "#5318A3",
                                    color: "#ffff",
                                    fontWeight: 300,
                                    "&:hover": {
                                        background: "#f00"
                                    },
                                    fontSize: "small",
                                    borderRadius: "0px !important"
                                }}
                                onClick={() => handleEdit()}
                            >
                                EDIT DETAILS
                            </Button>
                        </Stack>
                    ) : null}
                </Box>

                {user?.DealerID === carList.DealerID ? (
                    <>
                        <hr style={{ marginTop: "10px", marginBottom: "10px", backgroundColor: "#DDDDDD", opacity: 0.4 }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, paddingLeft: "6px" }}>
                            <Typography sx={{ fontSize: "small", fontWeight: 500 }}>DEALER DETAILS</Typography>
                            <Typography sx={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <PersonSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {carList?.Dealers?.Name ?? "-"}
                            </Typography>
                            <Typography sx={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <LocationOnIcon sx={{ fontSize: "small", color: "#393939" }} />
                                {carList?.Dealers?.Address_1 ?? "-"}
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: "#393939",
                                    fontSize: "small",
                                    display: "flex",
                                    alignItems: " center",
                                    gap: 0.5
                                }}
                                component="div"
                            >
                                <CallSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {carList?.Dealers?.PhoneNo ?? "-"}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: "#393939",
                                    fontSize: "small",
                                    display: "flex",
                                    alignItems: " center",
                                    gap: 0.5
                                }}
                                component="div"
                            >
                                <EmailSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {carList?.Dealers?.Email ?? "-"}
                            </Typography>
                        </Box>
                    </>
                ) : null}

                <Box>
                    <hr style={{ marginTop: "10px", marginBottom: "10px", backgroundColor: "#DDDDDD", opacity: 0.4 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "small" }}>
                            Days in stock :
                            <Typography component="span" sx={{ fontSize: "medium", fontWeight: 500 }}>
                                {` ${stockInDays}`}
                            </Typography>
                        </Typography>
                        <Typography sx={{ fontSize: "small", fontWeight: 500 }}>
                            {stockInDays > carList?.Dealers?.AutoListDays && carList?.Dealers?.AutoListDays ? "Listed" : "Not Listed"}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default InventoryCard;
