export const FooterConfig = [
    {
        Label: "",
        Required: true,
        Name: "FirstName",
        InitialValue: "",
        // Regex: ["^", "s*(?:", "+?(", "d{1,3}))?[-. (]*(", "d{3})[-. )]*(", "d{3})[-. ]*(", "d{4})(?: *x(", "d+))?", "s*$"],
        Regex: [],
        RegExError: "",
        ErrorMessage: "Name is required*",
        Tooltip: "Name",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Generate Page",
        Group: "FOOTER",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "",
        PlaceHolder: "Name*",
        Disabled: false,
        AdditionalData: {
            "& .MuiInputBase-adornedEnd": {
                borderRadius: 0,
                backgroundColor: "#433C4D",
                color: "white"
            }
        }
    },
    {
        Label: "",
        Required: true,
        Name: "PhoneNumber",
        InitialValue: "",
        // Regex: ["^", "s*(?:", "+?(", "d{1,3}))?[-. (]*(", "d{3})[-. )]*(", "d{3})[-. ]*(", "d{4})(?: *x(", "d+))?", "s*$"],
        Regex: ["^\\s*\\d{10}\\s*$"],
        RegExError: "Please enter valid mobile number",
        ErrorMessage: "Mobile number is required*",
        Tooltip: "Your Mobile",
        HelperText: "",
        Type: "phoneNumber",
        List: null,
        Categery: "Generate Page",
        Group: "FOOTER",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "",
        PlaceHolder: "Phone Number*",
        Disabled: false,
        AdditionalData: {
            "& .MuiInputBase-adornedEnd": {
                borderRadius: 0,
                backgroundColor: "#433C4D",
                color: "white"
            }
        }
    },
    {
        Label: "",
        Required: true,
        Name: "Email",
        InitialValue: "",
        Regex: ["^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\\.)+[a-zA-Z]{2,7}$"],
        RegExError: "",
        ErrorMessage: " Email is required*",
        Tooltip: "Email",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Generate Page",
        Group: "FOOTER",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "",
        PlaceHolder: " Email*",
        Disabled: false,
        AdditionalData: {
            "& .MuiInputBase-adornedEnd": {
                borderRadius: 0,
                backgroundColor: "#433C4D",
                color: "white"
            }
        }
    },
    {
        Label: "",
        Required: true,
        Name: "Dealership",
        InitialValue: "",
        // Regex: ["^", "s*(?:", "+?(", "d{1,3}))?[-. (]*(", "d{3})[-. )]*(", "d{3})[-. ]*(", "d{4})(?: *x(", "d+))?", "s*$"],
        Regex: [],
        RegExError: "",
        ErrorMessage: "Dealership  is required*",
        Tooltip: "Dealership",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Generate Page",
        Group: "FOOTER",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "",
        PlaceHolder: "Dealership*",
        Disabled: false,
        AdditionalData: {
            "& .MuiInputBase-adornedEnd": {
                borderRadius: 0,
                backgroundColor: "#433C4D",
                color: "white"
            }
        }
    },
    {
        Label: "",
        Required: true,
        Name: "Message",
        InitialValue: "",
        // Regex: ["^", "s*(?:", "+?(", "d{1,3}))?[-. (]*(", "d{3})[-. )]*(", "d{3})[-. ]*(", "d{4})(?: *x(", "d+))?", "s*$"],
        Regex: null,
        RegExError: "",
        ErrorMessage: "Message  is required*",
        Tooltip: "Message",
        HelperText: "",
        Type: "TextArea",
        List: null,
        Categery: "Generate Page",
        Group: "FOOTER",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "",
        PlaceHolder: "Message*",
        Disabled: false,
        AdditionalData: {
            borderRadius: 0,
            backgroundColor: "#433C4D",
            width: "53vw !important",
            "& .MuiInputBase-multiline": {
                color: "white",
                height: "20vh",
                alignItems: "flex-start"
            }
        }
    }
];
