import { SelectOptions } from "../../../Types/InputProps";

export interface SelectMultipleComponentProps {
    id: string;
    value: SelectOptions[] | null;
    name: string;
    label: string;
    onChange: (value: SelectOptions[] | null) => void;
    required?: boolean | null;
    error?: boolean;
    toolTip?: string;
    placeHolder?: string;
    helperText?: string;
    defaultValue?: SelectOptions[];
    disabled?: boolean;
    list: SelectOptions[] | null;
    onBlur?: any;
    errorText?: any;
}
