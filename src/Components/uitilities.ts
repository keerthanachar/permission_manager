export const getFilterConfig = (columns: any) => {
    const whereList = columns.map((e: any) => {
        return { label: e.accessorKey, value: e.header };
    });
    const filterConfig = [
        {
            Label: "Where",
            Required: false,
            Name: "where",
            InitialValue: "",
            Regex: [],
            RegExError: "Please select Where",
            ErrorMessage: "Where is Required",
            Tooltip: "Select Filter Where condition",
            HelperText: "",
            Type: "select",
            List: whereList,
            Categery: "GeneratePage",
            Group: "List_Data",
            MinValue: null,
            MaxValue: null,
            Multiple: 0,
            PlaceHolder: "",
            Disabled: false
        },
        {
            Label: "Condition",
            Required: false,
            Name: "condition",
            InitialValue: "",
            Regex: [],
            RegExError: "Please select Condition",
            ErrorMessage: "Condition is Required",
            Tooltip: "Select Condition",
            HelperText: "",
            Type: "select",
            List: [
                { label: "equals", value: "=" },
                { label: "does not equal", value: "!=" },
                { label: "greater than", value: ">" },
                { label: "less than", value: "<" },
                { label: "greater than or equals", value: ">=" },
                { label: "less than or equals", value: "<=" },
                { label: "before", value: "before" },
                { label: "after", value: "after" },
                { label: "is empty", value: "empty" },
                { label: "is not empty", value: "empty" },
                { label: "contains", value: "contains" },
                { label: "does not constains", value: "constains" }
            ],
            Categery: "GeneratePage",
            Group: "List_Data",
            MinValue: null,
            MaxValue: null,
            Multiple: 0,
            PlaceHolder: "",
            Disabled: false
        },
        {
            Label: "Value",
            Required: false,
            Name: "value",
            InitialValue: "",
            Regex: [],
            RegExError: "Please enter Value",
            ErrorMessage: "Value is required*",
            Tooltip: "Enter Value",
            HelperText: "",
            Type: "text",
            List: null,
            Categery: "GeneratePage",
            Group: "List_Data",
            MinValue: null,
            MaxValue: null,
            Multiple: 0,
            PlaceHolder: "",
            Disabled: false
        }
    ];
    return filterConfig;
};
