/* eslint-disable react/jsx-no-useless-fragment */
import * as React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Button, Chip, Grid, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import API from "../../API";
import previewCar from "../../Assets/previewCar.jpg";
import DialogBox from "../../Components/reusableComponents/Dailog";
import Select from "../../Components/reusableComponents/Select";
import RoutesEnum from "../../Enums/Routes.enum";
// import { GetBuyFigure } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleBuyFigureDetail, showAlert } from "../../Redux/Reducer";

const BuyFigureListDetails = ({ carList, handleUpdatedStatus, handleCardClick, selectedBuyFigure }: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { breakPoints, user } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [updateStatus, setUpdateStatus] = React.useState<any>("");
    const onClose = () => {
        setConfirm(true);
    };
    const onOpen = () => setConfirm(true);
    const IsSameUser = user?.UserID === carList?.UserID;
    // eslint-disable-next-line const-case/uppercase
    const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg|bmp|ico|tiff|jfif|jfif-tbn|pjpeg|pjp|avif|apng)\??.*$/gim;

    // const formattedAmount = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD", // You can change this to the desired currency
    //     minimumFractionDigits: 0,
    //     maximumFractionDigits: 0
    // }).format(carList.RDPrice);
    // const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 5)?.[0];
    const handleSeeDetails = async (data: any) => {
        dispatch(handleBuyFigureDetail(data));
        navigate(RoutesEnum.buyFigureDetails);
    };
    const BuyFigureStatus = [
        { value: 1, label: "Won" },
        { value: 2, label: "Missed" },
        { value: 3, label: "WholeSale" }
    ];
    const handleStatus = async () => {
        try {
            setLoading(true);
            const res: any = await API.BuyFigure.updateBuyFigureStatus({
                BuyFigure_ID: carList.BuyFigure_ID,
                Status: updateStatus?.label,
                ModifiedBy: user?.Email
            });
            if (res?.data.status) {
                dispatch(showAlert({ open: true, type: "success", message: "Buy Figure Status Updated Successfully", closeIcon: true }));
                setConfirm(false);
                setLoading(false);
                handleUpdatedStatus();
            }
        } catch (error) {
            setLoading(false);
            dispatch(showAlert({ open: true, type: "error", message: "error", closeIcon: true }));
        }
    };
    return (
        <Grid
            sx={{
                boxShadow: selectedBuyFigure?.some((item: any) => item.BuyFigure_ID === carList.BuyFigure_ID)
                    ? "0px 0px 10px 2px rgba(0, 0, 255, 0.5)"
                    : "0px 4px 8px rgba(0, 0, 0, 0.1)",
                border: selectedBuyFigure?.some((item: any) => item.BuyFigure_ID === carList.BuyFigure_ID)
                    ? "3px solid lightblue"
                    : "3px solid transparent"
            }}
            onClick={() =>
                IsSameUser
                    ? handleCardClick?.({
                          BuyFigure_ID: carList?.BuyFigure_ID,
                          IsPrivateNetwork: carList.IsPrivateNetwork ?? 0,
                          ModifiedBy: user?.Email
                      })
                    : null
            }
            container
            mt={2}
        >
            <Grid item lg={4} p={1}>
                <Box>
                    <img
                        style={{ width: "100%", height: "156px", objectFit: "cover" }}
                        src={carList?.VehiclePhoto?.[0]?.match(regex) ? carList?.VehiclePhoto?.[0] : previewCar}
                        alt=""
                    />
                </Box>
            </Grid>

            <Grid lg={4.5} p={1}>
                <Tooltip title={`${carList?.Year ?? "-"} ${carList?.Make ?? "-"} ${carList?.Model ?? "-"}`}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: "#393939",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            transition: "transform 0.5s ease-in-out",
                            display: "inline-block",
                            maxWidth: "100%"
                        }}
                        component="div"
                    >
                        {carList?.Year ?? "-"} {carList?.Make ?? "-"} {carList?.Model ?? "-"}
                    </Typography>
                </Tooltip>
                <Box sx={{ display: "flex", marginBottom: "8px", gap: 2 }}>
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
                        <Typography sx={{ fontSize: "10px", fontWeight: 500 }}>Trim</Typography>
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>{carList?.Trim ?? "-"}</Typography>
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
                <Box display="flex" justifyContent="space-between" mt={1} mb={2} flexWrap="wrap">
                    <Typography
                        sx={{
                            fontWeight: 800,
                            color: "#393939",
                            fontSize: "small",
                            display: "flex",
                            alignItems: " center",
                            gap: 0.5
                        }}
                    >
                        Status:
                        <span
                            style={{
                                color:
                                    carList?.Status === "Won"
                                        ? "green"
                                        : carList?.Status === "WholeSale"
                                        ? "orange"
                                        : carList?.Status === "Missed"
                                        ? "red"
                                        : ""
                            }}
                        >
                            {" "}
                            {carList?.Status ?? "  -"}{" "}
                        </span>
                    </Typography>
                    {user?.UserID === carList?.UserID && (
                        <Chip
                            label="Change Status"
                            size="small"
                            sx={{
                                cursor: "pointer"
                            }}
                            onClick={onOpen}
                        />
                    )}
                </Box>
                {/* <Divider style={{ marginTop: "10px", marginBottom: "10px", backgroundColor: "#DDDDDD", opacity: 0.4 }} /> */}

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        fullWidth
                        sx={{
                            padding: "5px",
                            backgroundColor: "#5318A3",
                            color: "#ffff",
                            fontWeight: 300,
                            "&:hover": {
                                background: "#f00"
                            },
                            fontSize: "small",
                            borderRadius: "1px !important"
                        }}
                        onClick={() => {
                            const obj = {
                                BuyFigureList: carList,
                                VehiclePhotos: carList?.VehiclePhoto
                                // Dealers: carList?.Dealers
                            };
                            handleSeeDetails(obj);
                        }}
                    >
                        SEE DETAILS
                    </Button>
                </Box>
            </Grid>
            <Grid lg={3.5} p={1}>
                <>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, paddingLeft: "6px" }}>
                        <Typography sx={{ fontSize: "small", fontWeight: 800 }}>CONTACT DETAILS</Typography>
                        <Typography sx={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                            <BadgeIcon sx={{ fontSize: "small", color: "#393939" }} />
                            {carList?.Name ?? "-"}
                        </Typography>
                        <Typography sx={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                            <PersonSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {`${carList?.First_Name} ${carList?.Last_Name}` ?? "-"}
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
                            <CallSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {carList?.PhoneNumber ?? "-"}
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
                            <EmailSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {carList?.Email ?? "-"}
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
                        >
                            <CalendarMonthIcon sx={{ fontSize: "small", color: "#393939" }} />{" "}
                            {carList?.CreatedDate ? format(new Date(carList?.CreatedDate), "MMM dd,yyyy") : ""}
                        </Typography>
                    </Box>
                </>
            </Grid>
            <DialogBox title="Select Buy Figure Status" open={confirm} onClose={onClose}>
                <Select
                    id="AssignStatus"
                    value={updateStatus}
                    placeHolder="Select Buy Figure Status"
                    onChange={(e: any) => setUpdateStatus(e)}
                    list={BuyFigureStatus ?? []}
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
                                setUpdateStatus(null);
                                setConfirm(false);
                            }}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        <Button onClick={handleStatus} disabled={!updateStatus || loading} variant="filled" sx={{ display: "flex" }}>
                            {loading ? "Updating..." : "Change Status"}
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
        </Grid>
    );
};

export default BuyFigureListDetails;
