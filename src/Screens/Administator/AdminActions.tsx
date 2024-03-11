import React from "react";
import { BiEdit } from "react-icons/bi";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, Typography } from "@mui/material";

import API from "../../API";
import unlinkIcon from "../../Assets/Icon awesome-unlink.svg";
import HoC from "../../Components/reusableComponents";
import { getAllUsers } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleModel, handleUpdateRoadDealerAdmin, showAlert } from "../../Redux/Reducer";
import { en } from "../../translate/en";

import { actionsTypeProps } from "./types";

const AdminActions: React.FC<actionsTypeProps> = ({ row }) => {
    const dispatch = useAppDispatch();
    const { breakPoints, user } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState<boolean>(false);
    const [deactivate, setDeactivate] = React.useState<boolean>(false);

    const handleEdit = () => {
        dispatch(handleUpdateRoadDealerAdmin(row));
        dispatch(handleModel({ open: true, type: "Administrator" }));
    };
    const handleDelete = async () => {
        try {
            const res: any = await API.Users.deleteUsers({ UserID: row?.UserID, DealerID: null, ModifiedBy: user?.Email });
            if (res?.data?.status) {
                dispatch(showAlert({ open: true, type: "success", message: "Road Dealer Admin Deleted Successfully", closeIcon: true }));
                setConfirm(false);
                await dispatch(getAllUsers());
            }
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
        }
    };
    const handleDeactivate = async () => {
        try {
            const res: any = await API.Users.updateUsers({ ...row, IsActive: !row?.IsActive });
            if (res?.data?.data?.status) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: row?.IsActive ? "Road Dealer Admin Deactivated Successfully" : "Road Dealer Admin Activated Successfully",
                        closeIcon: true
                    })
                );
                await dispatch(getAllUsers());
                setDeactivate(false);
            }
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
        }
    };
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Box display="flex" alignItems="center" gap={1} sx={{ width: 130, cursor: "pointer" }} onClick={() => setDeactivate(true)}>
                <img src={unlinkIcon} width="13px" alt="Deactivate & Activate" />
                <Typography>{row?.IsActive ? "Deactivate" : "Activate"}</Typography>
            </Box>
            <Divider sx={{ backgroundColor: "#fff", height: 22 }} orientation="vertical" variant="middle" flexItem />
            <Box display="flex" alignItems="center" gap={1} sx={{ width: 70, cursor: "pointer" }} onClick={handleEdit}>
                <BiEdit fontSize={24} />
                <Typography>Edit</Typography>
            </Box>
            <Divider sx={{ backgroundColor: "#fff", height: "auto" }} orientation="vertical" variant="middle" flexItem />
            <Box display="flex" alignItems="center" gap={1} sx={{ width: 50, cursor: "pointer" }} onClick={() => setConfirm(true)}>
                <DeleteIcon />
                <Typography>Delete</Typography>
            </Box>
            <HoC.DialogBox title="Confirm" open={confirm} onClose={() => setConfirm(false)}>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>{en.areYouWantToDelete}</Typography>
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
                            <Button variant="outlined" onClick={() => setConfirm(false)}>
                                {en.cancel}
                            </Button>
                        </Box>
                        <Box display="flex" gap={2}>
                            <Button variant="filled" onClick={handleDelete}>
                                {en.ok}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </HoC.DialogBox>
            {/* Deactivate Popup */}
            <HoC.DialogBox title={row?.IsActive ? "Deactivate" : "Activate"} open={deactivate} onClose={() => setDeactivate(false)}>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>{row?.IsActive ? en.areYouWantToDeactivate : "Are you sure you want to Activate"}</Typography>
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
                            <Button variant="outlined" onClick={() => setDeactivate(false)}>
                                {en.cancel}
                            </Button>
                        </Box>
                        <Box display="flex" gap={2}>
                            <Button variant="filled" onClick={handleDeactivate}>
                                {en.ok}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </HoC.DialogBox>
        </Box>
    );
};

export default AdminActions;
