import React, { useState } from "react";

import TextField from "@mui/material/TextField";

import { PhoneNumberProps } from "./types";

const PhoneNumber: React.FC<PhoneNumberProps> = ({ placeHolder, sx }) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneChange = (event: any) => {
        const input = event.target.value;

        // Remove non-numeric characters except for '+'
        const numericValue = input.replace(/[^0-9+]/g, "");

        // Limit to 10 digits
        if (numericValue.length <= 10) {
            // Format the phone number
            let formattedNumber = "";

            if (numericValue.length <= 10) {
                // Format the phone number as +1 (XXX) XXX-XXXX
                formattedNumber = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
            } else {
                // Handle longer input (e.g., pasting)
                formattedNumber = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)} ${numericValue.slice(10)}`;
            }

            // Update the state
            setPhoneNumber(formattedNumber);
        }
    };
    const isValidPhoneNumber = (value: any) => {
        // Add your validation logic here if needed
        // For now, we'll consider any 10-digit number as valid
        return /^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(value);
    };
    const handleBlur = () => {
        // Remove leading and trailing spaces
        const trimmedNumber = phoneNumber.trim();

        // If the trimmed number is not valid, reset to an empty string
        if (!isValidPhoneNumber(trimmedNumber)) {
            setPhoneNumber("");
        }
    };

    return (
        <TextField
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder={placeHolder || "+1 (123) 456-7890"}
            sx={sx}
        />
    );
};

export default PhoneNumber;
