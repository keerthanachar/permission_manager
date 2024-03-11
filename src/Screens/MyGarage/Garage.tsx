import React, { useState } from "react";

import { Box, Grid } from "@mui/material";

import Header from "../../Components/Header/Header";
import HoC from "../../Components/reusableComponents";
import TableComponent from "../../Components/reusableComponents/TableComponent";
import { GetMyGarageDetailsByUserId, GetProducts } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

import { columns, tableDefaultSettingsforGarage } from "./Uitilities";

const Garage = () => {
    const { user, myGarage, GarageProductList, garageLoader } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const getApis = async () => {
        setLoading(true);
        if (user?.UserID) {
            await dispatch(GetProducts(user?.UserID ? user?.UserID : null));
            await dispatch(GetMyGarageDetailsByUserId(user?.UserID));
        }
        setLoading(false);
    };
    React.useEffect(() => {
        getApis();
    }, []);
    const mappedDetails = myGarage?.flatMap((garageItem: any) => {
        const productDetails = GarageProductList?.find((product: any) => product?.ProductList?.Inventory_ID === garageItem?.InventoryID);

        if (!myGarage || !garageItem || !productDetails) {
            return null;
        }

        return {
            YearMake: `${productDetails?.ProductList?.Year} ${productDetails?.ProductList?.Make}`,
            Photo: productDetails?.VehiclePhotos?.[0],
            RDPrice: productDetails?.ProductList?.RDPrice,
            Note: garageItem?.Note,
            Status: productDetails?.Dealers?.[0]?.IsDealerActive === 1 ? "Available" : "-",
            GarageID: garageItem?.GarageID,
            Product: { ...productDetails, garage: garageItem }
        };
    });

    const filteredDetails = mappedDetails?.filter((item: any) => item !== null);

    const sortedDetails = filteredDetails?.slice().sort((a: any, b: any) => b.GarageID - a.GarageID);

    return (
        <Box>
            {loading ? (
                <HoC.Spinner open={loading} />
            ) : (
                <Box component="div" width="90%" p={2} m={2}>
                    <Grid container spacing={1}>
                        <Grid container spacing={1} display="flex-end">
                            <Header
                                title="My Garage"
                                styles={{
                                    paddingLeft: 3,
                                    padding: 2,
                                    paddingRight: 1
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={12}>
                            <TableComponent
                                data={sortedDetails}
                                columns={columns}
                                loading={garageLoader?.loading}
                                enableTopToolbar={false}
                                enableColumnResizing
                                settings={tableDefaultSettingsforGarage}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default Garage;
