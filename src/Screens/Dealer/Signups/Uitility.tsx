import { format } from "date-fns";
import { MRT_ColumnDef } from "material-react-table";

import { Typography } from "@mui/material";

import { config } from "../../../config";

import SignupActions from "./SignupActions";

export const columns: MRT_ColumnDef[] = [
    {
        accessorKey: "CreatedDate",
        header: "Created Date (YYYY/DD/MM)",
        Cell: (rowData: any) => <Typography>{format(new Date(rowData?.row?.original?.CreatedDate), config?.dateFormat)}</Typography>,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Name",
        header: "Dealer Name",
        Cell: (rowData: any) => <Typography style={{ whiteSpace: "pre-line" }}>{rowData?.row?.original?.Name?.replace(/\n/g, "<br>")}</Typography>,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Address_1",
        header: "Address",
        Cell: (rowData: any) => (
            <Typography style={{ whiteSpace: "pre-line" }}>{rowData?.row?.original?.Address_1?.replace(/\n/g, "<br>")}</Typography>
        ),
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "PhoneNo",
        header: "Number",
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Email",
        header: "Email",
        Cell: (rowData: any) => <Typography style={{ whiteSpace: "pre-line" }}>{rowData?.row?.original?.Email?.replace(/\n/g, "<br>")}</Typography>,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Actions",
        header: "Actions",
        Cell: (rowData: any) => <SignupActions rowData={rowData?.row?.original} />,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    }
];

export const tableDefaultSettingsforDealerSignup = {
    columnOrder: ["CreatedDate", "Name", "Address_1", "PhoneNo", "Email", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { CreatedDate: 80, Name: 90, Address_1: 100, PhoneNo: 80, Email: 150, Actions: 100 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};
