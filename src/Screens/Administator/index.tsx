import React, { useEffect, useState } from "react";

import { Box, FormControl, Grid } from "@mui/material";

// import API from "../../API";
import Header from "../../Components/Header/Header";
import Select from "../../Components/reusableComponents/Select";
import TableComponent from "../../Components/reusableComponents/TableComponent";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleModel, handleUpdateRoadDealerAdmin } from "../../Redux/Reducer";
import { en } from "../../translate/en";

import { columns, tableDefaultSettingsforAdministrators } from "./Uitilities";

const Administrator = () => {
    const dispatch = useAppDispatch();
    const { RoadDealerAdmins, breakPoints, userLoader } = useAppSelector((state) => state);
    const [Admins, setAdmins] = React.useState<any>(RoadDealerAdmins);
    const [selectedRole, setSelectedRole] = React.useState<any>();
    const [searchData, setSearchData] = useState(Admins || []);
    const [filterStatusData, setFilterStatusData] = useState([]);
    const SelectOptions = [
        {
            value: 1,
            label: "Active"
        },
        {
            value: 0,
            label: "Inactive"
        }
    ];

    const handleRoleChange = async (role: any) => {
        setSelectedRole(role);
        if (role) {
            const filterData = Admins.length > 0 ? Admins : RoadDealerAdmins;
            const filterStatus = filterData?.filter((e: any) => Boolean(e.IsActive) === Boolean(role?.value));
            setAdmins(filterStatus);
            setFilterStatusData(filterStatus);
        } else {
            setAdmins(RoadDealerAdmins);
            setFilterStatusData(RoadDealerAdmins);
        }
    };
    const handleAddAdministrator = () => {
        setAdmins(RoadDealerAdmins);
        dispatch(handleUpdateRoadDealerAdmin({}));
        dispatch(handleModel({ open: true, type: "Administrator" }));
    };
    React.useEffect(() => {
        handleRoleChange(selectedRole);
    }, [selectedRole, RoadDealerAdmins]);

    useEffect(() => {
        setAdmins(searchData);
    }, [searchData]);

    useEffect(() => {
        setAdmins(RoadDealerAdmins);
    }, [RoadDealerAdmins]);

    return (
        <Box component="div">
            <Grid container spacing={1} mt={1.5} px={2}>
                <Header
                    title={en.administrators}
                    searchField
                    button
                    buttontext="ADD ADMINISTRATOR"
                    styles={{ paddingRight: 4, fontSize: 12 }}
                    handleClick={handleAddAdministrator}
                    data={filterStatusData.length > 0 ? filterStatusData : RoadDealerAdmins}
                    searchData={setSearchData}
                />
            </Grid>
            <Grid container spacing={1} px={3}>
                <Grid item xs={12} mt={2}>
                    <FormControl sx={{ minWidth: breakPoints?.sm ? 300 : 250, pl: 0.8 }}>
                        <Select
                            id={en.administrators}
                            value={selectedRole}
                            label={en.Select_Status}
                            onChange={(e: any) => handleRoleChange(e)}
                            list={SelectOptions}
                            placeHolderfontWeight={600}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Box component="div" width="100%" p={3}>
                <TableComponent
                    data={Admins}
                    columns={columns}
                    loading={userLoader?.loading}
                    tableHeader={en.Road_Dealer_Admins}
                    settings={tableDefaultSettingsforAdministrators}
                />
            </Box>
        </Box>
    );
};

export default Administrator;
