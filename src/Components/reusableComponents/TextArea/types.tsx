export interface TextAreaInterface {
    name: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    label: string;
    toolTip?: string;
    disabled?: boolean;
    errorText?: any;
    onBlur?: any;
    testig?: any;
    placeholder?: any;
    variant?: any;
    rows?: number;
    required?: boolean;
    helperText?: string;
    sx?: any;
    type?: any;
    regexPattern?: any;
    id?: any;
}
