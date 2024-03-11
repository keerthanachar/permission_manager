import * as React from "react";

import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import previewCar from "../../../Assets/previewCar.jpg";

const BidManagementList = ({ carList, handleClick }: any) => {
    // eslint-disable-next-line const-case/uppercase
    const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg|bmp|ico|tiff|jfif|jfif-tbn|pjpeg|pjp|avif|apng)\??.*$/gim;

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(carList.RDPrice);

    return (
        <Grid container p={2} mt={2} style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
            <Grid item lg={5}>
                <Box>
                    <img
                        style={{ width: "100%", height: 140, objectFit: "cover" }}
                        src={carList?.VehiclePhoto[0]?.match(regex) ? carList?.VehiclePhoto[0] : previewCar}
                        alt=""
                    />
                </Box>
                <Box />
            </Grid>

            <Grid item lg={7} p={1}>
                <Typography style={{ fontWeight: 600, color: "#393939" }} component="div">
                    {`${carList?.Year} ${carList?.Make} ${carList?.Model}`} {carList?.TransName ? `${carList?.TransName}` : ""}
                    {`${carList?.ExteriorColor}`}
                </Typography>

                <Box style={{ display: "flex", marginTop: "5px", marginBottom: "5px", gap: "8px" }}>
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
                        <Typography style={{ fontSize: "10px", fontWeight: 700 }}>
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
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography style={{ fontWeight: 700, fontSize: "medium" }}>
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
                            style={{
                                width: "100%",
                                backgroundColor: "#5318A3",
                                color: "#ffff",
                                fontWeight: 600,
                                // "&:hover": {
                                //     background: "#5318A3"
                                // },
                                fontSize: "small"
                            }}
                            onClick={() => handleClick(carList)}
                        >
                            VIEW BIDS
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default BidManagementList;
