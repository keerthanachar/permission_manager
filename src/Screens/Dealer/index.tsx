import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid } from "@mui/material";

import Header from "../../Components/Header/Header";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetDealer } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleUpdateDealer } from "../../Redux/Reducer";

import ExistingDealer from "./ExistingDealers/ExistingDealer";
import DealerSignup from "./Signups/DealerSignup";
import DealerAdmin from "./DealerAdmin";

const Dealer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, dealers, dealerState, dealerLoader } = useAppSelector((state) => state);

    const SelectedButton = user.RoleId === 1 || user.RoleId === 2 ? "existingDealer" : "dealers";
    // eslint-disable-next-line no-unneeded-ternary
    const initialSelectedButton = dealerState ? dealerState : SelectedButton;

    const [selectedButton, setSelectedButton] = useState(initialSelectedButton);
    const { breakPoints } = useAppSelector((state) => state);
    const [searchData, setSearchData] = useState(dealers || []);
    const handleSignupClick = () => {
        setSelectedButton("signups");
    };
    const handleExistingDealerClick = () => {
        setSelectedButton("existingDealer");
    };
    const handleDealersClick = () => {
        setSelectedButton("dealers");
    };
    const handleDealerUsersClick = () => {
        setSelectedButton("users");
    };

    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 6)?.[0];

    useEffect(() => {
        setSearchData(dealers);
    }, [dealers]);
    useEffect(() => {
        dispatch(GetDealer());
    }, []);

    return (
        <Box component="div" width="100%">
            <Grid container spacing={1} mt={2}>
                <Header
                    title={selectedButton === "users" ? "Users" : "Dealers"}
                    searchField
                    button={screen.IsAdd}
                    styles={{
                        paddingLeft: 6
                    }}
                    buttontext="CREATE DEALER"
                    handleClick={() => {
                        dispatch(handleUpdateDealer({}));
                        navigate(RoutesEnum.createDealers);
                    }}
                    data={dealers}
                    searchData={setSearchData}
                />
            </Grid>
            <Box component="div" width="100%" height="70vh" mt={2} px={3}>
                <Grid container spacing={1}>
                    <Grid item lg={12}>
                        {user.RoleId === 1 || user.RoleId === 2 ? (
                            <Box display="flex" justifyContent="space-between" alignItems="center" px={1.5}>
                                <Box
                                    display="flex"
                                    justifyContent={breakPoints?.sm ? "start" : "center"}
                                    flexWrap={breakPoints?.sm ? "nowrap" : "wrap"}
                                    gap={2}
                                >
                                    <Button
                                        variant="elevated"
                                        sx={{
                                            backgroundColor: selectedButton === "existingDealer" ? "#A462FF" : "none",
                                            color: selectedButton === "existingDealer" ? "white" : "black"
                                        }}
                                        onClick={handleExistingDealerClick}
                                    >
                                        Existing Dealers
                                    </Button>
                                    <Button
                                        variant="elevated"
                                        sx={{
                                            backgroundColor: selectedButton === "signups" ? "#A462FF" : "none",
                                            color: selectedButton === "signups" ? "white" : "black"
                                        }}
                                        onClick={() => handleSignupClick()}
                                    >
                                        Sign Ups
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box display="flex" justifyContent="space-between" alignItems="center" px={1.5}>
                                <Box
                                    display="flex"
                                    justifyContent={breakPoints?.sm ? "start" : "center"}
                                    flexWrap={breakPoints?.sm ? "nowrap" : "wrap"}
                                    gap={2}
                                >
                                    <Button
                                        variant="elevated"
                                        sx={{
                                            backgroundColor: selectedButton === "dealers" ? "#A462FF" : "none",
                                            color: selectedButton === "dealers" ? "white" : "black"
                                        }}
                                        onClick={() => handleDealersClick()}
                                    >
                                        Dealers
                                    </Button>
                                    <Button
                                        variant="elevated"
                                        sx={{
                                            backgroundColor: selectedButton === "users" ? "#A462FF" : "none",
                                            color: selectedButton === "users" ? "white" : "black"
                                        }}
                                        onClick={handleDealerUsersClick}
                                    >
                                        Users
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                    <Grid item lg={12}>
                        {user.RoleId === 1 || user.RoleId === 2 ? (
                            <>
                                {selectedButton === "signups" && <DealerSignup dealers={searchData} loader={dealerLoader} />}
                                {selectedButton === "existingDealer" && <ExistingDealer dealers={searchData} loader={dealerLoader} />}
                            </>
                        ) : (
                            <>
                                {selectedButton === "dealers" && <ExistingDealer dealers={searchData} loader={dealerLoader} />}
                                {selectedButton === "users" && <DealerAdmin />}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dealer;
