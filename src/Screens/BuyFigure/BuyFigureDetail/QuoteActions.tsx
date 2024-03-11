import React from "react";
import { BiEdit } from "react-icons/bi";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, IconButton, Tooltip, Typography } from "@mui/material";

import API from "../../../API";
import DialogBox from "../../../Components/reusableComponents/Dailog";
import { GetQuotesByBuyFigureId } from "../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { handleDrawer, showAlert, UpdateQuote } from "../../../Redux/Reducer";
import { en } from "../../../translate/en";

const QuoteActions = ({ rowData }: any) => {
    const { breakPoints, user, buyFigureDetail } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState(false);
    const dispatch = useAppDispatch();

    const onClose = () => {
        setConfirm(false);
    };
    const onOpen = () => setConfirm(true);
    const handleDelete = async () => {
        try {
            const res: any = await API.Quote.deleteQuote({ quoteid: rowData?.Quote_ID, ModifiedBy: user?.Email });
            if (res?.data.status === 1) {
                dispatch(GetQuotesByBuyFigureId(rowData?.BuyFigure_ID));
                dispatch(showAlert({ open: true, type: "success", message: "Quote Deleted Successfully", closeIcon: true }));
                setConfirm(false);
            }
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
            setConfirm(false);
        }
    };
    const handleEditQuote = async () => {
        try {
            dispatch(handleDrawer({ open: true }));
            dispatch(UpdateQuote(rowData));
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
            setConfirm(false);
        }
    };

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Box>
                    <Tooltip title="Edit" arrow>
                        <IconButton
                            disabled={user.UserID !== buyFigureDetail?.BuyFigureList.UserID}
                            onClick={handleEditQuote}
                            sx={{
                                cursor: user.UserID !== buyFigureDetail?.BuyFigureList.UserID ? "not-allowed" : "pointer",
                                color: "black"
                            }}
                        >
                            <BiEdit fontSize={24} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: 20, mt: 1 }} />
                <Box>
                    <Tooltip title="Delete" arrow>
                        <IconButton
                            disabled={user.UserID !== buyFigureDetail?.BuyFigureList.UserID}
                            onClick={onOpen}
                            sx={{ cursor: user.UserID !== buyFigureDetail?.BuyFigureList.UserID ? "not-allowed" : "pointer" }}
                        >
                            <DeleteIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>
                    </Tooltip>
                </Box>
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
export default QuoteActions;
