import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, Typography } from "@mui/material";

import API from "../../API";
// import unlinkIcon from "../../Assets/Icon awesome-unlink.svg";
import HoC from "../../Components/reusableComponents";
import RoutesEnum from "../../Enums/Routes.enum";
import { GetPrivateNetwork } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleUpdatePrivateNetworks, showAlert } from "../../Redux/Reducer";
import { en } from "../../translate/en";

const PrivateNetworkActions = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { breakPoints, user } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState<boolean>(false);
    // const [deactivate, setDeactivate] = React.useState<boolean>(false);
    const [loadingDeletion, setLoadingDeletion] = useState(false);

    const handleEdit = () => {
        dispatch(handleUpdatePrivateNetworks(row));
        navigate(RoutesEnum.addprivateNetworks);
    };
    const handleDelete = async () => {
        setLoadingDeletion(true);
        try {
            const res: any = await API.PrivateNetwork.deletePrivateNetwork({ pn_id: row.PN_ID, modifiedby: user.Email });
            if (res?.data?.status) {
                setLoadingDeletion(true);
                setConfirm(false);
                await dispatch(GetPrivateNetwork());
                dispatch(showAlert({ open: true, type: "success", message: "Private Network Deleted Successfully", closeIcon: true }));
            }
        } catch (error: any) {
            setLoadingDeletion(true);
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
        }
    };
    // const handleDeactivate = async () => {
    //     try {
    //         const response: any = await API.PrivateNetwork.updatePrivateNetwork({ ...row, IsActive: !row?.IsActive, ModifiedBy: user.Email });
    //         if (response?.data?.status) {
    //             dispatch(
    //                 showAlert({
    //                     open: true,
    //                     type: "success",
    //                     message: row?.IsActive ? "Private Network Deactivated Successfully" : "Private Network Activated Successfully",
    //                     closeIcon: true
    //                 })
    //             );
    //             await dispatch(GetPrivateNetwork());
    //             setDeactivate(false);
    //         }
    //     } catch (error: any) {
    //         dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
    //     }
    // };
    return (
        <Box display="flex" alignItems="center" gap={1}>
            {/* <Box display="flex" alignItems="center" gap={1} sx={{ width: 130, cursor: "pointer" }} onClick={() => setDeactivate(true)}>
                <img src={unlinkIcon} width="13px" alt="Deactivate & Activate" />
                <Typography>{row?.IsActive ? "Deactivate" : "Activate"}</Typography>
            </Box>
            <Divider sx={{ backgroundColor: "#fff", height: 22 }} orientation="vertical" variant="middle" flexItem /> */}
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
                            <Button variant="filled" disabled={loadingDeletion} onClick={handleDelete}>
                                {loadingDeletion ? "Deleting..." : en.ok}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </HoC.DialogBox>
            {/* Deactivate Popup */}
            {/* <HoC.DialogBox title={row?.IsActive ? "Deactivate" : "Activate"} open={deactivate} onClose={() => setDeactivate(false)}>
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
            </HoC.DialogBox> */}
        </Box>
    );
};

export default PrivateNetworkActions;
