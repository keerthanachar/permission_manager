import { FormData } from "../../../Types/InputProps";

export interface MultiplDatePickerProps {
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
    item: FormData;
    maxDate?: string | null;
    minDate?: string | null;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
}
