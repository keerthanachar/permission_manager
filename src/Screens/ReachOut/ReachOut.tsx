import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";

import API from "../../API";
import HeaderComponent from "../../Components/Header/Header";
import GenerateForm from "../../Components/reusableComponents/GenerateForms";
import { RolesData } from "../../config";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetReachoutData } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { showAlert } from "../../Redux/Reducer";
import { validateFormOnSubmit } from "../../reusableFunctions/ReusableFunctions";

import { ReachOutConfig } from "./Uitilities";

const ReachOutForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, dealers } = useAppSelector((state) => state);

    const [selectedMiles, setSelectedMiles] = React.useState<any>({});
    const [selectedPrice, setSelectedPrice] = React.useState<any>({});

    const IsSuperAdmin = user?.RoleId === RolesData.SuperAdmin.RoleId;
    const IsRDAdmin = user?.RoleId === RolesData.RoadDealerAdmin.RoleId;

    const totalDealerShips = dealers?.filter((e: any) => e.IsDealerActive)?.map((ee: any) => ({ label: ee.Name, value: ee.DealerID }));
    const DealerShip: any =
        IsSuperAdmin || IsRDAdmin
            ? totalDealerShips
            : user?.Dealers?.filter((a: any) => a.IsDealerActive)?.map((e: any) => ({ label: e.Name, value: e.DealerID }));

    const [loading, setLoading] = React.useState(false);

    const reachoutObject = React.useMemo(() => {
        if (user?.RoleId === 1 || user?.RoleId === 2) {
            return ReachOutConfig?.map((e: any) => (e.Name === "Dealership" ? { ...e, Required: false } : e));
        }
        return ReachOutConfig;
    }, [user?.UserID]);
    const formikProps = useFormik({
        initialValues: {
            ...ReachOutConfig?.map((e: any) => ({ [e.Name]: e.InitialValue })).reduce((a: any, b = {}) => ({ ...b, ...a })),
            FirstName: user?.First_Name ?? "",
            LastName: user?.Last_Name ?? "",
            Email: user?.Email ?? "",
            PhoneNo: user?.Phone_No ?? "",
            Dealership: user?.RoleId === 4 ? DealerShip[0] : null
        },
        onSubmit: async (values: any) => {
            setLoading(true);
            try {
                const res: any = await API.Reachout.addReachout({
                    ...values,
                    DealerID: values?.Dealership?.value ?? null,
                    DealerName: values?.Dealership?.label ?? null,
                    UserID: user?.UserID,
                    Type: values.Type.value,
                    Make: values?.Make?.label,
                    Model: values?.Model?.label,
                    MinYear: values?.MinYear?.value,
                    MaxYear: values?.MaxYear?.value,
                    MinMiles: values?.MinMiles?.value,
                    MaxMiles: values?.MaxMiles?.value,
                    MinPrice: values?.MinPrice?.value,
                    MaxPrice: values?.MaxPrice?.value
                });
                if (res?.data?.status) {
                    setLoading(false);
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: "Requests Sent Successfully",
                            closeIcon: true
                        })
                    );
                    navigate(RoutesEnum.reachOutRequests);
                    dispatch(GetReachoutData(IsSuperAdmin || IsRDAdmin ? null : user?.UserID));
                } else {
                    setLoading(false);
                }
            } catch (error: any) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "error",
                        message: error?.response?.data?.message,
                        closeIcon: true
                    })
                );
                setLoading(false);
            }
        },
        validate: (values: any) => {
            if (values?.MinMiles) {
                if (values?.MinMiles?.value > values?.MaxMiles?.value) {
                    formikProps.setFieldValue("MaxMiles", "");
                }
                setSelectedMiles(values?.MinMiles);
            }
            if (values?.MinPrice) {
                if (values?.MinPrice?.value > values?.MaxPrice?.value) {
                    formikProps.setFieldValue("MaxPrice", "");
                }
                setSelectedPrice(values?.MinPrice);
            }
            return validateFormOnSubmit(values, [reachoutObject]);
        }
    });

    return (
        <Box component="form" noValidate p={3} pt={3} onSubmit={formikProps.handleSubmit}>
            <Grid container spacing={1} display="flex">
                <HeaderComponent
                    title="Let Us Find the Perfect Car for You"
                    // searchField
                    styles={{
                        paddingLeft: 1.5,
                        padding: 1,
                        paddingRight: 1.5
                    }}
                    backButton
                />
            </Grid>
            <Grid p={1}>
                <Paper>
                    <Box p={2}>
                        <Typography py={0.5} fontWeight={900}>
                            Contact Info
                        </Typography>
                        <Divider sx={{ borderColor: "#ececec" }} />
                        <Box pt={2}>
                            <GenerateForm
                                FormData={reachoutObject
                                    ?.map((e: any) =>
                                        e.Name === "Dealership"
                                            ? {
                                                  ...e,
                                                  List: DealerShip,
                                                  ReadOnly: user?.RoleId === 4
                                              }
                                            : e
                                    )
                                    .slice(0, 5)}
                                FormikProps={formikProps}
                                xl={4}
                                lg={4}
                                md={4}
                                sm={4}
                                spacing={2}
                            />
                        </Box>
                    </Box>
                    <Box p={2}>
                        <Typography fontWeight={900}>Vehicle Info</Typography>
                        <Divider sx={{ borderColor: "#ececec" }} />
                        <Box pt={2}>
                            <GenerateForm
                                FormData={reachoutObject
                                    ?.map((e: any) => (e.Name === "Dealership" ? { ...e, List: DealerShip } : e))
                                    .slice(5, 17)
                                    ?.map((e: any) =>
                                        e.Name === "MaxMiles"
                                            ? {
                                                  ...e,
                                                  List: selectedMiles ? e.List.filter((a: any) => a.value >= selectedMiles?.value) : e.List
                                              }
                                            : e
                                    )
                                    ?.map((e: any) =>
                                        e.Name === "MaxPrice"
                                            ? {
                                                  ...e,
                                                  List: selectedPrice ? e.List.filter((a: any) => a.value >= selectedPrice?.value) : e.List
                                              }
                                            : e
                                    )}
                                FormikProps={formikProps}
                                xl={4}
                                lg={4}
                                md={4}
                                sm={4}
                                spacing={2}
                            />
                        </Box>
                    </Box>
                    <Box p={2} sx={{ background: "#ececec" }}>
                        <Typography fontWeight={700}>
                            By submitting this form, you agree to be contacted by Road Dealer with information regarding the vehicle you are searching
                            for.
                        </Typography>
                    </Box>
                    <Box p={2} display="flex" justifyContent="end">
                        <Button variant="filled" disabled={loading} type="submit">
                            {loading ? "loading..." : "Reach Out"}
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Box>
    );
};
export default ReachOutForm;
