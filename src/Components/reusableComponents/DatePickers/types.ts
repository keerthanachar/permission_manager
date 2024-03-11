import { FormData } from "../../../Types/InputProps";

export interface InputDatePickerInterface {
    value: string | null;
    onChange: (value: any) => void;
    error: boolean;
    helperText: string | null;
    toolTip?: string;
    placeHolder?: string;
    defaultValue?: string;
    disabled?: boolean;
    onBlur: any;
    errorText?: any;
    maxDate?: string | null;
    minDate?: string | null;
    setFieldTouched?: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    item: FormData;
}
