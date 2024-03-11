import { SelectOptions } from "../../../Types/InputProps";

type ValueAlias = SelectOptions | string | null;
export interface SelectComponentProps {
    id?: string;
    value: ValueAlias;
    name?: string;
    label?: string;
    onChange: (value: ValueAlias) => void;
    required?: boolean | null;
    error?: boolean;
    toolTip?: string;
    placeHolder?: string;
    helperText?: string;
    defaultValue?: ValueAlias;
    disabled?: boolean;
    readOnly?: boolean;
    list: SelectOptions[] | string[];
    onBlur?: any;
    onInputChange?: (value?: any) => void;
    errorText?: any;
    allowAddList?: boolean;
    addListToDatabse?: boolean;
    noOptionsText?: string;
    placeHolderfontWeight?: number;
    fieldDisabled?: boolean;
}
