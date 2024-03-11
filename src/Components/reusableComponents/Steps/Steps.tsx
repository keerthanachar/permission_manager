import * as React from "react";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { Stepsprops } from "./types";

const Steps: React.FC<Stepsprops> = ({ steps }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label: any) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default Steps;
