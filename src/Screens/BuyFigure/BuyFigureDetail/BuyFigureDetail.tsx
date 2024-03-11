import { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

import HeaderComponent from "../../../Components/Header/Header";
import Breadcrumb from "../../../Components/reusableComponents/Breadcrumb";
import BuyFigureDetailCard from "../../../Components/reusableComponents/BuyFigureDetailCard";
import { GetQuotesByBuyFigureId } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import UserDetailsForm from "./AddQuote";

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    const { buyFigureDetail } = useAppSelector((state) => state);
    const [productDetailsData, setProductDetailsData] = useState(buyFigureDetail);

    useEffect(() => {
        setProductDetailsData(buyFigureDetail);
    }, [buyFigureDetail]);
    useEffect(() => {
        dispatch(GetQuotesByBuyFigureId(buyFigureDetail?.BuyFigureList?.BuyFigure_ID));
    }, []);

    return (
        <Box m={2} mt={3}>
            <Grid container spacing={1}>
                <HeaderComponent
                    styles={{
                        paddingLeft: 2,
                        padding: 2,
                        paddingRight: 0.5
                    }}
                    backButton
                >
                    <Breadcrumb
                        screen="Product"
                        title={`${productDetailsData?.BuyFigureList.Year} ${productDetailsData?.BuyFigureList.Make} ${productDetailsData?.BuyFigureList.Model}`}
                    />
                </HeaderComponent>
            </Grid>
            <Box component={Paper} p={3} m={1} sx={{ borderRadius: 0, boxShadow: 0 }}>
                <Grid sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <Box>
                        <BuyFigureDetailCard carList={productDetailsData} />
                    </Box>
                </Grid>
            </Box>
            <Box component={Paper} p={3} m={1} sx={{ borderRadius: 0, boxShadow: 0 }}>
                <Grid sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <Box>
                        <UserDetailsForm />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};
export default ProductDetails;
