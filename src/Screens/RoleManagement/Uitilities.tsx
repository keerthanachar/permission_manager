import { MRT_ColumnDef } from "material-react-table";

import CheckboxGroup from "./Actions";

export const RolemanagmentColumns = (selectedRole: any) => {
    const columns: MRT_ColumnDef[] = [
        {
            accessorKey: "Screen_Name",
            header: "Screen Name"
        },
        {
            accessorKey: "setPermissions",
            header: "Set Permissions",
            // eslint-disable-next-line react/no-unstable-nested-components
            Cell: (rowData: any) => <CheckboxGroup data={rowData} selectedRole={selectedRole} />
        }
    ];
    return columns;
};

export const tableDefaultSettingsforRoleManagement = {
    columnOrder: ["Screen_Name", "setPermissions"],
    columnPinning: {
        left: [],
        right: []
    },
    columnSizing: { Screen_Name: 50 },
    columnVisibility: {},
    showColumnFilters: false,
    density: "compact"
};
