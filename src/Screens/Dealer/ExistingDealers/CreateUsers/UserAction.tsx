import React from "react";
import { BiEdit } from "react-icons/bi";

import DeleteIcon from "@mui/icons-material/Delete";
import SwapCallsOutlinedIcon from "@mui/icons-material/SwapCallsOutlined";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";

import API from "../../../../API";
import DialogBox from "../../../../Components/reusableComponents/Dailog";
import Select from "../../../../Components/reusableComponents/Select";
import { RolesData } from "../../../../config";
import { getAllUsersByDealerID } from "../../../../Redux/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { handleUpdateDealerUsers, showAlert } from "../../../../Redux/Reducer";
import { en } from "../../../../translate/en";

const UserActions = ({ row, users, DealershipDetails }: any) => {
    const { breakPoints, user, updatedDealer, updateDealerUser, dealers, dealerUsers } = useAppSelector((state) => state);
    const [confirm, setConfirm] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<any>("");
    const [dealerConfirm, setDealerConfirm] = React.useState(false);
    const [dealerAssign, setDealerAssign] = React.useState<any>(null);
    const [bsConfirm, setBSConfirm] = React.useState(false);
    const [bsAssign, setBSAssign] = React.useState<any>(null);

    const UserFiltered = users?.filter((e: any) => e.RoleId !== 3)?.map((a: any) => ({ label: `${a.First_Name} ${a.Last_Name}`, value: a.UserID }));
    const screen = user?.Screens?.filter((e: any) => e.Screen_Id === 6)?.[0];

    const dispatch = useAppDispatch();

    const onClose = () => {
        setConfirm(true);
    };
    const onDealerClose = () => {
        setDealerConfirm(true);
    };
    const onOpen = () => setConfirm(true);
    const onDealerOpen = () => setDealerConfirm(true);

    const onBSClose = () => {
        setBSConfirm(true);
    };
    const onBSDealerOpen = () => setBSConfirm(true);
    const handleEditDealer = async () => {
        dispatch(handleUpdateDealerUsers(row));
    };
    const handleDelete = async () => {
        try {
            const res: any = await API?.Users?.deleteUsers({ UserID: row?.UserID, DealerID: DealershipDetails?.DealerID, ModifiedBy: user?.Email });
            if (res?.data?.data?.status) {
                if (row?.RoleId === 3 && selectedUser?.value) {
                    const UpdateUser = users?.filter((a: any) => a.UserID === selectedUser?.value)[0];
                    await API.Users.updateUsers({
                        ...UpdateUser,
                        RoleId: RolesData.DealerAdmin.RoleId,
                        RoleName: RolesData.DealerAdmin.RoleName,
                        ModifiedBy: user?.Email
                    });
                    // Update User API
                }
                dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
                dispatch(showAlert({ open: true, type: "success", message: "User Deleted Successfully", closeIcon: true }));
                setConfirm(false);
            }
        } catch (error: any) {
            dispatch(showAlert({ open: true, type: "error", message: error?.response?.data?.data?.message, closeIcon: true }));
        }
    };
    const handleAssignDealer = async () => {
        try {
            const response: any = await API.Dealer.updateDealership({
                unAssignUserID: row?.UserID,
                DealerID: updatedDealer?.DealerID,
                ModifiedBy: user?.Email,
                AssignUserID: dealerAssign?.MainContact?.UserID
            });
            if (response?.data?.status) {
                const res: any = await API.Dealer.addDealership({
                    UserID: dealerAssign?.MainContact?.UserID,
                    DealerID: updatedDealer?.DealerID,
                    CreatedBy: user?.Email
                });
                if (res?.data?.status) {
                    dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
                    dispatch(
                        showAlert({
                            open: true,
                            type: "success",
                            message: "Dealer Admin Assigned Successfully",
                            closeIcon: true
                        })
                    );
                    setDealerConfirm(false);
                }
            }
        } catch (error) {
            dispatch(
                showAlert({
                    open: true,
                    type: "error",
                    message: en.internalServerError,
                    closeIcon: true
                })
            );
        }
    };
    const DealerAdminFiltered: any = dealers
        ?.filter((item: any) => item?.MainContact !== null && item?.MainContact?.First_Name !== row?.First_Name)
        .reduce((uniqueList: any, a: any) => {
            const value = a?.MainContact?.UserID;
            if (value && !uniqueList?.some((item: any) => item?.value === value)) {
                uniqueList.push({
                    ...a,
                    label: `${a?.MainContact?.First_Name ?? ""} ${a?.MainContact?.Last_Name ?? ""}`,
                    value
                });
            }
            return uniqueList;
        }, []);
    const BuyerSellerFiltered: [] = dealerUsers
        ?.filter((item: any) => item?.RoleId !== 3)
        .map((e: any) => ({ ...e, label: `${`${e?.First_Name} ${e.Last_Name}`}`, value: `${e?.UserID}` }));

    const handleAssignBuyerSeller = async () => {
        try {
            const response: any = await API.Users.updateAssign({
                DBSUserID: bsAssign?.UserID,
                DAUserID: row?.UserID,
                ModifiedBy: user?.Email
            });
            if (response?.data?.status) {
                dispatch(getAllUsersByDealerID(updatedDealer?.DealerID));
                dispatch(
                    showAlert({
                        open: true,
                        type: "success",
                        message: `${`${bsAssign?.First_Name} ${bsAssign?.Last_Name} ` ?? "User"} is Assigned as Dealer Admin`,
                        closeIcon: true
                    })
                );
            }
        } catch (error) {
            dispatch(
                showAlert({
                    open: true,
                    type: "error",
                    message: en.internalServerError,
                    closeIcon: true
                })
            );
        }
    };
    return (
        <Box>
            <Box display="flex" alignItems="center" gap={2}>
                {screen?.IsEdit ? (
                    <Tooltip title="Edit" arrow>
                        <Box display="flex" alignItems="center" gap={1} sx={{ width: 30, cursor: "pointer" }} onClick={handleEditDealer}>
                            <BiEdit fontSize={24} />
                            {/* <Typography>Edit</Typography> */}
                        </Box>
                    </Tooltip>
                ) : (
                    <> </>
                )}
                {screen?.IsDelete ? (
                    <>
                        <Divider sx={{ backgroundColor: "#fff", height: "auto" }} orientation="vertical" variant="middle" flexItem />
                        <Tooltip title={updateDealerUser?.UserID ? "Clear Form" : "Delete"} arrow>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                sx={{ width: 30, cursor: updateDealerUser?.UserID ? "not-allowed" : "pointer" }}
                                onClick={updateDealerUser?.UserID ? undefined : onOpen}
                            >
                                <DeleteIcon />
                                {/* <Typography>Delete</Typography> */}
                            </Box>
                        </Tooltip>
                    </>
                ) : (
                    <> </>
                )}
                {row?.RoleId === 3 && (
                    <>
                        <Divider sx={{ backgroundColor: "#fff", height: "auto" }} orientation="vertical" variant="middle" flexItem />
                        <Tooltip title="Dealer Assign / UnAssign" arrow>
                            <Box display="flex" alignItems="center" gap={1} sx={{ width: 30, cursor: "pointer" }} onClick={onDealerOpen}>
                                <SwapHorizontalCircleOutlinedIcon />
                                {/* <Typography>Edit</Typography> */}
                            </Box>
                        </Tooltip>
                    </>
                )}
                {row?.RoleId === 3 && (
                    <>
                        <Divider sx={{ backgroundColor: "#fff", height: "auto" }} orientation="vertical" variant="middle" flexItem />
                        <Tooltip title="Assign Buyer and seller as Dealer Admin" arrow>
                            <Box display="flex" alignItems="center" gap={1} sx={{ width: 30, cursor: "pointer" }} onClick={onBSDealerOpen}>
                                <SwapCallsOutlinedIcon />
                                {/* <Typography>Edit</Typography> */}
                            </Box>
                        </Tooltip>
                    </>
                )}
            </Box>
            <DialogBox title="Confirm" open={confirm} onClose={onClose}>
                {row?.RoleId === 3 && (
                    <Box display="flex" justifyContent={row?.RoleId === 3 ? "flex-start" : "center"}>
                        <Typography>
                            {" "}
                            <span style={{ fontWeight: "bold", color: "red" }}>Note :</span> This Dealer Admin May be Associated With Other
                            Dealership.
                        </Typography>
                    </Box>
                )}
                <Box display="flex" justifyContent={row?.RoleId === 3 ? "flex-start" : "center"}>
                    <Typography>{en?.areYouWantToDelete}</Typography>
                </Box>
                {row?.RoleId === 3 && (
                    <Box>
                        <Select id="Users" value={selectedUser} label={en.selectRole} onChange={(e: any) => setSelectedUser(e)} list={UserFiltered} />
                    </Box>
                )}
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
                        <Button onClick={handleDelete} disabled={row?.RoleId === 3 && !selectedUser?.value} variant="filled" sx={{ display: "flex" }}>
                            Yes
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
            <DialogBox title="Assign Dealer Admin" open={dealerConfirm} onClose={onDealerClose}>
                <Select
                    id="DealerAssign"
                    value={dealerAssign}
                    placeHolder="Select Dealer Admin"
                    onChange={(e: any) => setDealerAssign(e)}
                    list={DealerAdminFiltered ?? []}
                />
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
                        <Button
                            type="button"
                            onClick={() => {
                                setDealerAssign(null);
                                setDealerConfirm(false);
                            }}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        <Button onClick={handleAssignDealer} disabled={!dealerAssign} variant="filled" sx={{ display: "flex" }}>
                            Assign
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
            <DialogBox title="Assign Buyer and Seller as Admin" open={bsConfirm} onClose={onBSClose}>
                <Select
                    id="DealerAssign"
                    value={bsAssign}
                    placeHolder="Select Buyer and Seller"
                    onChange={(e: any) => setBSAssign(e)}
                    list={BuyerSellerFiltered ?? []}
                />
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
                        <Button
                            type="button"
                            onClick={() => {
                                setBSAssign(null);
                                setBSConfirm(false);
                            }}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        <Button onClick={handleAssignBuyerSeller} disabled={!bsAssign} variant="filled" sx={{ display: "flex" }}>
                            Assign
                        </Button>
                    </Box>
                </Box>
            </DialogBox>
        </Box>
    );
};
export default UserActions;
