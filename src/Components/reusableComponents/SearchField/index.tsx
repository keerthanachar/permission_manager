import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";

import { InputAdornment, TextField } from "@mui/material";

const SearchFiled = ({ style, dataList, searchDatas }: any) => {
    const [data, setData] = useState(dataList);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: any) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filteredData = dataList?.filter(
            (item: any) =>
                Object.values(item.ProductList || item).some(
                    (value: any) => (typeof value === "string" || "number") && value?.toString().includes(term)
                ) ||
                (item.Dealers &&
                    Object.values(item.Dealers).some(
                        (dealersValue) => (typeof dealersValue === "string" || "number") && dealersValue?.toString().includes(term)
                    )) ||
                (item?.Inventory &&
                    Object.values(item?.Inventory?.[0]).some(
                        (value: any) => (typeof value === "string" || "number") && value?.toString().includes(term)
                    ))
        );

        setData(filteredData);
    };

    useEffect(() => {
        searchDatas(data);
    }, [data]);
    return (
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            sx={[
                {
                    backgroundColor: "#fff",
                    border: "none",
                    "& .MuiOutlinedInput-root": {
                        // - The Input-root, inside the TextField-root
                        "& fieldset": {
                            // - The <fieldset> inside the Input-root
                            borderColor: "#ffffff00" // - Set the Input border
                        },
                        "&:hover fieldset": {
                            borderColor: "#ffffff00" // - Set the Input border when parent has :hover
                        },
                        "&.Mui-focused fieldset": {
                            // - Set the Input border when parent is focused
                            borderColor: "#ffffff00"
                        },
                        "& input": {
                            fontSize: "14px"
                        }
                    }
                },
                style
            ]}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <GoSearch />
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchFiled;
