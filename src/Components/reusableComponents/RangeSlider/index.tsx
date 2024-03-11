import React, { useState } from "react";

import Slider from "@mui/material/Slider";

import { PriceRangeSliderProps } from "./types";

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ value: propValue, onChange, min: propMin, max: propMax, scale: propScale }) => {
    const [value, setValue] = useState<number[]>(propValue || [propMin || 0, propMax || 100]); // Initialize with default values if not provided
    const min = propMin; // Use provided min or default to 0
    const max = propMax; // Use provided max or default to 100
    const scale = propScale || ((v: number) => v); // Default to identity function if no scale is provided

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        onChange(newValue as number[]);
    };
    return (
        <div>
            <Slider
                style={{ maxWidth: 500 }}
                value={value}
                min={min}
                step={1000}
                max={max}
                valueLabelFormat={(num) => `${num}`}
                scale={(v) => scale(v)}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="price-range-slider"
                sx={{
                    "& .MuiSlider-thumb": {
                        backgroundColor: "#2198ca",
                        width: 15,
                        height: 15,
                        border: "2px solid #FFF"
                    }
                }}
            />
        </div>
    );
};

export default PriceRangeSlider;
