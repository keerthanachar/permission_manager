import { MRT_ColumnDef } from "material-react-table";

import { Box, Typography } from "@mui/material";

import PrivateNetworkActions from "./PrivateNetworkActions";

export const AddPrivateNetworkConfig = [
    {
        Label: "",
        Required: true,
        Name: "PN_Name",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Private Network Name",
        ErrorMessage: "Private Network Name is required*",
        Tooltip: "Private Network Name",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Parent Dealership Name",
        PlaceHolder: "Enter Parent Dealership Name",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Country",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Country",
        ErrorMessage: "Dealer Country is required*",
        Tooltip: "Dealer Country",
        HelperText: "",
        Type: "select",
        List: [
            { label: "United States", value: "US" },
            { label: "Canada", value: "CA" }
        ],
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Country",
        PlaceHolder: "Please Select Country",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "State",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter State/Province",
        ErrorMessage: "State/Province is required*",
        Tooltip: "State/Province",
        HelperText: "",
        Type: "select",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "State/Province",
        PlaceHolder: "Please Select State",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "City",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter City",
        ErrorMessage: "City is required*",
        Tooltip: "City",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "City",
        PlaceHolder: "City",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Address_1",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Address",
        ErrorMessage: "Address is required*",
        Tooltip: "Address",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Address",
        PlaceHolder: "Address",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Address_2",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Address2",
        ErrorMessage: "Address2 is required*",
        Tooltip: "Address2",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Address 2",
        PlaceHolder: "Address 2",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "TimeZone",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Time Zone",
        ErrorMessage: "Time Zone is required*",
        Tooltip: "Time Zone",
        HelperText: "",
        Type: "select",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Time Zone",
        PlaceHolder: "TimeZone",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Zipcode",
        InitialValue: "",
        Regex: ["^\\s*\\d{5}\\s*$"],
        RegExError: "Please enter Zip Code",
        ErrorMessage: "Zip Code is required*",
        Tooltip: "Zip Code",
        HelperText: "",
        Type: "number",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Zip Code",
        PlaceHolder: "Zip code",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Geo_Location",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter GEO Location",
        ErrorMessage: "GEO Location is required*",
        Tooltip: "GEO Location",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "PrivateNetwork_Form",
        Group: "PrivateNetwork_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "GEO Location",
        PlaceHolder: "GEO Location",
        Disabled: false
    }
];
export const PrivateNetworkcolumns: MRT_ColumnDef[] = [
    {
        accessorKey: "S_No",
        header: "S.No",
        Cell: ({ row }: { row: { index: number } }) => row.index + 1
    },
    {
        accessorKey: "ParentDealership",
        header: "Parent Dealership Name",
        Cell: (rowData: any) => {
            return (
                <Box>
                    <Typography sx={{ whiteSpace: "pre-line" }}>{`${rowData?.row?.original?.PN_Name}`}</Typography>
                </Box>
            );
        }
    },
    {
        accessorKey: "Address",
        header: "Address",
        Cell: (rowData: any) => (
            <Typography style={{ whiteSpace: "pre-line" }}>
                {[
                    rowData?.row?.original?.Address_1,
                    rowData?.row?.original?.Address_2,
                    rowData?.row?.original?.City,
                    rowData?.row?.original?.State,
                    rowData?.row?.original?.Country
                ]
                    .filter((addressComponent) => addressComponent !== null)
                    .join(" ") || "-"}
            </Typography>
        ),
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
        Cell: (rowData: any) => <PrivateNetworkActions row={rowData?.row?.original} />
    }
];
// eslint-disable-next-line const-case/uppercase

export const tableDefaultSettingsforPrivateNetwork = {
    columnOrder: ["S_No", "ParentDealership", "Address", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { S_No: 20, ParentDealership: 130, Address: 150, Actions: 100 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};
