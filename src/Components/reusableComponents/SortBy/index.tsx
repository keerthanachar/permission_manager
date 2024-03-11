import * as React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SortBy = ({ onClick }: any) => {
    const [seletedValue, setSeletedValue] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setSeletedValue(event.target.value);
        onClick(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                displayEmpty
                renderValue={(selected: any) => {
                    if (selected === "") {
                        return "Sort By :";
                    }

                    return selected === 0 ? "Price: Low to High" : "Price: High to Low";
                }}
                IconComponent={ExpandMoreIcon}
                sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        border: 0
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: 0
                    }
                }}
                value={seletedValue}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={0}>Price: Low to High</MenuItem>
                <MenuItem value={1}>Price: High to Low</MenuItem>
            </Select>
        </FormControl>
    );
};
export default SortBy;
