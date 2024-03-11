import * as React from "react";

import CallSharpIcon from "@mui/icons-material/CallSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Box, Button, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import API from "../../../API";
import chatIcon from "../../../Assets/chatIcon.png";
import nextIcon from "../../../Assets/nextIcon.png";
import previewCar from "../../../Assets/previewCar.jpg";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleModel, handleProductImges } from "../../../Redux/Reducer";
import DialogBox from "../Dailog";
import Select from "../Select";

const BuyFigureDetailCard = ({ carList }: any) => {
    const dispatch = useAppDispatch();
    const { breakPoints, user, modal, dealers } = useAppSelector((state) => state);
    const [image, setImage] = React.useState({ img: carList?.VehiclePhotos?.[0], index: 0 });
    const [imageData, setImageData] = React.useState([]);
    const [dealership, setDealership] = React.useState<any>(null);
    const [confirm, setConfirm] = React.useState(false);
    const onClose = () => {
        setConfirm(false);
    };

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
        setImageData(carList?.VehiclePhotos);
    }, []);
    const handleImage = (data: any, ind: any) => {
        const imgObj = {
            images: data,
            index: ind.index
        };
        dispatch(handleProductImges(imgObj));
        dispatch(handleModel({ open: true, type: "ProductImage" }));
    };
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
            Receiver_UserID: carList?.BuyFigureList?.UserID,
            Inventory_ID: null,
            Room_ID: carList?.BuyFigureList?.BuyFigure_ID,
            BuyFigure_ID: carList?.BuyFigureList?.BuyFigure_ID,
            IsGroupChat: false,
            CreatedBy: user?.Email,
            Sender_DealerID: dealership?.DealerID,
            Receiver_DealerID: carList?.BuyFigureList?.DealerID
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
        <Box component="form">
            <Card sx={{ width: "100%", display: "flex", flexDirection: breakPoints?.sm ? "row" : "column", boxShadow: " 0px 1px 3px 0px #fff" }}>
                <Box
                    sx={{
                        height: breakPoints?.sm ? (user?.DealerID !== carList?.BuyFigureList?.DealerID ? "auto" : 300) : 180,
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
                    />
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
                            {`${carList?.BuyFigureList?.Year} ${carList?.BuyFigureList?.Make} ${carList?.BuyFigureList?.Model}`}
                        </Typography>
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
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.OdometerReading || "N/A"}</Typography>
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
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.StockNo || "N/A"}</Typography>
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
                            <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.VIN || "N/A"}</Typography>
                        </Box>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.Year || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.Make || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.Model || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.Trim || "N/A"}</Typography>
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
                                <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>COLOR</Typography>
                                <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{carList?.BuyFigureList.Body || "N/A"}</Typography>
                            </Box>
                        </>
                    </Box>

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
                            Contact Info
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ width: "75%" }}>
                                <Typography sx={{ color: "#393939", fontSize: "small", fontWeight: 800, paddingLeft: 2 }}>
                                    {carList?.BuyFigureList?.Name ?? "-"}
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
                                    {`${carList?.BuyFigureList?.First_Name ?? ""} ${carList?.BuyFigureList?.Last_Name ?? ""}`}
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
                                        {carList?.BuyFigureList?.PhoneNumber ?? "-"}
                                    </Typography>
                                </Box>
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
                                    {carList?.BuyFigureList?.Email ?? "-"}
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
                                    width: "fit-content",
                                    height: "fit-content",
                                    margin: "10px",
                                    cursor:
                                        carList.BuyFigureList.UserID === user?.UserID || user?.Dealers?.includes(carList.BuyFigureList.DealerID)
                                            ? "not-allowed"
                                            : "pointer",
                                    borderRadius: "8px"
                                }}
                                onClick={
                                    carList.BuyFigureList.UserID === user?.UserID || user?.Dealers?.includes(carList.BuyFigureList.DealerID)
                                        ? () => null
                                        : handleSelectDealership
                                }
                            >
                                <Typography sx={{ display: "flex", justifyContent: "center" }}>
                                    <img src={chatIcon} alt="chat" style={{ color: "#5318A3" }} width="20px" />
                                </Typography>
                                <Typography sx={{ fontSize: "small", fontWeight: 800 }}>CHAT NOW</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
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
        </Box>
    );
};

export default BuyFigureDetailCard;
