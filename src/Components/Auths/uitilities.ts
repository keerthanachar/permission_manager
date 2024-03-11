export const LoginConfig = [
    {
        Label: "",
        Required: true,
        Name: "Phone",
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
        Group: "CONTACT_DETAIL",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Mobile Number",
        PlaceHolder: "Enter Mobile Number",
        Disabled: false
    }
];

export const SignupConfig = [
    {
        Label: "",
        Required: true,
        Name: "Name",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Dealer Name",
        ErrorMessage: "Dealer Name is required*",
        Tooltip: "Dealer Name",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Generate Page",
        Group: "Report_Data",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Dealer Name",
        PlaceHolder: "Enter Name",
        Disabled: false,
        AdditionalData: {
            "& .MuiInputBase-input": {
                fontSize: "12px" // Adjust the font size as needed
            }
        }
    },
    {
        Label: "",
        Required: true,
        Name: "Address_1",
        InitialValue: "",
        Regex: [],
        RegExError: "Please enter Dealer Address",
        ErrorMessage: "Dealer Address is required*",
        Tooltip: "Dealer Address",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Generate Page",
        Group: "Report_Data",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Dealer Address",
        PlaceHolder: "Enter Address",
        Disabled: false,
        rows: 1,
        AdditionalData: {
            "& .MuiInputBase-input": {
                fontSize: "12px" // Adjust the font size as needed
            }
        }
    },
    {
        Label: "",
        Required: true,
        Name: "Email",
        InitialValue: "",
        Regex: ["^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\\.)+[a-zA-Z]{2,7}$"],
        RegExError: "Please enter Email",
        ErrorMessage: "Email is required*",
        Tooltip: "Email",
        HelperText: "",
        Type: "text",
        List: null,
        Categery: "Generate Page",
        Group: "Report_Data",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Email",
        PlaceHolder: "Enter Email",
        Disabled: false,
        AdditionalData: {
            "& .MuiInputBase-input": {
                fontSize: "12px" // Adjust the font size as needed
            }
        }
    },
    {
        Label: "",
        Required: true,
        Name: "PhoneNo",
        InitialValue: "",
        Regex: ["^\\s*\\d{10}\\s*$"],
        RegExError: "Please enter Phone Number",
        ErrorMessage: "Phone Number is required*",
        Tooltip: "Phone Number",
        HelperText: "",
        Type: "phoneNumber",
        List: null,
        Categery: "Generate Page",
        Group: "Report_Data",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        Header: "Phone",
        PlaceHolder: "Enter Phone Number",
        Disabled: false
    }
];

export const OtpConfig = [
    {
        Label: "",
        Required: true,
        Name: "otp",
        InitialValue: "",
        Regex: ["^\\s*\\d{6}\\s*$"],
        RegExError: "Please enter valid code sent to your Mobile Number",
        ErrorMessage: "Code is Required",
        Tooltip: "Enter Your Code",
        HelperText: "A 6 digit code was sent to your Mobile number",
        Type: "number",
        List: null,
        Categery: "OTP_Login",
        Group: "List_Data",
        MinValue: null,
        MaxValue: null,
        Multiple: 0,
        PlaceHolder: "Enter Code",
        Disabled: false
    }
];
