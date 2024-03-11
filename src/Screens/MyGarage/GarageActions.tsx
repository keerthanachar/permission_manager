import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Tooltip, Typography } from "@mui/material";

import API from "../../API";
import DialogBox from "../../Components/reusableComponents/Dailog";
import { GetMyGarageDetailsByUserId } from "../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { showAlert } from "../../Redux/Reducer";
import { en } from "../../translate/en";

const GarageActions = ({ rowData }: any) => {
    const { breakPoints, user } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState(false);
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 11)?.[0];
    const dispatch = useAppDispatch();

    const onClose = () => {
        setConfirm(false);
    };
    const onOpen = () => setConfirm(true);
    const handleDelete = async () => {
        try {
            const res: any = await API.MyGarage.deleteMyGarage({ GarageID: rowData?.GarageID, ModifiedBy: user?.Email });
            if (res?.data[0].status === 1) {
                dispatch(GetMyGarageDetailsByUserId(user?.UserID));
                dispatch(showAlert({ open: true, type: "success", message: "Garage Deleted Successfully", closeIcon: true }));
                setConfirm(false);
            }
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
            setConfirm(false);
        }
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" gap={2}>
                {screen?.IsDelete ? (
                    <Box alignItems="center" gap={2}>
                        <Tooltip title="Delete" arrow>
                            <Box display="flex" sx={{ cursor: "pointer" }} alignItems="center" onClick={onOpen}>
                                <DeleteIcon sx={{ width: "20px", height: "20px" }} />
                            </Box>
                        </Tooltip>
                    </Box>
                ) : (
                    <> </>
                )}
            </Box>
            <DialogBox title="Confirm" open={confirm} onClose={onClose}>
                <Box display="flex" justifyContent="center">
                    <Typography>{en?.areYouWantToDelete}</Typography>
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
                        <Button onClick={handleDelete} variant="filled" sx={{ display: "flex" }}>
                            Yes
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
        </Box>
    );
};
export default GarageActions;
