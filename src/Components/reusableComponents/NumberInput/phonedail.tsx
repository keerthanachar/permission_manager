import React, { useState } from "react";
import Input from "react-phone-number-input/input";

import { Box } from "@mui/material";

import "react-phone-number-input/style.css";

interface NumberInputProps {
    id?: string;
    value: string | null;
    name?: string;
    label?: string;
    onChange: (value: string) => void;
    required?: boolean | null;
    error?: boolean;
    toolTip?: string;
    placeholder?: string;
    helperText?: string;
    defaultValue?: string;
    disabled?: boolean;
    onBlur?: any;
    errorText?: any;
    type?: string;
    sx?: any;
    readOnly?: any;
    rows?: any;
    regexPattern?: any;
}

const PhoneNumberInput: React.FC<NumberInputProps> = ({
    value,
    readOnly,
    onChange,
    placeholder,
    error,
    errorText,
    required,
    sx,
    onBlur,
    id,
    name
}: any) => {
    const [showError, setError] = useState<string | null>(null);

    const handleInputChange = (newValue: any) => {
        if (newValue?.length === 12) {
            setError(null);
        } else {
            setError("Please enter a valid 10-digit phone number.");
        }
        if (onChange) {
            onChange(newValue);
        }
    };
    const inputStyle = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: "40px",
        fontSize: "17px",
        paddingLeft: "10px",
        border: `1px solid ${showError || error ? "#db2f2f" : sx ? "#433C4D" : "#e1e1e1"}`,
        borderRadius: "8px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: sx ? "#433C4D" : "",
        color: sx ? "white" : ""
    };
    const onPaste = (event: any) => {
        const pastedText = (event?.clipboardData || window.Clipboard)?.getData("text");
        handleInputChange(pastedText);
    };

    return (
        <Box paddingY={1} display="flex" justifyContent="space-around" gap={2} alignItems="center" position="relative" height="auto">
            <Input
                country="US"
                onPaste={onPaste}
                value={value}
                // international
                // withCountryCallingCode
                onChange={(inputValue) => handleInputChange(inputValue)}
                style={inputStyle}
                placeholder={placeholder}
                maxLength={14}
                helperText={error || showError ? errorText : ""}
                required={required}
                onBlur={onBlur}
                id={id}
                readOnly={readOnly}
                name={name}
                error={error}
            />
        </Box>
    );
};

export default PhoneNumberInput;
