import React from "react";

import { Box } from "@mui/material";

import TableComponent from "../../../../Components/reusableComponents/TableComponent";
import { useAppSelector } from "../../../../Redux/hooks";
import { tableDefaultSettingsforUsers, userListColumn } from "../Uitility";

const ExistingUserList = () => {
    const { updatedDealer, userLoader, dealerUsers } = useAppSelector((state) => state);
    const sortedData = [...dealerUsers].sort((a, b) => {
        if (a.RoleId === 3) return -1; // Put users with RoleId 3 (Dealer Admin) at the beginning
        if (b.RoleId === 3) return 1; // Put users with RoleId 3 (Dealer Admin) at the beginning
        return 0;
    });
    const columnsCreateUserList = userListColumn(sortedData, updatedDealer);

    return (
        <Box component="div" width="100%" py={2}>
            <TableComponent
                data={sortedData}
                columns={columnsCreateUserList}
                loading={userLoader?.loading}
                tableHeader={`${updatedDealer?.Name} Dealer User List`}
                settings={tableDefaultSettingsforUsers}
            />
        </Box>
    );
};

export default ExistingUserList;
