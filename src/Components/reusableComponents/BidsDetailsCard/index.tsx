import * as React from "react";

import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import fuelIcon from "../../../Assets/fuelIcon.png";
import nextIcon from "../../../Assets/nextIcon.png";
import previewCar from "../../../Assets/previewCar.jpg";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleModel, handleProductImges } from "../../../Redux/Reducer";

const BidsDetailCard = ({ carList }: any) => {
    const dispatch = useAppDispatch();
    const { breakPoints, user } = useAppSelector((state) => state);
    const [image, setImage] = React.useState({ img: carList.VehiclePhoto[0], index: 0 });
    const [imageData, setImageData] = React.useState([]);
    const [view, setView] = React.useState(false);

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
    React.useEffect(() => {
        setImageData(carList.VehiclePhoto);
    }, []);

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", // You can change this to the desired currency
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(carList.RDPrice);

    const handleImage = (data: any, ind: any) => {
        const imgObj = {
            images: data,
            index: ind.index
        };
        dispatch(handleProductImges(imgObj));
        dispatch(handleModel({ open: true, type: "ProductImage" }));
    };
    return (
        <Card sx={{ width: "100%", display: "flex", flexDirection: breakPoints?.sm ? "row" : "column", boxShadow: " 0px 1px 3px 0px #fff" }}>
            <Box
                sx={{
                    height: breakPoints?.sm ? (user?.DealerID !== carList.DealerID ? "auto" : 300) : 180,
                    width: breakPoints?.sm ? "40%" : "100%"
                }}
            >
                <CardMedia
                    image={image.img?.match(regex) || carList?.VehiclePhoto[0]?.match(regex) || previewCar}
                    title="car"
                    sx={{ height: breakPoints?.sm ? "70%" : 180, width: "100%", borderRadius: 4 }}
                    onClick={() => image.img?.match(regex) && handleImage(imageData, image)}
                />
                <Box
                    sx={{
                        width: "auto",
                        height: "30%",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center"
                    }}
                >
                    {imageData?.map((img: any, i: any) => {
                        if (i < 3 && img.match(regex)) {
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
                        if (i > 2 && i < 4 && img.match(regex)) {
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
            </Box>
            <CardContent
                sx={{
                    padding: "0px",
                    paddingLeft: breakPoints?.sm ? "40px !important" : "0px",
                    width: breakPoints?.sm ? "45%" : "100%",
                    marginTop: breakPoints?.sm ? "0px" : "50px"
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#393939" }} component="div">
                        {`${carList?.Year} ${carList?.Make} ${carList?.Model}`}
                    </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "medium", color: "#5318A3" }}>
                    Price: {carList.RDPrice === "Inquire for wholesale" ? carList.RDPrice : `USD ${formattedAmount}`}
                </Typography>
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
                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.OdometerReading || "N/A"}</Typography>
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
                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.StockNo || "N/A"}</Typography>
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
                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.VIN || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.Year || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.Make || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.Model || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.Trim || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.Body || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.ExteriorColor || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.InteriorColor || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.Engine || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList.TransName || "N/A"}</Typography>
                            </Box>
                        </>
                    )}

                    <Button sx={{ color: "#0288D1" }} variant="text" onClick={() => setView(!view)}>
                        {view ? "View Less" : "View More"}
                    </Button>
                </Box>
                {user?.DealerID !== carList.DealerID && (
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
                        <Typography sx={{ color: "#393939", fontSize: "small", fontWeight: 800, paddingLeft: 2 }}>
                            {carList?.Dealers?.Name}
                        </Typography>
                        <Box>
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
                                {carList?.Dealers?.Address_1}
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
                                {carList?.Dealers?.MainContact?.First_Name} {carList?.Dealers?.MainContact?.Last_Name}
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
                                    <CallSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} />{" "}
                                    {carList?.Dealers?.MainContact?.Phone_No}
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
                                    <EmailSharpIcon sx={{ fontSize: "medium", margin: "5px", color: "#5318A3" }} />{" "}
                                    {carList?.Dealers?.MainContact?.Email}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: breakPoints?.sm ? "row" : "column" }} mt={2}>
                    <Box sx={{ display: "flex", justifyContent: breakPoints?.sm ? "flex-start" : "center", alignItems: "center", gap: 2 }}>
                        <Box>
                            <Typography variant="h5" sx={{ color: "#0CA000", fontWeight: 800 }}>
                                16
                            </Typography>
                            <Typography sx={{ fontWeight: 800, fontSize: "small" }}>CITY</Typography>
                        </Box>
                        <img src={fuelIcon} alt="fuelIcon" width={34} height={40} />
                        <Box>
                            <Typography variant="h5" sx={{ color: "#0CA000", fontWeight: 800 }}>
                                22
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
            </CardContent>
        </Card>
    );
};

export default BidsDetailCard;
