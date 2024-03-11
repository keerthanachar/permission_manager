import React, { useState } from "react";
import { toast } from "react-toastify";

import { Box, Button, Checkbox, Grid, Typography } from "@mui/material";

import API from "../../API";
import HoC from "../../Components/reusableComponents";
import { GetRoleDetailsByRoleId } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { en } from "../../translate/en";

import { actionsProps } from "./types";

const PermissionsComponent: React.FC<actionsProps> = ({ data, selectedRole }) => {
    const dispatch = useAppDispatch();
    const { breakPoints } = useAppSelector((state) => state);
    const [loading, setloading] = useState(false);
    const [dailogOpen, setDailogOpen] = useState(false);
    const [notify, setNotify] = useState(false);

    const [add, setAdd] = useState(data?.row?.original?.IsAdd || false);
    const [view, setView] = useState(data?.row?.original?.IsView || false);
    const [edit, setEdit] = useState(data?.row?.original?.IsEdit || false);
    const [deleteOption, setDelete] = useState(data?.row?.original?.IsDelete || false);

    const handleUpdate = async () => {
        setloading(true);
        try {
            const res: any = await API.RoleManagement.updateRoledetails({
                ...data?.row?.original,
                IsAdd: Boolean(add),
                IsView: Boolean(view),
                IsEdit: Boolean(edit),
                IsDelete: Boolean(deleteOption)
            });
            setDailogOpen(false);
            if (res?.data?.status) {
                setNotify(true);
                setloading(false);
            }
        } catch (error: any) {
            setloading(false);
            toast.error(error);
        }
    };
    const handleClose = () => {
        dispatch(GetRoleDetailsByRoleId(selectedRole.value));
        setDailogOpen(false);
        setAdd(data?.row?.original?.IsAdd);
        setView(data?.row?.original?.IsView);
        setEdit(data?.row?.original?.IsEdit);
        setDelete(data?.row?.original?.IsDelete);
    };

    return (
        <Box component="div" display="flex" justifyContent="center" alignItems="center">
            <Grid container lg={12}>
                <Grid item xl={1.5} lg={2} md={2} sm={4}>
                    <Typography variant="body2" fontWeight={500}>
                        <Checkbox checked={add} onChange={() => setAdd(!add)} />
                        {en.add}
                    </Typography>
                </Grid>
                <Grid item xl={1.5} lg={2} md={2} sm={4}>
                    <Typography variant="body2" fontWeight={500}>
                        <Checkbox checked={view} onChange={() => setView(!view)} />
                        {en.view}
                    </Typography>
                </Grid>
                <Grid item xl={1.5} lg={2} md={2} sm={4}>
                    <Typography variant="body2" fontWeight={500}>
                        <Checkbox checked={edit} onChange={() => setEdit(!edit)} />
                        {en.edit}
                    </Typography>
                </Grid>
                <Grid item xl={1.5} lg={2} md={2} sm={4}>
                    <Typography variant="body2" fontWeight={500}>
                        <Checkbox checked={deleteOption} onChange={() => setDelete(!deleteOption)} />
                        {en.delete}
                    </Typography>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}>
                    <Button variant="outlined" onClick={() => setDailogOpen(true)}>
                        {en.update}
                    </Button>
                </Grid>
            </Grid>
            <HoC.DialogBox title="Confirm" open={dailogOpen} onClose={() => setDailogOpen(false)}>
                {loading ? (
                    <HoC.Spinner open={loading} />
                ) : (
                    <>
                        <Box display="flex" justifyContent="center">
                            <Typography>{en.areYouSure}</Typography>
                        </Box>
                        <Box
                            component="div"
                            marginTop={1.5}
                            display="flex"
                            flexDirection={breakPoints?.sm ? "row" : "column-reverse"}
                            gap={1}
                            justifyContent="flex-end"
                            width="100%"
                            py={1}
                        >
                            <Box width="100%" display="flex" justifyContent="flex-end" gap={2}>
                                <Button variant="outlined" onClick={handleClose}>
                                    {en.cancel}
                                </Button>
                                <Button variant="filled" onClick={handleUpdate}>
                                    {en.yes}
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </HoC.DialogBox>
            <HoC.DialogBox title="Confirm" open={notify} onClose={() => setNotify(false)}>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>
                            {"Permissions for the role "}
                            <Box component="span" sx={{ fontWeight: 750 }}>
                                {data?.row?.original?.Role}
                            </Box>
                            {" have been updated successfully!"}
                        </Typography>
                    </Box>
                    <Box
                        component="div"
                        marginTop={1.5}
                        display="flex"
                        flexDirection={breakPoints?.sm ? "row" : "column-reverse"}
                        gap={1}
                        justifyContent="flex-end"
                        width="100%"
                        py={1}
                    >
                        <Box display="flex" gap={2}>
                            <Button
                                variant="filled"
                                onClick={() => {
                                    setNotify(false);
                                    dispatch(GetRoleDetailsByRoleId(selectedRole.value));
                                }}
                            >
                                {en.ok}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </HoC.DialogBox>
        </Box>
    );
};

export default PermissionsComponent;
