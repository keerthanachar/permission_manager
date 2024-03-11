import * as React from "react";
import { useNavigate } from "react-router-dom";

import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import previewCar from "../../../Assets/previewCar.jpg";
import RoutesEnum from "../../../Enums/Routes.enum";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { updateInventory } from "../../../Redux/Reducer";
import { convertoValueObject } from "../../../Screens/Inventory/AddInventory/Logics";

const InventoryListCar = ({ carList, handleCardClick, selectedInventoryIds }: any) => {
    const apiObjectValue: any = convertoValueObject(carList);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state);
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 5)?.[0];
    // eslint-disable-next-line const-case/uppercase
    const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg|bmp|ico|tiff|jfif|jfif-tbn|pjpeg|pjp|avif|apng)\??.*$/gim;
    const handleEdit = () => {
        dispatch(updateInventory(apiObjectValue));
        navigate(RoutesEnum.addInventory);
    };
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(carList.RDPrice);

    const targetDate = new Date(carList?.CreatedDate);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - targetDate.getTime();
    const stockInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return (
        <Grid
            container
            p={1}
            mt={2}
            style={{
                boxShadow: selectedInventoryIds?.some((item: any) => item.InventoryID === carList.Inventory_ID)
                    ? "0px 0px 10px 2px rgba(0, 0, 255, 0.5)"
                    : "0px 4px 8px rgba(0, 0, 0, 0.1)",
                border: selectedInventoryIds?.some((item: any) => item.InventoryID === carList.Inventory_ID)
                    ? "2px solid lightblue"
                    : "2px solid transparent"
            }}
            onClick={() =>
                handleCardClick?.({
                    InventoryID: carList.Inventory_ID,
                    IsPrivateNetwork: carList.IsPrivateNetwork ?? 0,
                    ModifiedBy: user.Email
                })
            }
        >
            <Grid item lg={5}>
                <Box>
                    <img
                        style={{ width: "90%", height: "120px", objectFit: "cover" }}
                        src={carList?.VehiclePhoto[0]?.match(regex) ? carList?.VehiclePhoto[0] : previewCar}
                        alt=""
                    />
                </Box>
                <Box>
                    <Box style={{ display: "flex", justifyContent: "space-between", marginTop: "1px" }}>
                        <Typography style={{ fontSize: "small" }}>
                            Days in stock :<Typography style={{ fontSize: "medium", fontWeight: 500 }}>{` ${stockInDays}`}</Typography>
                        </Typography>
                        <Typography style={{ fontSize: "small", fontWeight: 500 }}>
                            {stockInDays > carList?.Dealers?.AutoListDays && carList?.Dealers?.AutoListDays ? "Listed" : "Not Listed"}
                        </Typography>
                    </Box>
                </Box>
            </Grid>

            <Grid item lg={7}>
                <Typography sx={{ fontWeight: 600, color: "#393939", padding: "6px" }} component="div">
                    {carList?.Year ?? "-"} {carList?.Make ?? "-"} {carList?.Model ?? "-"}
                    {carList?.TransName ? `${carList?.TransName} ` : ""}
                    {carList?.ExteriorColor}
                </Typography>
                <Box style={{ display: "flex", justifyContent: "space-evenly", marginTop: "10px" }}>
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
                            {`${carList?.OdometerReading} - ${carList.OdometerType === "Kilometers" ?? "-" ? "KM" : "MI"}`}
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
                        <Typography style={{ fontSize: "10px", fontWeight: 600 }}>{carList?.StockNo ?? "-"}</Typography>
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
                        <Typography style={{ fontSize: "10px", fontWeight: 600 }}>{carList?.VIN ?? "-"}</Typography>
                    </Box>
                </Box>
                <Box m={2} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography style={{ fontWeight: 500, fontSize: carList.price === "Inquire for wholesale" ? "small" : "medium" }}>
                        {carList.RDPrice === "Inquire for wholesale"
                            ? carList.RDPrice
                            : carList.RDPrice?.length > 0
                            ? `USD ${formattedAmount}`
                            : "Inquire for Price"}
                    </Typography>
                    {screen?.IsEdit ? (
                        <Button
                            style={{
                                backgroundColor: "#5318A3",
                                color: "#ffff",
                                fontWeight: 300,
                                // "&:hover": {
                                //     background: "#f00"
                                // },
                                fontSize: "small",
                                borderRadius: "0px !important"
                            }}
                            onClick={() => handleEdit()}
                        >
                            EDIT DETAILS
                        </Button>
                    ) : null}
                </Box>

                {user?.DealerID === carList.DealerID ? (
                    <>
                        <hr style={{ marginTop: "10px", marginBottom: "10px", backgroundColor: "#DDDDDD", opacity: 0.4 }} />
                        <Box style={{ display: "flex", flexDirection: "column", gap: 0.5, paddingLeft: "6px" }}>
                            <Typography style={{ fontSize: "small", fontWeight: 500 }}>DEALER DETAILS</Typography>
                            <Typography style={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <PersonSharpIcon style={{ fontSize: "small", color: "#393939" }} /> {carList?.Dealers?.Name ?? "-"}
                            </Typography>
                            <Typography style={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <LocationOnIcon style={{ fontSize: "small", color: "#393939" }} />
                                {carList?.Dealers?.Address_1 ?? "-"}
                            </Typography>

                            <Typography
                                style={{
                                    fontWeight: 600,
                                    color: "#393939",
                                    fontSize: "small",
                                    display: "flex",
                                    alignItems: " center",
                                    gap: 0.5
                                }}
                                component="div"
                            >
                                <CallSharpIcon style={{ fontSize: "small", color: "#393939" }} /> {carList?.Dealers?.PhoneNo ?? "-"}
                            </Typography>
                            <Typography
                                style={{
                                    fontWeight: 600,
                                    color: "#393939",
                                    fontSize: "small",
                                    display: "flex",
                                    alignItems: " center",
                                    gap: 0.5
                                }}
                                component="div"
                            >
                                <EmailSharpIcon style={{ fontSize: "small", color: "#393939" }} /> {carList?.Dealers?.Email ?? "-"}
                            </Typography>
                        </Box>
                    </>
                ) : null}
            </Grid>
        </Grid>
    );
};

export default InventoryListCar;
