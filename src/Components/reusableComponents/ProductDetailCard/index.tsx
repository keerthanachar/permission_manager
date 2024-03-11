import * as React from "react";
import { format } from "date-fns";
import { useFormik } from "formik";
import { GiHomeGarage } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import API from "../../../API";
import chatIcon from "../../../Assets/chatIcon.png";
import fuelIcon from "../../../Assets/fuelIcon.png";
import nextIcon from "../../../Assets/nextIcon.png";
import previewCar from "../../../Assets/previewCar.jpg";
import RoutesEnum from "../../../Enums/Routes.enum";
import { GetBidByUserIdData } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleGarageData, handleModel, handleProductImges } from "../../../Redux/Reducer";
import { validateFormOnSubmit } from "../../../reusableFunctions/ReusableFunctions";
import DialogBox from "../Dailog";
import Select from "../Select";
// eslint-disable-next-line import/no-cycle
import HoC from "..";

import { productBidsForm } from "./Uitilities";

const ProductDetailCard = ({ carList }: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const { breakPoints, user, modal, dealers, myGarage } = useAppSelector((state) => state);
    const [image, setImage] = React.useState({ img: carList?.VehiclePhotos?.[0], index: 0 });
    const [imageData, setImageData] = React.useState([]);
    const [view, setView] = React.useState(false);
    const [addedToGarage, setAddedToGarage] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const [dealership, setDealership] = React.useState<any>(null);
    const onClose = () => {
        setConfirm(false);
    };
    const onOpen = () => setConfirm(true);
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
    const hadleImageChange = () => {
        const imageDataCopy = [...imageData];
        const firstElement = imageDataCopy.shift();

        if (firstElement) {
            imageDataCopy.push(firstElement);
            setImageData(imageDataCopy);
        }
        if (image.index !== 0) {
            setImage({ img: image.img, index: image.index - 1 });
        } else if (image.index === 0) {
            setImage({ img: imageDataCopy[0], index: 0 });
        }
    };
    const DealershipData = dealers
        ?.filter((ee: any) => user?.Dealers?.some((e: any) => e?.DealerID === ee?.DealerID))
        .map((a: any) => ({
            ...a,
            label: `${a?.Name}`,
            value: a?.DealerID
        }));
    const formikProps = useFormik({
        initialValues: {
            ...productBidsForm?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...user,
            Dealership: user?.RoleId === 4 ? DealershipData[0] : null
        },
        onSubmit: async (values: any) => {
            setLoading(true);
            const currentDate = new Date();
            const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");

            const addData = {
                ...values,
                Inventory_ID: carList.ProductList.Inventory_ID,
                ExpiryDate: formattedDate,
                Dealer_ID: values?.Dealership?.DealerID,
                InitialPrice: Number(carList.ProductList.RDPrice),
                CreatedBy: user.Email,
                CurentPrice: Number(values.CurentPrice),
                FirstName: values.First_Name,
                LastName: values.Last_Name,
                PhoneNumber: values.Phone_No
            };
            const res: any = await API.Bid.addBid(addData);
            formikProps.resetForm();
            if (res.data.Bid_ID) {
                await dispatch(GetBidByUserIdData(user.UserID));
                navigate(RoutesEnum.myBids);
                await dispatch(handleModel({ open: false }));
                setLoading(false);
            }
        },
        validate: (values: any) => {
            // eslint-disable-next-line no-console
            return validateFormOnSubmit(values, [productBidsForm]);
        }
    });
    React.useEffect(() => {
        setImageData(carList?.VehiclePhotos);
    }, []);

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // You can change this to the desired currency
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(carList?.ProductList?.RDPrice);

    const handleImage = (data: any, ind: any) => {
        const imgObj = {
            images: data,
            index: ind.index
        };
        dispatch(handleProductImges(imgObj));
        dispatch(handleModel({ open: true, type: "ProductImage" }));
    };
    // const chatObj = {
    //     Sender_UserID: user?.UserID,
    //     Receiver_UserID: carList?.Dealers?.[0]?.MainContact?.UserID,
    //     InventoryID: carList?.ProductList?.Inventory_ID,
    //     Sender_UserName: `${user.First_Name} ${user.Last_Name}`,
    //     Receiver_UserName: `${carList?.Dealers?.[0]?.MainContact?.First_Name} ${carList?.Dealers?.[0]?.MainContact?.Last_Name}`
    // };
    // dispatch(handleChatUsers(chatObj));
    // sessionStorage.setItem("chatObj", JSON.stringify(chatObj));
    const handleSelectDealership = async () => {
        const jsonData = JSON.stringify(user);

        // Store the JSON strings in Local Storage under keys
        localStorage.setItem("userData", jsonData);

        const chatObj = {
            Sender_UserID: user?.UserID,
            Receiver_UserID: carList?.Dealers?.[0]?.MainContact?.UserID,
            Inventory_ID: carList?.ProductList?.Inventory_ID,
            Room_ID: carList?.ProductList?.Inventory_ID,
            IsGroupChat: false,
            CreatedBy: user?.Email,
            Sender_DealerID: dealership?.DealerID,
            Receiver_DealerID: carList?.Dealers?.[0]?.DealerID
            //   Sender_UserName: `${user.First_Name} ${user.Last_Name}`,
            //   Receiver_UserName: `${carList?.Dealers?.[0]?.MainContact?.First_Name} ${carList?.Dealers?.[0]?.MainContact?.Last_Name}`,
        };

        await API.Chat.CreateChat(chatObj);

        sessionStorage.setItem("chatObj", JSON.stringify(chatObj));
        // Open a new tab
        setConfirm(false);
        const newTab = window.open("/chat", "_blank");

        if (newTab) {
            // Focus on the new tab
            newTab.focus();
        }
    };
    return (
        <Box component="form" onSubmit={formikProps.handleSubmit}>
            <Card sx={{ width: "100%", display: "flex", flexDirection: breakPoints?.sm ? "row" : "column", boxShadow: " 0px 1px 3px 0px #fff" }}>
                <Box
                    sx={{
                        height: breakPoints?.sm ? (user?.DealerID !== carList?.ProductList?.DealerID ? "auto" : 300) : 180,
                        width: breakPoints?.sm ? "55%" : "100%"
                    }}
                >
                    <CardMedia
                        image={image.img?.match(regex) || carList?.VehiclePhotos?.match(regex) || previewCar}
                        title="car"
                        sx={{ height: breakPoints?.sm ? "60%" : 180, width: "100%", borderRadius: 4 }}
                        onClick={() => image.img?.match(regex) && handleImage(imageData, image)}
                    />
                    <Box
                        sx={{
                            width: "auto",
                            height: "22%",
                            display: "flex",
                            gap: "8px",
                            alignItems: "center"
                        }}
                    >
                        {imageData?.map((img: any, i: any) => {
                            if (i < 5 && img.match(regex)) {
                                return (
                                    <CardMedia
                                        image={img}
                                        onClick={() => setImage({ img, index: i })}
                                        title="car"
                                        sx={{
                                            width: "100%",
                                            height: "55%",
                                            objectFit: "cover",
                                            borderRadius: 4,
                                            border: image.index === i ? "2px solid #A462FF" : "none",
                                            transition: "0.5s"
                                        }}
                                    />
                                );
                            }
                            if (i > 2 && i < 6 && img.match(regex)) {
                                return (
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "55%",
                                            objectFit: "cover",
                                            borderRadius: 4,
                                            border: image.index === i ? "2px solid #A462FF" : "none",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundImage: ` linear-gradient(
                                        #c9cacb5b, 
                                        #c9cacb5b
                                      ), url('${img}')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            transition: "0.5s"
                                        }}
                                        onClick={hadleImageChange}
                                    >
                                        <img
                                            src={nextIcon}
                                            alt="nextIcon"
                                            width="35%"
                                            style={{ backgroundColor: "#0303038a", borderRadius: "50%", color: "white" }}
                                        />
                                    </Box>
                                );
                            }
                            return null;
                        })}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: breakPoints?.sm ? "row" : "column",
                            width: "80%",
                            margin: "auto"
                        }}
                        mt={2}
                    >
                        <Box sx={{ display: "flex", justifyContent: breakPoints?.sm ? "flex-start" : "center", alignItems: "center", gap: 1 }}>
                            <Box>
                                <Typography variant="h5" sx={{ color: "#0CA000", fontWeight: 800 }}>
                                    {carList?.ProductList?.City_MPG ?? "-"}
                                </Typography>
                                <Typography sx={{ fontWeight: 800, fontSize: "small" }}>CITY</Typography>
                            </Box>
                            <img src={fuelIcon} alt="fuelIcon" width={34} height={40} />
                            <Box>
                                <Typography variant="h5" sx={{ color: "#0CA000", fontWeight: 800 }}>
                                    {carList?.ProductList?.Highway_MPG ?? "-"}
                                </Typography>
                                <Typography sx={{ fontWeight: 800, fontSize: "small" }}>HWY</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ width: breakPoints?.sm ? "70%" : "100%" }}>
                            <Typography sx={{ fontWeight: 600, fontSize: "small", width: "100%" }}>
                                * Actual rating will vary with options, driving conditions, habits and vehicle condition.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <CardContent
                    sx={{
                        padding: "0px",
                        paddingLeft: breakPoints?.sm ? "20px !important" : "0px",
                        width: breakPoints?.sm ? "44%" : "100%",
                        marginTop: breakPoints?.sm ? "0px" : "50px"
                    }}
                >
                    {modal?.type === "MyGarageProduct" && modal?.open && (
                        <Box display="flex" justifyContent="end">
                            <IconButton onClick={() => dispatch(handleModel({ open: false }))}>
                                <HighlightOffRoundedIcon />
                            </IconButton>
                        </Box>
                    )}
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#393939" }} component="div">
                            {`${carList?.ProductList?.Year} ${carList?.ProductList?.Make} ${carList?.ProductList?.Model}`}
                        </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "medium", color: "#5318A3" }}>
                        Price: {carList?.ProductList.RDPrice === "Inquire for wholesale" ? carList?.ProductList.RDPrice : `USD ${formattedAmount}`}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                        {!(user?.RoleId === 1 || user?.RoleId === 2) && (
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
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: breakPoints?.sm ? "flex-start" : "center",
                            marginTop: "10px",
                            marginBottom: "10px",
                            gap: "8px",
                            flexWrap: "wrap"
                        }}
                    >
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
                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>MILEAGE (MILES)</Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.OdometerReading || "N/A"}</Typography>
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
                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>STOCK#</Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.StockNo || "N/A"}</Typography>
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
                            <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>VIN</Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.VIN || "N/A"}</Typography>
                        </Box>

                        {view && (
                            <>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>YEAR</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.Year || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>NAME</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.Make || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>MODEL</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.Model || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>TRIM</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.Trim || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>STYLE</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.Body || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>EXTERIOR</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.ExteriorColor || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>INTERIOR</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.InteriorColor || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>ENGINE</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.Engine || "N/A"}</Typography>
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
                                    <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>TRANS</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.ProductList.TransName || "N/A"}</Typography>
                                </Box>
                            </>
                        )}

                        <Button sx={{ color: "#0288D1" }} variant="text" onClick={() => setView(!view)}>
                            {view ? "View Less" : "View More"}
                        </Button>
                    </Box>
                    {user?.DealerID !== carList?.ProductList.DealerID && carList?.Dealers
                        ? carList?.Dealers?.map((item: any) => (
                              <Box sx={{ border: "2px solid #F3F3F8", borderRadius: 4, overflow: "hidden" }}>
                                  <Typography
                                      sx={{
                                          fontSize: "small",
                                          fontWeight: 600,
                                          backgroundColor: "#F3F3F8",
                                          textAlign: "center"
                                      }}
                                      py={1}
                                  >
                                      DEALER DETAILS
                                  </Typography>
                                  <Box sx={{ display: "flex" }}>
                                      <Box sx={{ width: "75%" }}>
                                          <Typography sx={{ color: "#393939", fontSize: "small", fontWeight: 800, paddingLeft: 2 }}>
                                              {item.Name}
                                          </Typography>

                                          <Typography
                                              sx={{
                                                  fontWeight: 600,
                                                  color: "#393939",
                                                  fontSize: "small",
                                                  display: "flex",
                                                  alignItems: " center",
                                                  paddingLeft: 1
                                              }}
                                          >
                                              <LocationOnIcon sx={{ fontSize: "small", margin: "5px", color: "#5318A3" }} />
                                              {item.Address_1 ?? "-"}
                                          </Typography>
                                          <Typography
                                              sx={{
                                                  fontWeight: 600,
                                                  color: "#393939",
                                                  fontSize: "small",
                                                  display: "flex",
                                                  alignItems: " center",
                                                  paddingLeft: 1
                                              }}
                                              component="div"
                                          >
                                              <PersonSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} />{" "}
                                              {`${item?.MainContact?.First_Name ?? ""} ${item?.MainContact?.Last_Name ?? ""}`}
                                          </Typography>
                                          <Box sx={{ display: "flex", flexDirection: breakPoints?.sm ? "row" : "column" }}>
                                              <Typography
                                                  sx={{
                                                      fontWeight: 600,
                                                      color: "#393939",
                                                      fontSize: "small",
                                                      display: "flex",
                                                      alignItems: " center",
                                                      paddingLeft: 1
                                                  }}
                                                  component="div"
                                              >
                                                  <CallSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} />
                                                  {item?.MainContact?.Phone_No}
                                              </Typography>
                                              <Typography
                                                  sx={{
                                                      fontWeight: 600,
                                                      color: "#393939",
                                                      fontSize: "small",
                                                      display: "flex",
                                                      alignItems: " center",
                                                      paddingLeft: 1
                                                  }}
                                                  component="div"
                                              >
                                                  <EmailSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} />
                                                  {item.MainContact?.Email}
                                              </Typography>
                                          </Box>
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
                                              width: "fit-content",
                                              height: "fit-content",
                                              margin: "10px",
                                              cursor: "pointer",
                                              borderRadius: "8px"
                                          }}
                                          onClick={async () => {
                                              if (DealershipData?.length > 1) {
                                                  onOpen();
                                              } else {
                                                  //   const jsonData = JSON.stringify(user);

                                                  // Store the JSON strings in Local Storage under keys
                                                  //   localStorage.setItem("userData", jsonData);

                                                  const chatObj = {
                                                      Sender_UserID: user?.UserID,
                                                      Receiver_UserID: carList?.Dealers?.[0]?.MainContact?.UserID,
                                                      Inventory_ID: carList?.ProductList?.Inventory_ID,
                                                      Room_ID: carList?.ProductList?.Inventory_ID,
                                                      IsGroupChat: false,
                                                      CreatedBy: user?.Email,
                                                      Sender_DealerID: DealershipData?.[0]?.DealerID,
                                                      Receiver_DealerID: carList?.Dealers?.[0]?.DealerID
                                                      //   Sender_UserName: `${user.First_Name} ${user.Last_Name}`,
                                                      //   Receiver_UserName: `${carList?.Dealers?.[0]?.MainContact?.First_Name} ${carList?.Dealers?.[0]?.MainContact?.Last_Name}`,
                                                  };
                                                  // eslint-disable-next-line no-console
                                                  console.log("chatObj ", chatObj);

                                                  if (user.RoleId !== 1 && user.RoleId !== 2) {
                                                      await API.Chat.CreateChat(chatObj);
                                                  }

                                                  sessionStorage.setItem("chatObj", JSON.stringify(chatObj));
                                                  // Open a new tab
                                                  const newTab = window.open("/chat", "_blank");

                                                  if (newTab) {
                                                      // Focus on the new tab
                                                      newTab.focus();
                                                  }
                                              }
                                              // Convert user and chatData to JSON strings
                                          }}
                                      >
                                          <Typography sx={{ display: "flex", justifyContent: "center" }}>
                                              <img src={chatIcon} alt="chat" style={{ color: "#5318A3" }} width="20px" />
                                          </Typography>
                                          <Typography sx={{ fontSize: "small", fontWeight: 800 }}>CHAT NOW</Typography>
                                      </Box>
                                  </Box>
                              </Box>
                          ))
                        : null}

                    {!(user?.RoleId === 1 || user?.RoleId === 2) && (
                        <Box mt={1}>
                            <HoC.GenerateForm
                                FormData={productBidsForm.map((e) =>
                                    e.Name === "Dealership" ? { ...e, List: DealershipData || e?.List, ReadOnly: user?.RoleId === 4 } : e
                                )}
                                FormikProps={formikProps}
                                lg={6}
                                xl={6}
                                md={6}
                                xs={12}
                                spacing={1}
                            />
                            <Box>
                                <Stack direction="row" justifyContent="center" spacing={2}>
                                    <Button
                                        variant="filled"
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "#5318A3",
                                            color: "#ffff",
                                            fontWeight: 500,
                                            "&:hover": {
                                                background: "#5318A3"
                                            },
                                            fontSize: "medium"
                                        }}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Submit Bid"}
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    )}
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
        </Box>
    );
};

export default ProductDetailCard;
