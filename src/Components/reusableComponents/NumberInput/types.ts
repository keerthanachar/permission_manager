export interface NumberInputFieldProps {
    id?: string;
    value: string | null;
    name?: string;
    label?: string;
    onChange: (value: string) => void;
    required?: boolean | null;
    error?: boolean;
    toolTip?: string;
    placeHolder?: string;
    helperText?: string;
    defaultValue?: string;
    disabled?: boolean;
    onBlur?: any;
    errorText?: any;
    type?: string;
    sx?: any;
    readOnly?: any;
    rows?: any;
    regexPattern?: any;
    Amount?: any;
}
