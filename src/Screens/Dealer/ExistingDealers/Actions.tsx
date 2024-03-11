import React from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";

import API from "../../../API";
// import { ReactComponent as EditIcon } from "../../../Assets/Icon feather-edit.svg";
import DialogBox from "../../../Components/reusableComponents/Dailog";
import RoutesEnum from "../../../Enums/Routes.enum";
import { GetDealer } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleDealerAdmin, handleUpdateDealer, showAlert } from "../../../Redux/Reducer";
import { en } from "../../../translate/en";

const ActionsComp = ({ rowData }: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { breakPoints, user } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState(false);
    const handleEditDealer = async () => {
        dispatch(handleUpdateDealer(rowData));
        navigate(RoutesEnum.createDealers);
    };
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 6)?.[0];
    const handleDelete = async () => {
        try {
            const res: any = await API.Dealer.deleteDealerData({ DealerID: rowData?.DealerID, ModifiedBy: user?.Email });
            if (res.data.status) {
                dispatch(GetDealer());
                dispatch(showAlert({ open: true, type: "success", message: "Existing Dealer Deleted Successfully", closeIcon: true }));
                setConfirm(false);
            }
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
            setConfirm(false);
        }
    };
    const handleCreateUser = () => {
        dispatch(handleUpdateDealer(rowData));
        navigate(RoutesEnum.createUser);
    };
    const handleDealerDetails = () => {
        dispatch(handleDealerAdmin(rowData));
        navigate(RoutesEnum.viewDealerAdmin);
    };
    return (
        <Box display="flex" alignItems="center" gap={2}>
            {screen?.IsEdit ? (
                <>
                    <Tooltip title="Edit" arrow>
                        <Box display="flex" alignItems="center" gap={1} sx={{ width: 30, cursor: "pointer" }} onClick={handleEditDealer}>
                            <BiEdit fontSize={24} />
                            {/* <Typography>Edit</Typography> */}
                        </Box>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                </>
            ) : (
                <> </>
            )}
            {screen.IsAdd ? (
                <Tooltip title="Create User" arrow>
                    <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={handleCreateUser}>
                        <PersonAddAltRoundedIcon />
                        {/* <Typography sx={{ color: "#36454F" }}>Create User</Typography> */}
                    </Box>
                </Tooltip>
            ) : (
                <> </>
            )}
            {screen?.IsDelete ? (
                <>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Delete" arrow>
                        <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => setConfirm(true)}>
                            <DeleteIcon />
                            {/* <Typography sx={{ color: "#36454F" }}>Delete</Typography> */}
                        </Box>
                    </Tooltip>
                </>
            ) : (
                <> </>
            )}
            {!screen?.IsAdd ? (
                <Box display="flex" alignItems="center" gap={1} sx={{ width: 30, cursor: "pointer" }} onClick={() => handleDealerDetails()}>
                    <VisibilityIcon />
                    {/* <Typography>Edit</Typography> */}
                </Box>
            ) : (
                <> </>
            )}
            <DialogBox title="Confirm" open={confirm} onClose={() => setConfirm(true)}>
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

export default ActionsComp;
