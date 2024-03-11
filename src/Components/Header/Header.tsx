import React from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";

import { useAppSelector } from "../../Redux/hooks";
import BackButton from "../reusableComponents/BackButton";
import SearchFiled from "../reusableComponents/SearchField";

import { DashboardHeaderProps } from "./types";

const HeaderComponent: React.FC<DashboardHeaderProps> = ({
    title,
    subtitle,
    searchField,
    button,
    buttontext,
    handleClick,
    styles,
    children,
    backButton,
    data,
    searchData,
    divider = true,
    handleBackButtonClick
}) => {
    const { breakPoints } = useAppSelector((state) => state);
    const handleSearch = (val: any) => {
        searchData?.(val);
    };
    return (
        <Box width="100%" display="flex" flexDirection="column" gap={2}>
            <Box
                component="div"
                width="100%"
                display="flex"
                justifyContent="space-between"
                px={styles?.padding || 4.5}
                pl={styles?.paddingLeft || (button ? 3 : 4.5)}
                pr={styles?.paddingRight || (button ? 0 : 4.5)}
                sx={{ flexWrap: breakPoints?.sm ? "nowrap" : "wrap" }}
            >
                <Grid container alignItems="center">
                    <Grid item xs={12} md={button ? 6 : 8}>
                        <Typography variant="h6" fontWeight={styles?.fontWeight || 700} color={styles?.color || undefined}>
                            {title || children}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {subtitle}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={button ? 6 : 4}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        pt={breakPoints?.sm ? 0 : 2}
                        gap={breakPoints?.sm ? 0.5 : 2}
                    >
                        {searchField && (
                            <Box width={button && breakPoints?.sm ? "45%" : "80%"} px={1}>
                                <SearchFiled dataList={data} searchDatas={handleSearch} />
                            </Box>
                        )}
                        {button ? (
                            <Box display="flex" alignItems="center" justifyContent={breakPoints?.sm ? "start" : "center"}>
                                <Button
                                    variant="filled"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: styles?.fontSize ? styles?.fontSize : {}
                                    }}
                                    onClick={handleClick}
                                >
                                    <AddRoundedIcon />
                                    {buttontext}
                                </Button>
                            </Box>
                        ) : (
                            <> </>
                        )}
                    </Grid>
                </Grid>
            </Box>
            {divider ? <Divider sx={{ opacity: 0.1 }} /> : ""}
            {backButton && (
                <Box pl={styles?.paddingLeft || (button ? 5 : 4.5)} onClick={handleBackButtonClick}>
                    <BackButton />
                </Box>
            )}
        </Box>
    );
};

export default HeaderComponent;
