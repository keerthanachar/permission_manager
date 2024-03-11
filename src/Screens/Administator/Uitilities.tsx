import { MRT_ColumnDef } from "material-react-table";

import { Box, Typography } from "@mui/material";

import AdminActions from "./AdminActions";

export const columns: MRT_ColumnDef[] = [
    {
        accessorKey: "Name",
        header: "Name",
        Cell: (rowData: any) => {
            return (
                <Box>
                    <Typography sx={{ whiteSpace: "pre-line" }}>{`${rowData?.row?.original?.FullName}`}</Typography>
                </Box>
            );
        }
    },
    {
        accessorKey: "Phone_No",
        header: "Mobile Number"
    },
    {
        accessorKey: "Email",
        header: "Email Id"
    },
    {
        accessorKey: "Status",
        header: "Status",
        Cell: (rowData: any) => (
            <Box>
                {rowData?.row?.original?.IsActive ? (
                    <Box sx={{ width: 70, display: "flex", justifyContent: "center", borderRadius: 5, backgroundColor: "#0C8411", color: "#fff" }}>
                        <Typography variant="body2" color="#fff">
                            Active
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ width: 80, display: "flex", justifyContent: "center", borderRadius: 5, backgroundColor: "red", color: "#fff" }}>
                        <Typography variant="body2" color="#fff">
                            Inactive
                        </Typography>
                    </Box>
                )}
            </Box>
        )
    },
    {
        accessorKey: "Actions",
        header: "Actions",
        Cell: (rowData: any) => <AdminActions row={rowData?.row?.original} />
    }
];

export const tableDefaultSettingsforAdministrators = {
    columnOrder: ["Name", "Phone_No", "Email", "Status", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { Name: 100, Phone_No: 150, Email: 200, Status: 130, Actions: 350 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};

export const AddAdministratorConfig = [
    {
        Label: "",
        Required: true,
        Name: "First_Name",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter First Name",
        ErrorMessage: "First Name is required*",
        Tooltip: "First Name",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Administrator_Form",
        Group: "Administrator_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "First Name",
        PlaceHolder: "Enter First Name",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Last_Name",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Last Name",
        ErrorMessage: "Last Name is required*",
        Tooltip: "Last Name",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Administrator_Form",
        Group: "Administrator_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Last Name",
        PlaceHolder: "Enter Last Name",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Email",
        InitialValue: "",
        Regex: ["^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\\.)+[a-zA-Z]{2,7}$"],
        RegExError: "Please enter Email",
        ErrorMessage: "Email is required*",
        Tooltip: "Email",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Administrator_Form",
        Group: "Administrator_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Email",
        PlaceHolder: "Enter Email",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Phone_No",
        InitialValue: "",
        Regex: ["^\\s*\\d{10}\\s*$"],
        RegExError: "Please enter Mobile Number",
        ErrorMessage: "Mobile Number is required*",
        Tooltip: "Mobile Number",
        HelperText: "",
        Type: "phoneNumber",
        List: null,
        Categery: "Administrator_Form",
        Group: "Administrator_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Phone Number",
        PlaceHolder: "Enter Mobile Number",
        Disabled: false
    }
];
