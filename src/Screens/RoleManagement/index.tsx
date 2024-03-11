import React from "react";

import { Box, Grid } from "@mui/material";

import Header from "../../Components/Header/Header";
import Select from "../../Components/reusableComponents/Select";
import TableComponent from "../../Components/reusableComponents/TableComponent";
import { config } from "../../config";
import { GetRoleDetailsByRoleId } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { en } from "../../translate/en";

import { RolemanagmentColumns, tableDefaultSettingsforRoleManagement } from "./Uitilities";

const RoleManagement = () => {
    const dispatch = useAppDispatch();
    const { Roles, RoleManagementData, rolesLoader } = useAppSelector((state) => state);
    const filterData = RoleManagementData?.filter((screen: any) => !config?.ScreenIds?.includes(screen?.Screen_Id) && screen.Screen_Id !== null);
    const [selectedRole, setSelectedRole] = React.useState<any>({ value: 2, label: "Road Dealer Admin" });
    const SelectOptions =
        [
            {
                value: 2,
                label: "Road Dealer Admin"
            },
            {
                value: 3,
                label: "Dealer Admin"
            },
            {
                value: 4,
                label: "Dealer Buyer/Seller"
            }
        ] || Roles;
    const columns = RolemanagmentColumns(selectedRole);
    const handleRoleChange = async (role: any) => {
        if (role) {
            try {
                await dispatch(GetRoleDetailsByRoleId(role.value));
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("error: ", error);
            }
        }
        setSelectedRole(role);
    };
    React.useEffect(() => {
        handleRoleChange(selectedRole);
    }, []);
    return (
        <Grid p={3}>
            <Grid container spacing={1}>
                <Header title={en.roleManagement} />
            </Grid>
            <Box component="div" width="100%" mt={1} px={3}>
                <Grid container spacing={1}>
                    <Grid item lg={3} xs={12}>
                        <Select
                            id="Roles"
                            value={selectedRole}
                            label={en.selectRole}
                            onChange={(e: any) => handleRoleChange(e)}
                            list={SelectOptions}
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <TableComponent
                            data={filterData}
                            columns={columns}
                            loading={rolesLoader?.loading}
                            tableHeader={en.roleManagement}
                            enableColumnResizing
                            settings={tableDefaultSettingsforRoleManagement}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default RoleManagement;
