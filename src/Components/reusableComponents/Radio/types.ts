export interface RadioButtonProps {
    id: string;
    label: string;
    list?: { label: string; value: string; disabled?: boolean; ListTooltip?: string }[] | null;
    name: string;
    required?: boolean;
    error?: boolean;
    value?: string;
    defaultValue?: string;
    onChange: (value: any) => void;
    errorText?: any;
    toolTip?: string;
    onBlur?: any;
}
