import React from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";

import API from "../../../API";
import { ReactComponent as Carplus } from "../../../Assets/carplus-1.svg";
import DialogBox from "../../../Components/reusableComponents/Dailog";
import RoutesEnum from "../../../Enums/Routes.enum";
import { GetDealer } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleUpdateDealer, showAlert } from "../../../Redux/Reducer";
import { en } from "../../../translate/en";

const SignupActions = ({ rowData }: any) => {
    const { breakPoints, user } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState(false);
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 6)?.[0];

    const dispatch = useAppDispatch();

    const onClose = () => {
        setConfirm(false);
    };
    const onOpen = () => setConfirm(true);
    const navigate = useNavigate();
    const handleCreateDealer = async () => {
        dispatch(handleUpdateDealer(rowData));
        navigate(RoutesEnum.createDealers);
    };
    const handleDelete = async () => {
        try {
            const res: any = await API.Dealer.deleteDealerData({ DealerID: rowData?.DealerID, ModifiedBy: user?.Email });
            if (res.data.status) {
                dispatch(GetDealer());
                dispatch(showAlert({ open: true, type: "success", message: "Dealer Deleted Successfully", closeIcon: true }));
                setConfirm(false);
            }
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.messagea, closeIcon: true }));
            setConfirm(false);
        }
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" gap={2}>
                {screen?.IsAdd ? (
                    <>
                        <Box gap={2}>
                            <Tooltip title="Create Dealer" arrow>
                                <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={handleCreateDealer}>
                                    <Carplus style={{ fill: "#000", width: "20px", height: "20px" }} />
                                    {/* <Typography>Create Dealer</Typography> */}
                                </Box>
                            </Tooltip>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                    </>
                ) : (
                    <> </>
                )}
                {screen?.IsDelete ? (
                    <Box alignItems="center" gap={2}>
                        <Tooltip title="Delete" arrow>
                            <Box display="flex" sx={{ cursor: "pointer" }} alignItems="center" onClick={onOpen}>
                                <DeleteIcon sx={{ width: "20px", height: "20px" }} />
                                {/* <Typography>Delete</Typography> */}
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
export default SignupActions;
