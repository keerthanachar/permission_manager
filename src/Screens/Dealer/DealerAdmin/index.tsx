import React from "react";

import { Box } from "@mui/material";

import TableComponent from "../../../Components/reusableComponents/TableComponent";
import { getAllUsersByDealerID } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import { columnsDealerAdminUserList, tableDefaultSettingsforDealerAdminList } from "./Uitility";

const DealerAdmin = () => {
    const dispatch = useAppDispatch();
    const { userLoader, user, MultiDealerUser } = useAppSelector((state) => state);
    React.useEffect(() => {
        dispatch(getAllUsersByDealerID(user?.UserID));
    }, []);
    return (
        <Box component="div" width="100%" p={4}>
            <TableComponent
                data={MultiDealerUser}
                loading={userLoader?.loading}
                columns={columnsDealerAdminUserList}
                tableHeader="User List"
                // tableHeader="User List"
                settings={tableDefaultSettingsforDealerAdminList}
            />
        </Box>
    );
};

export default DealerAdmin;
