export type DialogBoxProps = {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    title?: string;
    width?: any;
};
