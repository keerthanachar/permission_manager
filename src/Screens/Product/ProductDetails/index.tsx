import { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

import HeaderComponent from "../../../Components/Header/Header";
import Breadcrumb from "../../../Components/reusableComponents/Breadcrumb";
import ProductDetailCard from "../../../Components/reusableComponents/ProductDetailCard";
import TabsComponent from "../../../Components/reusableComponents/Tabs";
import { useAppSelector } from "../../../Redux/hooks";
import { tabsData } from "../Uitilities";

const ProductDetails = () => {
    const { productDetail } = useAppSelector((state) => state);
    const [productDetailsData, setProductDetailsData] = useState(productDetail);

    useEffect(() => {
        setProductDetailsData(productDetail);
    }, [productDetail]);
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
                        title={`${productDetailsData?.ProductList?.Year} ${productDetailsData?.ProductList?.Make} ${productDetailsData?.ProductList?.Model}`}
                    />
                </HeaderComponent>
            </Grid>
            <Box component={Paper} p={3} m={1} sx={{ borderRadius: 0, boxShadow: 0 }}>
                <Grid sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <Box>
                        <ProductDetailCard carList={productDetailsData} />
                    </Box>
                </Grid>
                <Box>
                    <TabsComponent
                        tabData={tabsData?.map((e: any) => ({
                            ...e,
                            content: productDetailsData?.ProductList?.Notes?.split("|")?.join(",") ?? "--"
                        }))}
                    />
                </Box>
            </Box>
        </Box>
    );
};
export default ProductDetails;
