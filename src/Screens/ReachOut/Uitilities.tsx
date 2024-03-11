import { MRT_ColumnDef } from "material-react-table";

import { Box, Divider, Grid, Typography } from "@mui/material";

import ReachOutAction from "./ReachOutAction";

/* eslint-disable no-plusplus */
const START = 1951;
const end = new Date().getFullYear();
const yearsData: any = [];
for (let i = START; i <= end; i++) {
    yearsData.push({ label: i.toString(), value: i.toString() });
}

export const ReachOutConfig = [
    {
        Label: "",
        Required: true,
        Name: "FirstName",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter First Name",
        ErrorMessage: "First Name is required*",
        Tooltip: "First Name",
        HelperText: "",
        Type: "text",
        List: [],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "First Name",
        PlaceHolder: "Enter First Name",
        Disabled: false,
        ReadOnly: true
    },
    {
        Label: "",
        Required: true,
        Name: "LastName",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Last Name",
        ErrorMessage: "Last Name is required*",
        Tooltip: "Last Name",
        HelperText: "",
        Type: "text",
        List: [],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Last Name",
        PlaceHolder: "Enter Last Name",
        Disabled: false,
        ReadOnly: true
    },
    {
        Label: "",
        Required: true,
        Name: "Email",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Email",
        ErrorMessage: "Email is required*",
        Tooltip: "Email",
        HelperText: "",
        Type: "text",
        List: [],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Email",
        PlaceHolder: "Enter Email",
        Disabled: false,
        ReadOnly: true
    },
    {
        Label: "",
        Required: true,
        Name: "PhoneNo",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Telephone",
        ErrorMessage: "Telephone is required*",
        Tooltip: "Telephone",
        HelperText: "",
        Type: "phoneNumber",
        List: [],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Telephone",
        PlaceHolder: "Enter Telephone",
        Disabled: false,
        ReadOnly: true
    },
    {
        Label: "",
        Required: true,
        Name: "Dealership",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Dealership",
        ErrorMessage: "Dealership is required*",
        Tooltip: "Dealership",
        HelperText: "",
        Type: "select",
        List: [],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Dealership",
        PlaceHolder: "Select Dealership",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Type",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Type",
        ErrorMessage: "Type is required*",
        Tooltip: "Type",
        HelperText: "",
        Type: "select",
        List: [
            { label: "New", value: "New" },
            { label: "Used", value: "Used" }
        ],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Type",
        PlaceHolder: "Select Type",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "MinYear",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Year",
        ErrorMessage: "Year is required*",
        Tooltip: "Choose a year",
        HelperText: "",
        Type: "select",
        List: yearsData,
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Min Year",
        PlaceHolder: "Choose a year",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "MaxYear",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Year",
        ErrorMessage: "Year is required*",
        Tooltip: "Choose a year",
        HelperText: "",
        Type: "select",
        List: yearsData,
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Max Year",
        PlaceHolder: "Choose a year",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Make",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Make",
        ErrorMessage: "Make is required*",
        Tooltip: "Select Make",
        HelperText: "",
        Type: "select",
        List: [
            { label: "Acura", value: "Acura" },
            { label: "Audi", value: "Audi" }
        ],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Make",
        PlaceHolder: "Select Make",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Model",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Model",
        ErrorMessage: "Model is required*",
        Tooltip: "Select Model",
        HelperText: "",
        Type: "select",
        List: [
            { label: "CL", value: "CL" },
            { label: "CSX", value: "CSX" },
            { label: "EL", value: "EL" },
            { label: "A3", value: "A3" },
            { label: "A5", value: "A5" },
            { label: "A8", value: "A8" }
        ],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Model",
        PlaceHolder: "Select Model",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Trim",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Trim",
        ErrorMessage: "Trim is required*",
        Tooltip: "Enter a Trim",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Trim",
        PlaceHolder: "Enter a Trim",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "MinMiles",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Minimum Miles",
        ErrorMessage: "Minimum Miles is required*",
        Tooltip: "Select Minimum Miles",
        HelperText: "",
        Type: "select",
        List: [
            { label: "5K", value: 5000 },
            { label: "10K", value: 10000 },
            { label: "20K", value: 20000 },
            { label: "30K", value: 30000 },
            { label: "40K", value: 40000 },
            { label: "50K", value: 50000 },
            { label: "60K", value: 60000 },
            { label: "70K", value: 70000 },
            { label: "80K", value: 80000 },
            { label: "90K", value: 90000 },
            { label: "100K", value: 100000 },
            { label: "110K", value: 110000 },
            { label: "120K", value: 120000 },
            { label: "130K", value: 130000 },
            { label: "140K", value: 140000 },
            { label: "150K", value: 150000 }
        ],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Min Miles",
        PlaceHolder: "Select Minimum Miles",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "MaxMiles",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Maximum Miles",
        ErrorMessage: "Maximum Miles is required*",
        Tooltip: "Select Maximum Miles",
        HelperText: "",
        Type: "select",
        List: [
            { label: "5K", value: 5000 },
            { label: "10K", value: 10000 },
            { label: "20K", value: 20000 },
            { label: "30K", value: 30000 },
            { label: "40K", value: 40000 },
            { label: "50K", value: 50000 },
            { label: "60K", value: 60000 },
            { label: "70K", value: 70000 },
            { label: "80K", value: 80000 },
            { label: "90K", value: 90000 },
            { label: "100K", value: 100000 },
            { label: "110K", value: 110000 },
            { label: "120K", value: 120000 },
            { label: "130K", value: 130000 },
            { label: "140K", value: 140000 },
            { label: "150K", value: 150000 }
        ],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Max Miles",
        PlaceHolder: "Select Maximum Miles",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "MinPrice",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Minimum Price",
        ErrorMessage: "Minimum Price is required*",
        Tooltip: "Select Minimum Price",
        HelperText: "",
        Type: "select",
        List: [
            { label: "$2000", value: 2000 },
            { label: "$4000", value: 4000 },
            { label: "$6000", value: 6000 },
            { label: "$8000", value: 8000 },
            { label: "$10000", value: 10000 },
            { label: "$15000", value: 15000 },
            { label: "$20000", value: 20000 },
            { label: "$25000", value: 25000 },
            { label: "$30000", value: 30000 },
            { label: "$35000", value: 35000 },
            { label: "$40000", value: 40000 },
            { label: "$45000", value: 45000 },
            { label: "$50000", value: 50000 },
            { label: "$65000", value: 65000 },
            { label: "$130000", value: 130000 },
            { label: "$175000", value: 175000 },
            { label: "$215000", value: 215000 }
        ],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Min Price",
        PlaceHolder: "Select Minimum Price",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "MaxPrice",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Maximum Price",
        ErrorMessage: "Maximum Price is required*",
        Tooltip: "Select Maximum Price",
        HelperText: "",
        Type: "select",
        List: [
            { label: "$2000", value: 2000 },
            { label: "$4000", value: 4000 },
            { label: "$6000", value: 6000 },
            { label: "$8000", value: 8000 },
            { label: "$10000", value: 10000 },
            { label: "$15000", value: 15000 },
            { label: "$20000", value: 20000 },
            { label: "$25000", value: 25000 },
            { label: "$30000", value: 30000 },
            { label: "$35000", value: 35000 },
            { label: "$40000", value: 40000 },
            { label: "$45000", value: 45000 },
            { label: "$50000", value: 50000 },
            { label: "$60000", value: 60000 },
            { label: "$70000", value: 70000 },
            { label: "$135000", value: 135000 },
            { label: "$180000", value: 180000 },
            { label: "$220000", value: 220000 }
        ],
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Max Price",
        PlaceHolder: "Select Maximum Price",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Color",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Color",
        ErrorMessage: "Color is required*",
        Tooltip: "Enter a Color",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Color",
        PlaceHolder: "Enter a Color",
        Disabled: false
    },
    {
        Label: "",
        Required: false,
        Name: "Description",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Description",
        ErrorMessage: "Description is required*",
        Tooltip: "Enter a Description",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "AutoFinder_Form",
        Group: "AutoFinder_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Description",
        PlaceHolder: "Enter a Description",
        Disabled: false
    }
];

