import * as React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import previewCar from "../../../Assets/previewCar.jpg";

const BidManagementCard = ({ carList, handleClick }: any) => {
    // eslint-disable-next-line const-case/uppercase
    const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg|bmp|ico|tiff|jfif|jfif-tbn|pjpeg|pjp|avif|apng)\??.*$/gim;

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // You can change this to the desired currency
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(carList.RDPrice);
    return (
        <Card sx={{ width: 300, height: "100%" }}>
            <CardMedia sx={{ height: 180 }} image={carList?.VehiclePhoto[0]?.match(regex) ? carList?.VehiclePhoto[0] : previewCar} title="car" />
            <CardContent sx={{ padding: "10px !important" }}>
                <Typography sx={{ fontWeight: 600, color: "#393939" }} component="div">
                    {`${carList?.Year} ${carList?.Make} ${carList?.Model}`}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "small", fontWeight: 600, color: "#393939" }} color="text.secondary">
                    {carList?.TransName ? `${carList?.TransName}` : ""}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "small", fontWeight: 600, color: "#393939" }} color="text.secondary">
                    {`${carList?.ExteriorColor}`}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "10px", marginBottom: "10px", gap: "8px" }}>
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
                        <Typography sx={{ fontSize: "10px", fontWeight: 700 }}>
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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "medium" }}>
                        {carList?.RDPrice === "Inquire for wholesale"
                            ? carList?.RDPrice
                            : formattedAmount === "$0"
                            ? "INQUIRE FOR PRICE"
                            : `USD ${formattedAmount}`}
                    </Typography>
                </Box>
                <Box>
                    <Stack direction="row" justifyContent="center" spacing={2}>
                        <Button
                            variant="filled"
                            sx={{
                                width: "100%",
                                backgroundColor: "#5318A3",
                                color: "#ffff",
                                fontWeight: 600,
                                "&:hover": {
                                    background: "#5318A3"
                                },
                                fontSize: "small"
                            }}
                            onClick={() => handleClick(carList)}
                        >
                            VIEW BIDS
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BidManagementCard;
