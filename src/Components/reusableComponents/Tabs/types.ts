export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface WithTabsHOCProps {
    tabs: Array<{ label: string; content: React.ReactNode }>;
}
export interface DynamicTabsProps {
    tabData: any;
}
