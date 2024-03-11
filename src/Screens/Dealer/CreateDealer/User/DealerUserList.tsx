import React from "react";

import { Box } from "@mui/material";

import TableComponent from "../../../../Components/reusableComponents/TableComponent";
import { getAllUsersByDealerID } from "../../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";

import { getUsersColumn, tableDefaultSettingsforDealerUserList } from "./Uitility";

const DealerUserList = () => {
    const { updatedDealer, dealerUsers, userLoader } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
    }, []);
    const sortedData = [...dealerUsers].sort((a, b) => {
        if (a.RoleId === 3) return -1; // Put users with RoleId 3 (Dealer Admin) at the beginning
        if (b.RoleId === 3) return 1; // Put users with RoleId 3 (Dealer Admin) at the beginning
        return 0;
    });
    const columnsDealerList = getUsersColumn(sortedData, updatedDealer);
    return (
        <Box component="div" width="100%" py={2}>
            <TableComponent
                data={sortedData}
                columns={columnsDealerList}
                loading={userLoader?.loading}
                tableHeader={`${updatedDealer?.Name} Dealer User List`}
                settings={tableDefaultSettingsforDealerUserList}
            />
        </Box>
    );
};

export default DealerUserList;
