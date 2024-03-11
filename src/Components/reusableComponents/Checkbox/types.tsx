export interface CheckBoxInterface {
    id: string;
    name: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    error?: boolean;
    label: string;
    toolTip?: string;
    errorText?: any;
    onBlur?: any;
    testig?: any;
}
