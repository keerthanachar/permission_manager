import React from "react";
import { useFormik } from "formik";

import { Box, Button, IconButton, Paper, Typography } from "@mui/material";

import API from "../../API";
import { ReactComponent as CloseIcon } from "../../Assets/Close-circle.svg";
import GenerateForm from "../../Components/reusableComponents/GenerateForms";
import { RolesData } from "../../config";
import { getAllUsers } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleModel, showAlert } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";

import { actionsProps } from "./types";
import { AddAdministratorConfig } from "./Uitilities";

const AddAdministratorForm: React.FC<actionsProps> = () => {
    const dispatch = useAppDispatch();
    const { updateRoadDealerAdmin, user } = useAppSelector((state) => state);
    const formikProps = useFormik({
        initialValues: {
            ...AddAdministratorConfig?.map((e: any) => ({ [e.Name]: e.initialValues })).reduce((a: any, b: any) => ({ ...a, ...b })),
            ...updateRoadDealerAdmin
        },
        onSubmit: async (values: any) => {
            if (updateRoadDealerAdmin?.UserID) {
                try {
                    const res: any = await API.Users.updateUsers({ ...values, ModifiedBy: user?.Email });
                    if (res?.data?.data?.status) {
                        dispatch(handleModel({ open: false }));
                        dispatch(showAlert({ open: true, type: "success", message: "Road Dealer Admin Updated Successfully", closeIcon: true }));
                        await dispatch(getAllUsers());
                    } else {
                        dispatch(showAlert({ open: true, type: "error", message: res?.data?.data[0]?.message, closeIcon: true }));
                    }
                } catch (error: any) {
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            } else {
                try {
                    const res: any = await API.Users.addUsers({
                        ...values,
                        RoleId: RolesData?.RoadDealerAdmin?.RoleId,
                        RoleName: RolesData?.RoadDealerAdmin?.RoleName,
                        IsActive: true,
                        CreatedBy: user?.Email
                    });
                    if (res?.data?.data?.status) {
                        dispatch(handleModel({ open: false }));
                        dispatch(showAlert({ open: true, type: "success", message: "Road Dealer Admin Added Successfully", closeIcon: true }));
                        await dispatch(getAllUsers());
                    } else {
                        dispatch(showAlert({ open: true, type: "error", message: res?.data?.data?.message, closeIcon: true }));
                    }
                } catch (error: any) {
                    dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
                }
            }
        },
        validate: (values: any) => {
            return validateFormOnSubmit(values, [AddAdministratorConfig]);
        }
    });
    return (
        <Box component="form" onSubmit={formikProps.handleSubmit}>
            <Box component={Paper} width="100%" p={3} sx={{ borderRadius: 1 }}>
                <Box display="flex" justifyContent="center" flexDirection="column" alignContent="center">
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => dispatch(handleModel({ open: false }))}>
                            <CloseIcon fill="#000" />
                        </IconButton>
                    </Box>
                    <Box display="flex" justifyContent="center" pt={0} pb={2}>
                        <Typography variant="h6" fontWeight={700}>
                            {`${updateRoadDealerAdmin?.UserID ? "Edit" : "Add"} Administrator`}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <GenerateForm FormData={AddAdministratorConfig} FormikProps={formikProps} />
                </Box>
                <Box display="flex" justifyContent="center" pb={1} pt={2}>
                    <Button type="submit" variant="filled" sx={{ width: 300 }}>
                        {`${updateRoadDealerAdmin?.UserID ? "UPDATE" : "ADD"} ADMINISTRATOR`}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddAdministratorForm;
