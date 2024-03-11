import { FormData } from "../../../Types/InputProps";

export interface MultipleInputProps {
    id: string;
    value: string[] | null;
    name: string;
    label: string;
    onChange: (value: string[]) => void;
    required?: boolean | null;
    error: boolean;
    toolTip?: string;
    placeHolder?: string;
    helperText?: string;
    disabled?: boolean;
    onBlur?: any;
    errorText?: any;
    regEx: string[] | null;
    item: FormData;
    preventBackSpace?: number;
    rows?: any;
}
