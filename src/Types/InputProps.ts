export interface FormData {
    Label: string;
    Required: boolean;
    Name: string;
    InitialValue: any;
    Regex: null | Array<any>;
    RegExError: string;
    ErrorMessage: string;
    Tooltip: string;
    HelperText: string;
    Type: string;
    List: null | Array<any>;
    Categery: string;
    Group: string;
    MinValue: null | string;
    MaxValue: null | string;
    Multiple: number;
    PlaceHolder: string;
    Disabled?: boolean;
    ReadOnly?: boolean;
    additionalData?: any;
    rows?: any;
    Header?: any;
    AdditionalData?: any;
    Amount?: any;
}
export interface SelectOptions {
    label: string;
    value: any;
    additional?: any;
}
