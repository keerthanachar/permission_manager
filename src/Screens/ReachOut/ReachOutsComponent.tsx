import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import HeaderComponent from "../../Components/Header/Header";
import Select from "../../Components/reusableComponents/Select";
import TableComponent from "../../Components/reusableComponents/TableComponent";
import { RolesData } from "../../config";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetReachoutData } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleFilterRequests } from "../../Redux/Reducer";
import { en } from "../../translate/en";

import { ReachOutColumns, tableDefaultSettingsforReachouts } from "./Uitilities";

const ReachOutsComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { ReachoutsData, reachOutLoader, dealers, user, FilteredRequests } = useAppSelector((state) => state);

    const TotalDelaersData = dealers?.filter((a: any) => a.IsDealerActive)?.map((e: any) => ({ label: e.Name, value: e.DealerID }));

    const IsSuperAdmin = user?.RoleId === RolesData?.SuperAdmin?.RoleId;
    const IsRDAdmin = user?.RoleId === RolesData?.RoadDealerAdmin?.RoleId;

    const [searchData, setSearchData] = React.useState(ReachoutsData ?? []);
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 12)?.[0];
    const userDealers =
        user?.RoleId === RolesData?.DealerBuyerOrSeller.RoleId
            ? [{ label: user?.Dealers?.Name, value: user?.Dealers?.DealerID }]
            : user?.Dealers?.map((e: any) => ({ label: e.Name, value: e.DealerID }));

    const [selectedDealer, setSelectedDealer] = React.useState(
        user?.RoleId === RolesData?.DealerBuyerOrSeller.RoleId ? { label: user?.Dealers[0]?.Name, value: user?.Dealers[0]?.DealerID } : null
    );

    const handleDealers = (e: any) => {
        setSelectedDealer(e);
        if (e) {
            const FilteredData = ReachoutsData?.filter((a: any) => a.DealerID === e?.value);
            dispatch(handleFilterRequests(FilteredData));
        } else {
            dispatch(handleFilterRequests(ReachoutsData));
        }
    };
    useEffect(() => {
        dispatch(GetReachoutData(IsSuperAdmin || IsRDAdmin ? null : user?.UserID));
    }, []);
    useEffect(() => {
        dispatch(handleFilterRequests(searchData));
    }, [searchData]);
    return (
        <Box component="div" width="100%" m={2} p={1}>
            <Grid container spacing={1} mt={2}>
                <HeaderComponent
                    title={en.Vehicle_Requests}
                    searchField
                    button={screen?.IsAdd}
                    buttontext="New Request"
                    handleClick={() => navigate(RoutesEnum.reachOut)}
                    styles={{
                        padding: 2,
                        paddingRight: 2
                    }}
                    data={ReachoutsData}
                    searchData={setSearchData}
                />
            </Grid>
            <Grid container spacing={1}>
                {user?.RoleId !== 4 && (
                    <Grid item lg={3} xs={12}>
                        <Select
                            id="Dealers"
                            readOnly={user?.RoleId === 4}
                            value={selectedDealer}
                            onChange={(e) => handleDealers(e)}
                            label="Select Dealer"
                            list={IsSuperAdmin || IsRDAdmin ? TotalDelaersData : userDealers}
                        />
                    </Grid>
                )}
                <Grid item xs={12} lg={12}>
                    <TableComponent
                        data={FilteredRequests?.length ? FilteredRequests : selectedDealer?.value ? FilteredRequests : ReachoutsData || []}
                        columns={ReachOutColumns ?? {}}
                        loading={reachOutLoader?.loading}
                        enableTopToolbar={false}
                        enableColumnResizing
                        settings={tableDefaultSettingsforReachouts}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReachOutsComponent;
