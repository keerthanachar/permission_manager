import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

import HeaderComponent from "../../Components/Header/Header";
import BidsDetailCard from "../../Components/reusableComponents/BidsDetailsCard";
import BidsMoreDetailsCard from "../../Components/reusableComponents/BidsDetailsCard/bidsCardDetails";
import Breadcrumb from "../../Components/reusableComponents/Breadcrumb";
import SortBy from "../../Components/reusableComponents/SortBy";
import { useAppSelector } from "../../Redux/hooks";
import { handleChatReply } from "../../Redux/Reducer";

const BidsCardDetails = () => {
    const { bidsCarDetails, ChatData, chatNotify, user } = useAppSelector((state) => state);
    const notificationRoomIds: any[] = (chatNotify?.chatObjects || []).filter(
        (e: any) => e?.Sender_UserId !== user?.UserID && e?.DealerID === user?.DealerID && e?.Inventory_ID === bidsCarDetails?.Inventory_ID
    );

    const dispatch = useDispatch();
    const [bidsDetails, setBidsDetails] = useState(bidsCarDetails?.Bids || []);
    const handleSortBy = (val: any) => {
        if (val === 0) {
            // Sort in ascending order
            // eslint-disable-next-line no-unsafe-optional-chaining
            const sortedBids = [...bidsCarDetails?.Bids].sort((a: any, b: any) => {
                const priceA = Number(a?.CurentPrice) || 0;
                const priceB = Number(b?.CurentPrice) || 0;

                return priceA - priceB;
            });

            setBidsDetails(sortedBids);
        } else if (val === 1) {
            // Sort in descending order
            // eslint-disable-next-line no-unsafe-optional-chaining
            const sortedBids = [...bidsCarDetails?.Bids].sort((a: any, b: any) => {
                const priceA = Number(a?.CurentPrice) || 0;
                const priceB = Number(b?.CurentPrice) || 0;

                return priceB - priceA;
            });

            setBidsDetails(sortedBids);
        } else {
            // Restore the original order
            setBidsDetails(bidsCarDetails?.Bids);
        }
    };

    useEffect(() => {
        setBidsDetails(bidsCarDetails?.Bids);
        dispatch(
            handleChatReply({
                ...ChatData,
                InventryID: bidsCarDetails?.Inventory_ID
            })
        );
    }, []);
    return (
        <Box m={2} mt={3}>
            <Grid container spacing={1}>
                <HeaderComponent
                    searchField
                    styles={{
                        paddingLeft: 2,
                        padding: 2,
                        paddingRight: 0.5,
                        fontWeight: 800
                    }}
                    backButton
                >
                    <Breadcrumb screen="Bid Management" title={`${bidsCarDetails?.Year} ${bidsCarDetails?.Make} ${bidsCarDetails?.Model}`} />
                </HeaderComponent>
            </Grid>
            <Box component={Paper} p={3} m={1} sx={{ borderRadius: 0, boxShadow: 0 }}>
                <Grid sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <Box>
                        <BidsDetailCard carList={bidsCarDetails} />
                    </Box>
                    <Box sx={{ display: " flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                            <SortBy onClick={handleSortBy} />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: "15px" }}>
                            {bidsDetails.map((details: any) => (
                                <BidsMoreDetailsCard BidsList={details} notificationRoomIds={notificationRoomIds} bidsCarDetails={bidsCarDetails} />
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};
export default BidsCardDetails;
