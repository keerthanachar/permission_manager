import { MRT_ColumnDef } from "material-react-table";

import { Box, Typography } from "@mui/material";

export const columnsDealerAdminUserList: MRT_ColumnDef[] = [
    {
        accessorKey: "serialno",
        header: "S.No",
        Cell: ({ row }: { row: { index: number } }) => row.index + 1
    },
    {
        accessorKey: "Name",
        header: "Dealership Name"
    },
    {
        accessorKey: "First_Name",
        header: "Name"
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
    }
];

export const tableDefaultSettingsforDealerAdminList = {
    columnOrder: ["serialno", "Name", "First_Name", "RoleName", "Phone_No", "Email", "IsActive"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { serialno: 10, Name: 100, First_Name: 80, RoleName: 120, Phone_No: 90, Email: 140, IsActive: 100 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};
