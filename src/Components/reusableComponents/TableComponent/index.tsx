/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from "react";
import MaterialReactTable from "material-react-table";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, MenuItem, Pagination, Select, TablePagination, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { calculateTablePages } from "./logic";
import { TableInterface } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let a: any;
const TableComponent: React.FC<TableInterface> = ({
    columns = [],
    loading,
    data = [],
    onPageChange,
    onPageListChange,
    onDownloadCSV,
    totalRecord = 0,
    onChangeAction,
    pageListOption = [5, 10, 25, 50, 100],
    actionDropDown,
    downloadCSVText,
    downloadCSV,
    rowsPerPage = 10,
    currentPage = 1,
    enablePinning = false,
    enableColumnActions = false,
    enableColumnFilterModes = false,
    enableColumnResizing = true,
    enableFilterMatchHighlighting,
    enableGlobalFilterModes = true,
    enableColumnOrdering = false,
    enableColumnFilters = false,
    enablePagination = false,
    enableSorting = false,
    enableBottomToolbar = false,
    enableTopToolbar = true,
    muiTableBodyRowProps = {},
    enableStickyHeader = true,
    enableEditing = false,
    editingMode,
    enableRowActions,
    positionActionsColumn,
    positionToolbarAlertBanner,
    icons,
    settings,
    muiTableBodyCellProps,
    sorting = [],
    additionalBtn,
    additionalBtnText,
    handleAdditionalFunc,
    toolBarPosition = "top",
    showFilterButton = false,
    showDownloadButton = false,
    showRefreshButton = false,
    enableMultiRowSelection = false,
    handleFilterButton,
    handleRefreshButton,
    tableHeader
}) => {
    const handleSettingUpdate = () => {
        // settings Data
    };
    const newSettings = {
        columnPinning: {
            left: [],
            right: []
        },
        columnSizing: {},
        columnVisibility: {},
        showColumnFilters: false,
        density: "compact",
        columnOrder: columns.map((e) => e.accessorKey),
        ...(settings ?? {})
    };
    const { density, showColumnFilters, columnSizing, columnVisibility, columnPinning, columnOrder } = newSettings;
    const [columnOrdering, setColumnOrdering] = React.useState<any[]>([
        ...(columnOrder?.length ? columnOrder : columns?.map((e: any) => e.accessorKey) ?? [])
    ]);

    const [columnVisible, setColumnVisible] = React.useState<any>(newSettings.columnVisibility ?? {});
    const [columnPin, setColumnPinning] = React.useState(newSettings.columnPinning ?? {});
    const handleColumnPinning = (props: any) => {
        setColumnPinning(props);
        handleSettingUpdate();
    };
    const handleColumnVisibility = (props: any) => {
        setColumnVisible(props);
        handleSettingUpdate();
    };
    useEffect(() => {}, [columnPin, columnVisible]);
    return (
        <Box>
            <MaterialReactTable
                state={{
                    showColumnFilters,
                    columnVisibility,
                    columnSizing,
                    columnPinning: {
                        left: columnPinning?.left ?? [],
                        right: columnPinning?.right ?? []
                    },
                    density,
                    columnOrder: columnOrdering,
                    isLoading: loading
                }}
                initialState={{ columnOrder: columnOrdering, sorting }}
                columns={columns}
                data={data ?? ""}
                enableMultiRowSelection={enableMultiRowSelection}
                muiTableBodyCellProps={muiTableBodyCellProps}
                enablePinning={enablePinning}
                enableColumnFilterModes={enableColumnFilterModes}
                enableColumnResizing={enableColumnResizing}
                enableFilterMatchHighlighting={enableFilterMatchHighlighting}
                enableGlobalFilterModes={enableGlobalFilterModes}
                enableColumnOrdering={enableColumnOrdering}
                enableStickyHeader={enableStickyHeader}
                enableColumnActions={enableColumnActions}
                enableColumnFilters={enableColumnFilters}
                editingMode={editingMode}
                enableHiding={false}
                enableBottomToolbar={enableBottomToolbar}
                enableTopToolbar={enableTopToolbar}
                muiTableBodyRowProps={muiTableBodyRowProps}
                columnResizeMode="onEnd"
                enableEditing={enableEditing}
                muiTableHeadCellProps={{
                    sx: {
                        backgroundColor: "#D3D3D3",
                        fontWeight: "40px"
                    }
                }}
                muiTablePaperProps={{
                    elevation: 3,
                    sx: {
                        margin: 0,
                        padding: 2.5,
                        "& .css-di3982": {
                            display: "none"
                        },
                        "& .css-p3ifqm": {
                            display: "none"
                        },
                        "& .css-3ictlu": {
                            backgroundColor: "#fff"
                        },
                        "& .css-ucrtko": {
                            backgroundColor: "#fff"
                        },
                        "& .css-q9mi85-MuiToolbar-root": {
                            backgroundColor: "#fff"
                        },
                        "& .css-wg135r-MuiTableRow-root": {
                            backgroundColor: "#fff"
                        },
                        borderRadius: 0
                    }
                }}
                enableRowActions={enableRowActions}
                positionActionsColumn={positionActionsColumn}
                positionToolbarAlertBanner={positionToolbarAlertBanner}
                icons={icons}
                muiTableHeadCellDragHandleProps={{ sx: { display: "none" } }}
                onColumnPinningChange={handleColumnPinning}
                onColumnVisibilityChange={handleColumnVisibility}
                onColumnOrderChange={(order: any) => {
                    setColumnOrdering(order);
                    handleSettingUpdate();
                }}
                // eslint-disable-next-line consistent-return
                onColumnSizingChange={(size: any) => {
                    // eslint-disable-next-line no-console
                    console.log("size: ", size);
                    try {
                        handleSettingUpdate();
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.log("error", error);
                    }
                }}
                onColumnFiltersChange={(showFilters: any) => {
                    // eslint-disable-next-line no-console
                    console.log("showFilters: ", showFilters);
                    handleSettingUpdate();
                }}
                onDensityChange={(densityData: any) => {
                    // eslint-disable-next-line no-console
                    console.log("densityData: ", densityData);
                    handleSettingUpdate();
                }}
                enablePagination={enablePagination}
                enableSorting={enableSorting}
                manualPagination
                renderBottomToolbar={
                    totalRecord ? (
                        <Box component="div" display="flex" zIndex={1000} justifyContent="space-evenly" alignItems="center">
                            <Box display="flex" width="50%">
                                <TablePagination
                                    component="div"
                                    count={totalRecord}
                                    page={currentPage - 1}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={pageListOption}
                                    onPageChange={(e: any) => onPageChange?.(e)}
                                    onRowsPerPageChange={(pageData: any) => onPageListChange?.(pageData)}
                                    nextIconButtonProps={{ sx: { display: "none" } }}
                                    backIconButtonProps={{ sx: { display: "none" } }}
                                />
                            </Box>
                            <Box display="flex" width="50%" justifyContent="flex-end">
                                <Pagination
                                    sx={{ padding: 2 }}
                                    onChange={(pageNumber, page) => onPageChange?.(pageNumber, page)}
                                    count={calculateTablePages(totalRecord, rowsPerPage)}
                                    page={currentPage}
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </Box>
                        </Box>
                    ) : (
                        <Box display="flex" width="100%" justifyContent="flex-end">
                            {toolBarPosition === "bottom" && (
                                <Box display="flex" width="7%" p={1} justifyContent="space-between">
                                    <Box>
                                        {showDownloadButton && (
                                            // <IconButton>
                                            <DownloadRoundedIcon />
                                            // </IconButton>
                                        )}
                                    </Box>
                                    <Box>
                                        {showFilterButton && (
                                            // <IconButton onClick={handleFilterButton}>
                                            <FilterListIcon onClick={handleFilterButton} />
                                            // </IconButton>
                                        )}
                                    </Box>
                                    <Box>
                                        {showRefreshButton && (
                                            // <IconButton onClick={handleRefreshButton}>
                                            <RefreshIcon onClick={handleRefreshButton} />
                                            // </IconButton>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )
                }
                renderTopToolbarCustomActions={({ table }) => (
                    <Box component="div">
                        {toolBarPosition === "top" ? (
                            <Box display="flex">
                                <Box display="flex" justifyContent="flex-end">
                                    <Typography variant="body1" fontWeight={700}>
                                        {tableHeader}
                                    </Typography>
                                </Box>
                                <Box>
                                    {showDownloadButton && (
                                        // <IconButton>
                                        <DownloadRoundedIcon />
                                        // </IconButton>
                                    )}
                                </Box>
                                <Box>
                                    {showFilterButton && (
                                        // <IconButton onClick={handleFilterButton}>
                                        <FilterListIcon onClick={handleFilterButton} />
                                        // </IconButton>
                                    )}
                                </Box>
                                <Box>
                                    {showRefreshButton && (
                                        //   <IconButton>
                                        <RefreshIcon onClick={handleRefreshButton} />
                                        //   </IconButton>
                                    )}
                                </Box>
                            </Box>
                        ) : (
                            <Box component="div" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                {actionDropDown && (
                                    <Select disabled={!table.getIsSomeRowsSelected()} value="Actions" onChange={(e: any) => onChangeAction?.(e)}>
                                        {actionDropDown?.map((item: any) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                                {downloadCSVText && (
                                    <Button disabled={downloadCSV ?? !table.getIsSomeRowsSelected()} onClick={(e: any) => onDownloadCSV?.(e)}>
                                        {downloadCSVText ?? ""}
                                    </Button>
                                )}
                                {additionalBtn && (
                                    <Box width="100%" display="flex">
                                        <Button variant="outlined" onClick={(e: any) => handleAdditionalFunc?.(e)}>
                                            {additionalBtnText ?? ""}
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                )}
            />
        </Box>
    );
};
export default TableComponent;
