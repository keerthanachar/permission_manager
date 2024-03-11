import React, { useState } from "react";
import { useFormik } from "formik";

// import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

import API from "../../../../API";
import HoC from "../../../../Components/reusableComponents";
import Select from "../../../../Components/reusableComponents/Select";
import { RolesData } from "../../../../config";
// import SelectMultiple from "../../../../Components/reusableComponents/SelectMultiple";
// import RoutesEnum from "../../../../Enums/Routes.enum";
import { getAllUsersByDealerID, GetDealer } from "../../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { handleUpdateDealerUsers, showAlert } from "../../../../Redux/Reducer";
import { validateFormOnSubmit } from "../../../../reusableFunctions/ReusableFunctions";
import { en } from "../../../../translate/en";
// import { en } from "../../../../translate/en";
import { DealersUserDetailsConfig } from "../Uitility";

import DealerUserList from "./DealerUserList";

const UserDetailsForm = () => {
    const { theme, user, updatedDealer, dealerUsers, updateDealerUser, dealers } = useAppSelector((state) => state);
    const DealerAdminConfig = [
        {
            label: "Dealer Admin",
            value: 3
        }
    ];
    const DealerBuyerOrSeller = [
        {
            label: "Buyer and Seller",
            value: 4
        }
    ];
    const UpdateRoleConfig = [{ label: updateDealerUser?.RoleName, value: updateDealerUser?.RoleId }];
    const RoleConfig = updateDealerUser?.UserID
        ? UpdateRoleConfig
        : dealerUsers?.filter((ee: any) => ee.RoleId === RolesData.DealerAdmin.RoleId).length
        ? DealerBuyerOrSeller
        : DealerAdminConfig;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [Name, setName] = React.useState<any>(null);
    const [buttonClick, setButtonClick] = useState(0);
    const [selectedOption, setSelectedOption] = useState("newDealerAdmin");
    // const [dealershipName, setDealershipName] = React.useState<any>([]);
    const handleClick = async () => {
        try {
            setButtonClick(+1);
            if (Name?.DealerID) {
                const res: any = await API.Dealer.addDealership({
                    UserID: Name?.MainContact?.UserID,
                    DealerID: updatedDealer?.DealerID,
                    CreatedBy: user?.Email
                });
                if (res?.data?.status) {
                    dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
                    setButtonClick(0);
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: "Dealer Admin Associated Successfully",
                            closeIcon: true
                        })
                    );
                }
            }
        } catch (error) {
            setButtonClick(0);

            dispatch(
                showAlert({
                    open: true,
                    type: "error",
                    message: en.internalServerError,
                    closeIcon: true
                })
            );
        }
    };
    const formikProps = useFormik({
        initialValues: {
            ...DealersUserDetailsConfig?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            ...updateDealerUser
        },
        onSubmit: async (values: any) => {
            if (updateDealerUser?.UserID) {
                try {
                    setButtonClick(+1);
                    const res: any = await API.Users.updateUsers({
                        ...values,
                        DealerID: updateDealerUser?.DealerID,
                        RoleId: values?.RoleName?.value || values?.RoleId,
                        RoleName: values?.RoleName?.label || values?.RoleName,
                        ModifiedBy: user?.Email
                    });
                    if (res?.data?.data?.status) {
                        dispatch(
                            showAlert({
                                open: true,
                                type: "success",
                                message: `${values?.RoleName?.label || values?.RoleName} Updated Successfully`,
                                closeIcon: true
                            })
                        );
                        dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
                        dispatch(GetDealer());
                        setButtonClick(0);
                        dispatch(handleUpdateDealerUsers({}));
                    } else {
                        dispatch(showAlert({ open: true, type: "error", message: res?.data?.data?.message, closeIcon: true }));
                    }
                } catch (error: any) {
                    setButtonClick(0);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            } else {
                try {
                    setButtonClick(+1);
                    const res: any = await API.Users.addUsers({
                        ...values,
                        DealerID: updatedDealer?.DealerID,
                        RoleId: values?.RoleName?.value,
                        RoleName: values?.RoleName?.label,
                        CreatedBy: user?.Email
                    });
                    if (res?.data?.data?.status) {
                        dispatch(
                            showAlert({ open: true, type: "success", message: `${values?.RoleName?.label} Added Successfully`, closeIcon: true })
                        );
                        dispatch(GetDealer());
                        dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
                        // if (dealershipName?.length && res?.data?.data.UserID) {
                        //     await Promise.all(
                        //         dealershipName.map(async (e: any) => {
                        //             const resp: any = await API.Dealer.addDealership({
                        //                 UserID: res?.data?.data.UserID,
                        //                 DealerID: e?.DealerID,
                        //                 CreatedBy: user?.Email
                        //             });
                        //             // eslint-disable-next-line no-console
                        //             console.log("resp", resp);
                        //         })
                        //     );
                        // }
                        formikProps.resetForm();
                        setButtonClick(0);
                    } else {
                        setButtonClick(0);
                        dispatch(showAlert({ open: true, type: "error", message: res?.data?.data?.message, closeIcon: true }));
                    }
                } catch (error: any) {
                    setButtonClick(0);
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            }
        },
        enableReinitialize: true,
        validate: (values: any) => {
            return validateFormOnSubmit(values, [DealersUserDetailsConfig]);
        }
    });
    // const [loading, setLoading] = useState(false);
    // React.useEffect(() => {
    //     setLoading(formikProps.values.IsActive);
    //     if (formikProps.submitCount && Object.keys(formikProps.errors).length > 1) {
    //         setErrorMessage("Please fill all the required details");
    //     } else {
    //         setErrorMessage("");
    //     }

    //     const timeoutId = setTimeout(() => {
    //         setLoading(false);
    //     }, 3000);

    //     return () => clearTimeout(timeoutId);
    // }, [formikProps.values.IsActive]);
    React.useEffect(() => {
        if (selectedOption === "associateDealerAdmin") {
            if (buttonClick > 0 && !Name?.DealerID) {
                setErrorMessage("Please fill all the required details");
            } else {
                setErrorMessage("");
            }
        }
    }, [buttonClick, Name]);
    React.useEffect(() => {
        if (selectedOption === "newDealerAdmin" && buttonClick && Object.keys(formikProps.errors).length > 0) {
            setErrorMessage("Please fill all the required details");
        } else {
            setErrorMessage("");
        }
    }, [buttonClick, formikProps.errors]);
    const isDealerAdminIncluded = dealerUsers?.some((item: any) => item?.RoleId === 3);
    React.useEffect(() => {
        dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
    }, []);
    // const UserFiltered = dealers
    //     ?.filter((item: any) => item.MainContact === null && item?.DealerID !== updatedDealer?.DealerID)
    //     .map((a: any) => ({
    //         ...a,
    //         label: `${a?.Name}`,
    //         value: a?.DealerID
    //     }));
    const DealerAdminFiltered: any = dealers
        ?.filter((item: any) => item.MainContact !== null)
        .reduce((uniqueList: any, a: any) => {
            const value = a?.MainContact?.UserID;
            if (value && !uniqueList.some((item: any) => item.value === value)) {
                uniqueList.push({
                    ...a,
                    label: `${a?.MainContact?.First_Name ?? ""} ${a?.MainContact?.Last_Name ?? ""}`,
                    value
                });
            }
            return uniqueList;
        }, []);

    return (
        <Box
            component="form"
            noValidate
            onSubmit={Name?.DealerID ? handleClick : formikProps.handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
            p={5}
        >
            <Box>
                <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Select Option</FormLabel> */}
                    <RadioGroup
                        aria-label="form-option"
                        name="form-option"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: 3,
                            gap: 3,
                            "& .css-ij9csu-MuiFormControlLabel-root .MuiFormControlLabel-label": { fontWeight: "bold" }
                        }}
                    >
                        <FormControlLabel
                            className="bold-label"
                            value="newDealerAdmin"
                            control={<Radio />}
                            label="New User"
                            onChange={() => setName(null)}
                        />
                        <FormControlLabel
                            onChange={() => formikProps.resetForm()}
                            value="associateDealerAdmin"
                            control={<Radio sx={{ cursor: isDealerAdminIncluded ? "not-allowed" : "pointer" }} />}
                            label="Associate Existing Dealer Admin"
                            className="bold-label"
                            disabled={isDealerAdminIncluded}
                        />
                    </RadioGroup>
                </FormControl>
                {selectedOption === "associateDealerAdmin" && !isDealerAdminIncluded && (
                    <Box width="50%">
                        <Typography variant="body2" fontWeight={700}>
                            {"Associate Dealer Admin" || ""}
                        </Typography>
                        {/* Add your Associate Dealer Admin content here */}
                        <Select
                            id="DealerAdmin"
                            value={Name}
                            label="Dealer Admin"
                            fieldDisabled={formikProps.values?.RoleName}
                            onChange={(e: any) => setName(e)}
                            list={DealerAdminFiltered ?? []}
                        />
                    </Box>
                )}
                {selectedOption === "newDealerAdmin" && (
                    <Box>
                        {/* Your existing GenerateForm component */}
                        <HoC.GenerateForm
                            FormData={DealersUserDetailsConfig?.map((e: any) => (e.Name === "RoleName" ? { ...e, List: RoleConfig || e?.List } : e))}
                            FormikProps={formikProps}
                            lg={6}
                            xl={6}
                            md={6}
                            xs={12}
                        />

                        {/* {formikProps.values.RoleName?.value === 3 && (
                                    <Box width="50%">
                                        <Typography variant="body2" fontWeight={700}>
                                            {"Associate Dealership" || ""}
                                        </Typography>
                                        <SelectMultiple
                                            value={dealershipName}
                                            id="Dealers"
                                            name="MultipleDealership"
                                            label={en.selectDealership}
                                            onChange={(e: any) => setDealershipName(e)}
                                            list={UserFiltered || []}
                                        />
                                    </Box>
                                )} */}
                    </Box>
                )}
                {errorMessage && (
                    <Typography color={theme?.errorColor?.[theme.mode]?.main} textAlign="center">
                        {errorMessage}
                    </Typography>
                )}
                <Box mt={2} />
                <Box display="flex" width="100%" justifyContent="center" gap={2}>
                    <Button
                        variant="outlined"
                        sx={{ width: "153px", borderRadius: 0 }}
                        onClick={() => {
                            dispatch(handleUpdateDealerUsers({}));
                            // navigate(RoutesEnum.dealers);
                            formikProps.resetForm();
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        variant="filled"
                        type={Name?.DealerID ? "button" : "submit"}
                        sx={{ width: selectedOption === "associateDealerAdmin" ? "156px" : "153px" }}
                        onClick={handleClick}
                    >
                        {updateDealerUser?.UserID ? "Update User" : selectedOption === "associateDealerAdmin" ? "Associate Admin" : "Create User"}
                    </Button>
                </Box>
                <Box mt={2} />
                <Box>
                    <DealerUserList />
                </Box>
            </Box>
        </Box>
    );
};

export default UserDetailsForm;