export const ReachOutColumns: MRT_ColumnDef[] = [
    {
        accessorKey: "SNO",
        header: "SNO",
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Contact_Info",
        header: "Contact Info",
        Cell: (rowData: any) => (
            <Box>
                <Box display="flex">
                    <Typography fontWeight={600}>Name :</Typography>
                    <Typography px={1}>{`${rowData?.row?.original?.First_Name} ${rowData?.row?.original?.Last_Name}`}</Typography>
                </Box>
                <Box display="flex">
                    <Typography fontWeight={600}>Email :</Typography>
                    <Typography px={1.7}>{rowData?.row?.original?.Email ?? "-"}</Typography>
                </Box>
                <Box display="flex">
                    <Typography fontWeight={600}>Phone :</Typography>
                    <Typography px={1}>{rowData?.row?.original?.Phone_No?.slice(2, 12) ?? "-"}</Typography>
                </Box>
            </Box>
        ),
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "Vehicle_Info",
        header: "Vehicle Info",
        Cell: (rowData: any) => (
            <Box>
                <Grid container>
                    <Grid item lg={2.8} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>Type :</Typography>
                        <Typography>{rowData?.row?.original?.Type ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, mr: 1, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={3} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>Make :</Typography>
                        <Typography>{rowData?.row?.original?.Make ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, mr: 1, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={2.8} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>Model :</Typography>
                        <Typography>{rowData?.row?.original?.Model ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, mr: 1.5, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={2.8} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>Trim :</Typography>
                        <Typography>{rowData?.row?.original?.Trim ?? "-"}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={2.8} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>MinYear :</Typography>
                        <Typography>{rowData?.row?.original?.MinYear ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, mr: 1, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={2.5} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>MaxYear :</Typography>
                        <Typography>{rowData?.row?.original?.MaxYear ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, ml: 3.5, mr: 1, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={2.8} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>MinMiles :</Typography>
                        <Typography>{rowData?.row?.original?.MinMiles ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, mr: 1, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={2.5} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>MaxMiles :</Typography>
                        <Typography>{rowData?.row?.original?.MaxMiles ?? "-"}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={2.8} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>MinPrice :</Typography>
                        <Typography>{rowData?.row?.original?.MinPrice ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, mr: 1, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={2.5} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>MaxPrice :</Typography>
                        <Typography>{rowData?.row?.original?.MaxPrice ?? "-"}</Typography>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        sx={{ height: 15, mt: 0.6, ml: 3.5, mr: 1, display: "flex", alignContent: "center", borderWidth: 1 }}
                        flexItem
                    />
                    <Grid item lg={2.8} md={6} sm={6} xs={12} display="flex">
                        <Typography fontWeight={600}>Color :</Typography>
                        <Typography>{rowData?.row?.original?.Color ?? "-"}</Typography>
                    </Grid>
                </Grid>
                <Box display="flex">
                    <Typography fontWeight={600}>Description :</Typography>
                    <Typography>{rowData?.row?.original?.Description ?? "-"}</Typography>
                </Box>
            </Box>
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
        Cell: (rowData: any) => <ReachOutAction rowData={rowData?.row?.original} />,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    }
];

export const tableDefaultSettingsforReachouts = {
    columnOrder: ["SNO", "Contact_Info", "Vehicle_Info", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { SNO: 10, Contact_Info: 120, Vehicle_Info: 260, Actions: 10 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};
