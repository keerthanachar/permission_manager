import React, { useState } from "react";

import { Box, Grid } from "@mui/material";

import Header from "../../Components/Header/Header";
import HoC from "../../Components/reusableComponents";
import {
    getAllUsers,
    GetChatNotificationByUserID,
    // GetChatNotificationByUserID,
    GetDashboardData,
    GetDealer,
    GetDealerUserByUserId,
    GetInventory,
    GetPrivateNetwork
    // GetMyGarageDetailsByUserId
} from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { DealCards } from "../HomePage/Uitilities";

const Dashboard = () => {
    const { user, dealers, dashboardData } = useAppSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const filterData: any = [];
    if (user?.RoleId !== 1 && user?.RoleId !== 2) {
        if (filterData && dealers) {
            filterData.push(...dealers.filter((ee: any) => ee.DealerID === user?.DealerID));
        }
    }
    const mergedData = dashboardData?.map((item: any, index: any) => ({
        ...item,
        cardIcon: DealCards?.[index]?.cardIcon
    }));

    const dashboardId: any = user?.RoleId === 1 || user?.RoleId === 2 ? null : user?.UserID;
    const getInitialApis = async () => {
        setLoading(true);
        await dispatch(GetDashboardData(dashboardId ?? null));
        await dispatch(GetChatNotificationByUserID(dashboardId));
        await dispatch(getAllUsers());
        await dispatch(GetDealer());
        await dispatch(GetPrivateNetwork());
        await dispatch(GetInventory(dashboardId ?? null));
        if (user?.UserID) {
            // await dispatch(GetMyGarageDetailsByUserId(user?.UserID));
            await dispatch(GetDealerUserByUserId(user?.UserID));
        }
        setLoading(false);
    };
    React.useEffect(() => {
        getInitialApis();
    }, []);
    window.history.pushState({}, document.title, window.location.href);

    return (
        <Box>
            {loading ? (
                <HoC.Spinner open={loading} />
            ) : (
                <Box>
                    <Grid container spacing={1} mt={2}>
                        <Header
                            title={`Hello, ${user?.Name ? user?.Name : `${user?.First_Name} ${user?.Last_Name}`}!`}
                            subtitle="Here's what's happening with Road Dealer today."
                            searchField
                            styles={{ color: "#494F55", fontWeight: 600 }}
                        />
                    </Grid>
                    <Box component="div" width="100%" height="62vh" mt={2} px={3.5}>
                        <Grid container spacing={1}>
                            <Grid item container width="100%" display="flex" justifyContent="flex-start" flexWrap="wrap" spacing={2}>
                                {mergedData?.map((card: any, index: number) => {
                                    return (
                                        <Grid item lg={3} md={6} sm={6} xs={12} key={index}>
                                            <HoC.Card
                                                cardTitle={card?.Title?.toUpperCase() ?? null}
                                                cardTitleStyle={{ color: "#666666" }}
                                                cardBody={card?.count ?? 0}
                                                cardAction={card?.Action ?? null}
                                                cardBodyStyle={{ fontWeight: 700, fontSize: 50, color: "#393939" }}
                                                cardIcon={card?.cardIcon}
                                                iconBackgroundColor={card?.Background_Color ?? null}
                                                path={card?.Path ?? null}
                                                screenId={card?.Screen_ID}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Dashboard;
