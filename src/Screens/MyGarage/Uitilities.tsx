import { MRT_ColumnDef } from "material-react-table";
import { useDispatch } from "react-redux";

import { Button, CardMedia, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import previewCar from "../../Assets/previewCar.jpg";
import { handleModel } from "../../Redux/Reducer";

import GarageActions from "./GarageActions";

// eslint-disable-next-line const-case/uppercase
const regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg|bmp|ico|tiff|jfif|jfif-tbn|pjpeg|pjp|avif|apng)\??.*$/gim;

export const columns: MRT_ColumnDef[] = [
    {
        accessorKey: "Photo",
        header: "",
        Cell: (rowData: any) => {
            const photoUrl = rowData?.row?.original?.Photo;
            const imageUrl = photoUrl?.match(regex);

            return <CardMedia image={imageUrl || previewCar} title="car" sx={{ width: "55px", height: "35px" }} />;
        },

        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "YearMake",
        header: "Vehicle",
        Cell: (rowData: any) => {
            const dispatch = useDispatch();
            return (
                <Typography
                    style={{ whiteSpace: "pre-line", cursor: "pointer" }}
                    onClick={() => dispatch(handleModel({ open: true, type: "MyGarageProduct", payload: rowData?.row?.original?.Product }))}
                >
                    {rowData?.row?.original?.YearMake}
                </Typography>
            );
        },
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    {
        accessorKey: "RDPrice",
        header: "Price",
        Cell: (rowData: any) => {
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })
                .format(rowData?.row?.original?.RDPrice)
                .replace(/(\D)(\d)/, "$1 $2");
            return <Typography>{rowData?.row?.original?.RDPrice ? formattedAmount : "-"}</Typography>;
        },
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    },
    // {
    //     accessorKey: "Status",
    //     header: "Status",
    //     Cell: (rowData: any) => <Typography style={{ whiteSpace: "pre-line", color: "#98FB98" }}>{rowData?.row?.original?.Status}</Typography>,
    //     muiTableBodyCellProps: {
    //         align: "left",
    //         style: {
    //             verticalAlign: "top"
    //         }
    //     }
    // },
    {
        accessorKey: "Note",
        header: "Note",
        Cell: (rowData: any) => {
            const dispatch = useDispatch();
            return (
                <Box ml={-2}>
                    <Tooltip title={rowData?.row?.original?.Note ? "view notes" : "no notes"}>
                        <Button
                            style={{ whiteSpace: "pre-line", cursor: "pointer" }}
                            onClick={() => dispatch(handleModel({ open: true, type: "Note", payload: rowData?.row?.original?.Note }))}
                            disabled={!rowData?.row?.original?.Note}
                        >
                            {rowData?.row?.original?.Note ? "View Notes" : ""}
                        </Button>
                    </Tooltip>
                </Box>
            );
        },
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
        Cell: (rowData: any) => <GarageActions rowData={rowData?.row?.original} />,
        muiTableBodyCellProps: {
            align: "left",
            style: {
                verticalAlign: "top"
            }
        }
    }
];
export const tableDefaultSettingsforGarage = {
    columnOrder: ["Photo", "YearMake", "RDPrice", "Note", "Actions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { Photo: 70, YearMake: 150, RDPrice: 100, Note: 80, Actions: 40 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};

export const AddNoteConfig = [
    {
        Label: "",
        Required: false,
        Name: "Note",
        InitialValue: "",
        Regex: [],
        RegExError: "Please Write a Note",
        ErrorMessage: "Note is required*",
        Tooltip: "Note",
        HelperText: "",
        Type: "TextArea",
        List: [],
        Categery: "AddNote_MyGarage",
        Group: "Garage_Details",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "",
        PlaceHolder: "Write a note",
        Disabled: false,
        rows: 4,
        AdditionalData: {
            borderRadius: 0,
            // backgroundColor: "#433C4D",
            width: "41vw !important",
            "& .MuiInputBase-multiline": {
                height: "20vh",
                alignItems: "flex-start"
            }
        }
    }
];
