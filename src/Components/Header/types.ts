export type DashboardHeaderProps = {
    title?: any;
    subtitle?: string;
    searchField?: boolean;
    button?: boolean;
    buttontext?: string;
    handleClick?: () => void;
    styles?: any;
    children?: React.ReactNode;
    backButton?: boolean;
    data?: any;
    searchData?: (val: any) => void | undefined;
    divider?: boolean;
    handleBackButtonClick?: () => void;
};
