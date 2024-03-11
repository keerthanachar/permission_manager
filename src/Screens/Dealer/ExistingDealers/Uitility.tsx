import { format } from "date-fns";
import { MRT_ColumnDef as OriginalMRT_ColumnDef } from "material-react-table";

import { Box, Typography } from "@mui/material";

import { config } from "../../../config";

import UserActions from "./CreateUsers/UserAction";
import ActionsComp from "./Actions";

type MRT_ColumnDef = OriginalMRT_ColumnDef & {
    accessor?: string | ((row: any, index: any) => any);
};
export const columnsData: MRT_ColumnDef[] = [
    {
        accessorKey: "serialno",
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
        accessorKey: "PN_Name",
        header: "Parent Dealership Name",
        Cell: (rowData: any) => (
            <Typography style={{ whiteSpace: "pre-line" }}>{rowData?.row?.original?.PN_Name?.replace(/\n/g, "<br>") ?? "-"}</Typography>
        ),
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
        accessorKey: "Address_1",
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
                    .filter((addressComponent) => addressComponent !== null && addressComponent.trim() !== "")
                    .join(" ,") || " "}
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
        accessorKey: "Contact",
        header: "Main Contact",
        Cell: (rowData: any) => (
            <Typography style={{ whiteSpace: "pre-line" }}>
                {rowData?.row?.original?.MainContact ? (
                    <>
                        <div>
                            <strong>Name:</strong> {rowData?.row?.original?.MainContact?.First_Name ?? ""}{" "}
                            {rowData?.row?.original?.MainContact?.Last_Name ?? ""}
                        </div>
                        <div>
                            <strong>Email:</strong> {rowData?.row?.original?.MainContact?.Email ?? ""}
                        </div>
                        <div>
                            <strong>Phone Number:</strong> {rowData?.row?.original?.MainContact?.Phone_No ?? ""}
                        </div>
                    </>
                ) : (
                    "-"
                )}
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
        // Add actions with icons here
        Cell: (rowData: any) => <ActionsComp rowData={rowData?.row?.original} />,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    }
];

export const tableDefaultSettingsforExistingDealer = {
    columnOrder: ["serialno", "PN_Name", "Name", "Address_1", "Contact", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { serialno: 50, PN_Name: 180, Name: 150, Address_1: 180, Contact: 200, Actions: 150 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};

export const ExistingDealersUserConfig = [
    {
        Label: "Select Role",
        Required: true,
        Name: "RoleName",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Name",
        ErrorMessage: "Role is required*",
        Tooltip: "Role Name",
        HelperText: "",
        Type: "select",
        List: [
            {
                label: "Dealer Admin",
                value: 3
            }
        ],
        Categery: "Dealer_Form",
        Group: "Dealer_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Select Role",
        PlaceHolder: "",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "First_Name",
        InitialValue: "",
        Regex: ["^[A-Za-z ]+$"],
        RegExError: "Please enter First Name",
        ErrorMessage: "First Name is required*",
        Tooltip: "First Name",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Dealer_Form",
        Group: "Dealer_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "First Name*",
        PlaceHolder: "e.g john",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Last_Name",
        InitialValue: "",
        Regex: ["^[A-Za-z ]+$"],
        RegExError: "Please enter Last Name",
        ErrorMessage: "Last Name is required*",
        Tooltip: "Last Name",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Dealer_Form",
        Group: "Dealer_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Last Name*",
        PlaceHolder: "e.g doe",
        Disabled: false
    },
    {
        Label: "",
        Required: true,
        Name: "Phone_No",
        InitialValue: "",
        Regex: ["^\\s*\\d{10}\\s*$"],
        RegExError: "Please enter Phone Number",
        ErrorMessage: "Phone Number is required*",
        Tooltip: "Phone Number",
        HelperText: "",
        Type: "phoneNumber",
        List: null,
        Categery: "Dealer_Form",
        Group: "Dealer_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Phone Number*",
        PlaceHolder: "e.g (123) 456-7890 ",
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
        Categery: "Dealer_Form",
        Group: "Dealer_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Email*",
        PlaceHolder: "e.g johndoe@gmail.com",
        Disabled: false
    },
    {
        Label: "Active",
        Required: true,
        Name: "IsActive",
        InitialValue: "",
        Regex: [],
        RegExError: "",
        ErrorMessage: "Status is required*",
        Tooltip: "Status",
        HelperText: "",
        Type: "switch",
        List: null,
        Categery: "Dealer_Form",
        Group: "Dealer_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Status",
        PlaceHolder: "",
        Disabled: false
    }
];
export const userListColumn = (users?: any, updatedDealer?: any) => {
    const columnsCreateUserList: MRT_ColumnDef[] = [
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
            Cell: (rowData: any) => (
                <Typography
                    style={{ whiteSpace: "pre-line" }}
                >{`${rowData?.row?.original?.First_Name} ${rowData?.row?.original?.Last_Name}`}</Typography>
            )
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
            Cell: (rowData: any) => <UserActions row={rowData?.row?.original} users={users} DealershipDetails={updatedDealer} />
        }
    ];
    return columnsCreateUserList;
};

export const tableDefaultSettingsforUsers = {
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
