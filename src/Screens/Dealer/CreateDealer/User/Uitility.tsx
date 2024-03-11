import { format } from "date-fns";
import { MRT_ColumnDef } from "material-react-table";

import { Box, Typography } from "@mui/material";

import { config } from "../../../../config";

import Actions from "./Actions";

export const getUsersColumn = (users?: any, updatedDealer?: any) => {
    const columnsDealerList = [
        {
            accessorKey: "CreatedDate",
            header: "Created Date (YYYY/DD/MM)",
            Cell: (rowData: any) => (
                <Typography style={{ whiteSpace: "pre-line" }}>
                    {format(new Date(rowData?.row?.original?.CreatedDate), config?.dateFormat)}
                </Typography>
            )
        },
        {
            accessorKey: "First_Name",
            header: "Name",
            Cell: (rowData: any) =>
                (
                    <Typography style={{ whiteSpace: "pre-line" }}>{`${rowData?.row?.original?.First_Name ?? ""} ${
                        rowData?.row?.original?.Last_Name ?? ""
                    }`}</Typography>
                ) ?? "-"
        },
        {
            accessorKey: "RoleName",
            header: "Role"
        },
        {
            accessorKey: "Phone_No",
            header: "Number"
        },
        {
            accessorKey: "Email",
            header: "Email Id"
        },
        {
            accessorKey: "IsActive",
            header: "Status",
            Cell: (rowData: any) => (
                <Box sx={{ width: 70, display: "flex", justifyContent: "center", borderRadius: 5, backgroundColor: "#0C8411", color: "#fff" }}>
                    <Typography variant="subtitle2" color="#fff">
                        {rowData?.row?.original?.IsActive ? "Active" : ""}
                    </Typography>
                </Box>
            )
        },
        {
            accessorKey: "Actions",
            header: "Actions",
            // Add actions with icons here
            Cell: (rowData: any) => <Actions row={rowData?.row?.original} users={users} DealershipDetails={updatedDealer} />
        }
    ] as MRT_ColumnDef[];
    return columnsDealerList;
};

export const tableDefaultSettingsforDealerUserList = {
    columnOrder: ["CreatedDate", "First_Name", "RoleName", "Phone_No", "Email", "IsActive", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { CreatedDate: 105, First_Name: 100, RoleName: 120, Phone_No: 100, Email: 140, IsActive: 100, Actions: 200 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};
