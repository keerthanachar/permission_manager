import * as React from "react";
import { GiHomeGarage } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import API from "../../../API";
import previewCar from "../../../Assets/previewCar.jpg";
import RoutesEnum from "../../../Enums/Routes.enum";
import { GetViewList } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleGarageData, handleModel, handleProductDetail } from "../../../Redux/Reducer";

const ProductCard = ({ carList }: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, myGarage } = useAppSelector((state) => state);
    const [addedToGarage, setAddedToGarage] = React.useState(false);
    let isCarInGarage: any;
    React.useEffect(() => {
        const filterGarage = () => {
            isCarInGarage = myGarage?.some((ee: any) => {
                return ee.InventoryID === carList?.ProductList?.Inventory_ID;
            });

            if (isCarInGarage) {
                setAddedToGarage(true);
            }
        };
        filterGarage();
    }, [myGarage, carList, setAddedToGarage]);
    // eslint-disable-next-line const-case/uppercase
    const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg|bmp|ico|tiff|jfif|jfif-tbn|pjpeg|pjp|avif|apng)\??.*$/gim;
    const handleSeeDetails = (data: any) => {
        dispatch(handleProductDetail(data));
        navigate(RoutesEnum.productDetails);
    };
    const handleViewProduct = async (data: any) => {
        const res: any = await API.Dealer.viewProducts(data);
        if (res?.data.status) {
            dispatch(GetViewList(user?.UserID));
        }
    };
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // You can change this to the desired currency
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(carList?.ProductList?.RDPrice);
    return (
        <Card sx={{ width: 280, height: "100%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <CardMedia
                sx={{ height: 180 }}
                image={carList?.VehiclePhotos?.[0]?.match(regex) ? carList?.VehiclePhotos?.[0] : previewCar}
                title="car"
            />
            <CardContent sx={{ padding: "8px !important" }}>
                <Typography sx={{ fontWeight: 600, color: "#393939", paddingLeft: "6px" }} component="div">
                    {carList?.ProductList?.Year} {carList?.ProductList?.Make} {carList?.ProductList?.Model}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "small", fontWeight: 600, paddingLeft: "6px" }} color="text.secondary">
                    {carList?.ProductList?.TransName ? `${carList?.ProductList?.TransName} ` : `${carList?.ProductList?.TransName}`}{" "}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "small", fontWeight: 600, paddingLeft: "6px" }} color="text.secondary">
                    {carList?.ProductList?.ExteriorColor}
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
                            {`${carList?.ProductList?.OdometerReading} - ${carList?.ProductList?.OdometerType === "Kilometers" ?? "-" ? "KM" : "MI"}`}
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
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>{carList?.ProductList?.StockNo ?? "-"}</Typography>
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
                        <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>{carList?.ProductList?.VIN ?? "-"}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "6px" }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "small" }}>
                        {carList?.ProductList.RDPrice === "Inquire for wholesale"
                            ? carList?.ProductList.RDPrice
                            : carList?.ProductList?.RDPrice?.length > 0
                            ? `USD ${formattedAmount}`
                            : "Inquire for Price"}
                    </Typography>

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
                            onClick={() => {
                                const obj = {
                                    ProductList: carList.ProductList,
                                    VehiclePhotos: carList?.VehiclePhotos,
                                    Dealers: carList?.Dealers
                                };
                                const view = {
                                    InventoryID: carList.ProductList.Inventory_ID,
                                    UserID: user.UserID,
                                    IsProductView: true,
                                    CreatedBy: user?.Email
                                };
                                if (!carList?.viewedProduct?.IsViewed) {
                                    handleViewProduct(view);
                                }
                                handleSeeDetails(obj);
                            }}
                        >
                            SEE DETAILS
                        </Button>
                    </Stack>
                </Box>

                {user?.DealerID !== carList?.ProductList.DealerID
                    ? carList?.Dealers?.map((item: any) => (
                          <>
                              <hr style={{ marginTop: "10px", marginBottom: "10px", backgroundColor: "#DDDDDD", opacity: 0.4 }} />
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, paddingLeft: "6px" }}>
                                  <Typography sx={{ fontSize: "small", fontWeight: 500 }}>DEALER DETAILS</Typography>
                                  <Typography sx={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                                      <PersonSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {item.Name ?? "-"}
                                  </Typography>
                                  <Typography sx={{ fontSize: "small", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                                      <LocationOnIcon sx={{ fontSize: "small", color: "#393939" }} />
                                      {item?.Address_1 ?? "-"}
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
                                      <CallSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {item.PhoneNo ?? "-"}
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
                                      <EmailSharpIcon sx={{ fontSize: "small", color: "#393939" }} /> {item.Email ?? "-"}
                                  </Typography>
                              </Box>
                          </>
                      ))
                    : null}
                <Box>
                    <hr style={{ marginTop: "10px", marginBottom: "10px", backgroundColor: "#DDDDDD", opacity: 0.4 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {!(user?.RoleId === 1 || user?.RoleId === 2) && (
                            <Box>
                                <Tooltip title="Add to Garage">
                                    <IconButton
                                        onClick={() => {
                                            dispatch(handleModel({ open: true, type: "AddToGarage" }));
                                            dispatch(handleGarageData(carList?.ProductList));
                                        }}
                                        disabled={addedToGarage}
                                        sx={{ backgroundColor: addedToGarage ? "#DC143C" : undefined, zIndex: 1 }}
                                    >
                                        {addedToGarage ? <Typography>In Garage</Typography> : <GiHomeGarage />}
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                        <Box>
                            <IconButton>
                                {user?.UserID === carList?.viewedProduct?.UserID && carList?.viewedProduct?.IsViewed ? (
                                    <Tooltip title="Viewed">
                                        <VisibilityIcon />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Not at Viewed">
                                        <VisibilityOffIcon />
                                    </Tooltip>
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
