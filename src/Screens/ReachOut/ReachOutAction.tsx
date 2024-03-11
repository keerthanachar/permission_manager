import React, { useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";

import API from "../../API";
import DialogBox from "../../Components/reusableComponents/Dailog";
import { RolesData } from "../../config";
import { GetReachoutData } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { showAlert } from "../../Redux/Reducer";
import { en } from "../../translate/en";

import { ReachoutActionType } from "./types";

const ReachOutAction: React.FC<ReachoutActionType> = ({ rowData }) => {
    const dispatch = useAppDispatch();
    const { breakPoints, user } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [resendEmail, setResendEmail] = useState(false);

    const IsSuperAdmin = user?.RoleId === RolesData.SuperAdmin.RoleId;
    const IsRDAdmin = user?.RoleId === RolesData.RoadDealerAdmin.RoleId;

    const handleCloseRequest = async () => {
        try {
            const res: any = await API.Reachout.deleteReachout(rowData?.ReachOut_ID);
            if (res?.data?.status) {
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: "Request Closed Successfully",
                        closeIcon: true
                    })
                );
                setConfirm(false);
                dispatch(GetReachoutData(IsSuperAdmin || IsRDAdmin ? null : user?.UserID));
            }
        } catch (error: any) {
            dispatch(
                showAlert({
                    open: true,
                    type: "error",
                    message: error.response.data.message,
                    closeIcon: true
                })
            );
        }
    };
    const handleResendEmail = async () => {
        try {
            setLoading(true);
            const res: any = await API.Reachout.ResendReachout(rowData);
            if (res?.success) {
                setLoading(false);
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: "Request resent successfully",
                        closeIcon: true
                    })
                );
                setConfirm(false);
                dispatch(GetReachoutData(IsSuperAdmin || IsRDAdmin ? null : user?.UserID));
            }
        } catch (error: any) {
            setLoading(false);
            dispatch(
                showAlert({
                    open: true,
                    type: "error",
                    message: error?.response?.data?.message,
                    closeIcon: true
                })
            );
        }
    };
    return (
        <Box>
            <IconButton disabled={rowData?.IsEmailSent} onClick={() => setResendEmail(true)}>
                <Tooltip title="Resend Email ! Please note, this action can only be performed once.">
                    <ForwardToInboxRoundedIcon />
                </Tooltip>
            </IconButton>
            <IconButton onClick={() => setConfirm(true)}>
                <Tooltip title="Close Request">
                    <CancelIcon />
                </Tooltip>
            </IconButton>
            {/* Closing Request */}
            <DialogBox title="Confirm" open={confirm} onClose={() => setConfirm(false)}>
                <Box display="flex" justifyContent="center">
                    <Typography>{en?.areYouWantToClose}</Typography>
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
                    <Box display="flex" gap={1}>
                        <Button type="button" onClick={() => setConfirm(false)} variant="outlined">
                            No
                        </Button>
                        <Button onClick={handleCloseRequest} variant="filled" sx={{ display: "flex" }}>
                            Yes
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
            {/* Resending Email */}
            <DialogBox title="Confirm" width={550} open={resendEmail} onClose={() => setResendEmail(false)}>
                <Box display="flex" flexDirection="column" flexWrap="wrap" justifyContent="center">
                    <Typography>{en?.areYouWantToResendEmail}</Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <InfoOutlinedIcon fontSize="small" />
                        <Typography fontWeight={700}>{en?.this_Action_only_once}</Typography>
                    </Box>
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
                    <Box display="flex" gap={1}>
                        <Button type="button" onClick={() => setResendEmail(false)} variant="outlined">
                            No
                        </Button>
                        <Button disabled={loading} onClick={handleResendEmail} variant="filled" sx={{ display: "flex" }}>
                            {loading ? "Processing..." : "Yes"}
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
        </Box>
    );
};
export default ReachOutAction;
