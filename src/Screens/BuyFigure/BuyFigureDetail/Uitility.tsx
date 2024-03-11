import { MRT_ColumnDef as OriginalMRT_ColumnDef } from "material-react-table";

import { Typography } from "@mui/material";

import { useAppSelector } from "../../../Redux/hooks";

import QuoteActions from "./QuoteActions";

type MRT_ColumnDef = OriginalMRT_ColumnDef & {
    accessor?: string | ((row: any, index: any) => any);
};
export const columnsData: MRT_ColumnDef[] = [
    {
        accessorKey: "Quote_ID",
        header: "S.No",
        Cell: ({ row }: { row: { index: number } }) => row.index + 1,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Name",
        header: "Name",
        Cell: (rowData: any) => (
            <Typography style={{ whiteSpace: "pre-line" }}>{rowData?.row?.original?.Name?.replace(/\n/g, "<br>") ?? "-"}</Typography>
        ),
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "DealerName",
        header: "Dealer Name",
        Cell: (rowData: any) => (
            <Typography style={{ whiteSpace: "pre-line" }}>{rowData?.row?.original?.DealerName?.replace(/\n/g, "<br>") ?? "-"}</Typography>
        ),
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Quote_Price",
        header: "Amount (USD)",
        Cell: (rowData: any) => {
            const { user } = useAppSelector((state) => state);
            const isQuoted = rowData?.row?.original?.UserID === user.UserID;
            const isTopAdmins = user.RoleId === 1 || user.RoleId === 2;

            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(rowData?.row?.original?.Quote_Price);

            return <Typography style={{ whiteSpace: "pre-line" }}>{isQuoted || isTopAdmins ? `${formattedAmount}` : "-"}</Typography>;
        },
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "ReceivedThru",
        header: "Received ",
        Cell: (rowData: any) => <Typography style={{ whiteSpace: "pre-line" }}>{`${rowData?.row?.original?.Received ?? "-"}`}</Typography>,
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
        Cell: (rowData: any) => <QuoteActions rowData={rowData?.row?.original} />,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    }
];

export const tableDefaultSettingsforBuyFigure = {
    columnOrder: ["Quote_ID", "Name", "DealerName", "Quote_Price", "ReceivedThru", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { Quote_ID: 30, Name: 90, DealerName: 130, Quote_Price: 120, ReceivedThru: 100, Actions: 60 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};
export const QuoteDetailsConfig = [
    {
        Label: "",
        Required: true,
        Name: "Name",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter First Name",
        ErrorMessage: "First Name is required*",
        Tooltip: "Name",
        HelperText: "",
        Type: "text",
        List: [],
        Categery: "Quote_Form",
        Group: "Quote_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Name",
        PlaceHolder: "Enter the Name",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "DealerName",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Dealer Name",
        ErrorMessage: "Dealer Name is required*",
        Tooltip: "Dealer Name",
        HelperText: "",
        Type: "select",
        List: [],
        Categery: "Quote_Form",
        Group: "Quote_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Dealer Name",
        PlaceHolder: "Select the Dealer Name",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Quote_Price",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Quote Amount",
        ErrorMessage: "Quote Amount is required*",
        Tooltip: "Quote Amount",
        HelperText: "",
        Type: "number",
        List: [],
        Categery: "Quote_Form",
        Group: "Quote_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Quote Amount (USD)",
        PlaceHolder: "Enter the Quote Amount",
        Disabled: false,
        Amount: true
    },
    {
        Label: "",
        Required: true,
        Name: "Received",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Received Through",
        ErrorMessage: "Received is required*",
        Tooltip: "Received Through",
        HelperText: "",
        Type: "select",
        List: [
            { label: "Email", value: "email" },
            { label: "Chat", value: "chat" },
            { label: "Phone Call", value: "phonecall" },
            { label: "Others", value: "others" }
        ],
        Categery: "Quote_Form",
        Group: "Quote_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Received",
        PlaceHolder: "Select the Received Method",
        Disabled: false
    }
];
