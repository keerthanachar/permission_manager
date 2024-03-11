import { useEffect, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box } from "@mui/system";

import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleModel } from "../../../Redux/Reducer";

const BuyFigureImageView = () => {
    const dispatch = useAppDispatch();
    const { BuyFigureImages } = useAppSelector((state) => state);
    const [productDetailsData, setProductDetailsData] = useState(BuyFigureImages.images);
    const [imageIndex, setImageIndex] = useState(BuyFigureImages.index);

    useEffect(() => {
        setProductDetailsData(BuyFigureImages.images);
    }, [BuyFigureImages]);

    const handleNext = () => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        if (imageIndex < productDetailsData?.length - 1) {
            const next = imageIndex + 1;
            setImageIndex(next);
        } else {
            setImageIndex(0);
        }
    };

    const handlePrevious = () => {
        if (imageIndex !== 0) {
            const next = imageIndex - 1;
            setImageIndex(next);
        } else {
            // eslint-disable-next-line no-unsafe-optional-chaining
            const lastImg = productDetailsData.length - 1;
            setImageIndex(lastImg);
        }
    };

    const handleClose = () => {
        dispatch(handleModel({ open: false }));
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${productDetailsData[imageIndex]})`,
                width: "70vw",
                height: "70vh",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <CancelOutlinedIcon onClick={handleClose} sx={{ backgroundColor: "white" }} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%"
                }}
            >
                <Box
                    sx={{
                        background: "#5f5f5f9c",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 1
                    }}
                    onClick={handlePrevious}
                >
                    <ArrowBackIosNewIcon sx={{ color: "white", width: "50px", height: "50px" }} />
                </Box>

                <Box
                    sx={{
                        background: "#5f5f5f9c",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 1
                    }}
                    onClick={handleNext}
                >
                    <ArrowForwardIosIcon sx={{ color: "white", width: "50px", height: "50px" }} />
                </Box>
            </Box>
        </Box>
    );
};

export default BuyFigureImageView;
