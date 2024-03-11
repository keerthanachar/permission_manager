import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AlertNotificationProps } from "../Components/reusableComponents/AlertNotification/types";
import { RolesData } from "../config";
import { themeObject } from "../Theme/CustomTheme";

import {
    GetAllRoles,
    getAllUsers,
    getAllUsersByDealerID,
    GetBidByUserIdData,
    GetBidsData,
    GetBuyFigure,
    GetChatNotificationByUserID,
    GetChatUserList,
    GetDashboardData,
    GetDealer,
    GetDealerUserByUserId,
    // getInitialChatsByUserID,
    GetInventory,
    GetMessageByChatUserId,
    GetMyGarageDetailsByUserId,
    GetPrivateNetwork,
    GetProducts,
    GetQuotesByBuyFigureId,
    GetReachoutData,
    GetRoleDetailsByRoleId,
    GetViewList,
    ProdcutFilter
} from "./asyncThunk";
import { initialState } from "./InitialState";
import { BreakPointsProps, dealersTab, InitialState } from "./types";

export const MainProvider = createSlice({
    name: "state",
    initialState,
    reducers: {
        updateUser: (state: InitialState, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        updateBidsDetails: (state: InitialState, action: PayloadAction<any>) => {
            state.bidsCarDetails = action.payload;
        },
        updateLoader: (state: InitialState, action: PayloadAction<any>) => {
            state.initalApiStatus = { ...action.payload };
        },
        showAlert: (state: InitialState, action: PayloadAction<AlertNotificationProps>) => {
            state.alertNotification = {
                ...state?.alertNotification,
                ...action?.payload
            };
        },
        handleModel: (state: InitialState, action: PayloadAction<any>) => {
            state.modal = { ...state.modal, ...action.payload };
        },
        handleDrawer: (state: InitialState, action: PayloadAction<any>) => {
            state.drawerState = { ...state.drawerState, ...action.payload };
        },
        handleBreakPoints: (state: InitialState, action: PayloadAction<BreakPointsProps>) => {
            state.breakPoints = action.payload;
        },
        switchTheme: (state: InitialState) => {
            state.theme.mode = state.theme.mode === "dark" ? "light" : "dark";
        },
        updateTheme: (state: InitialState, action: PayloadAction<themeObject>) => {
            state.theme = { ...state.theme, ...action.payload };
        },
        handleChatOpen: (state: any, action: PayloadAction<any>) => {
            state.chatmodel = action.payload;
        },
        getDealerByID: (state: InitialState, action: PayloadAction<any>) => {
            state.dealerByID = action.payload;
        },
        handleDealers: (state: InitialState, action: PayloadAction<any>) => {
            state.dealers = action.payload;
        },
        handleMyGarage: (state: InitialState, action: PayloadAction<any>) => {
            state.myGarage = action.payload;
        },
        handleGarageData: (state: InitialState, action: PayloadAction<any>) => {
            state.GarageData = action.payload;
        },
        handleUpdateDealer: (state: InitialState, action: PayloadAction<any>) => {
            state.updatedDealer = action.payload;
        },
        showDealersTab: (state: InitialState, action: PayloadAction<dealersTab>) => {
            state.dealersTab = {
                ...state?.dealersTab,
                ...action?.payload
            };
        },
        handleErrorState: (state: InitialState, action: PayloadAction<any>) => {
            state.errorState = action.payload;
        },
        handleTabs: (state: InitialState, action: PayloadAction<any>) => {
            state.SwitchTab = action.payload;
        },
        handleUpdateDealerUsers: (state: InitialState, action: PayloadAction<any>) => {
            state.updateDealerUser = action.payload;
        },
        handleChatReply: (state: InitialState, action: PayloadAction<any>) => {
            state.ChatData = action.payload;
        },
        handleUpdateInventory: (state: InitialState, action: PayloadAction<any>) => {
            state.updateInventoryFilteredData = action.payload;
        },
        updateInventory: (state: InitialState, action: PayloadAction<any>) => {
            state.editInventory = action.payload;
        },
        handleProductDetail: (state: InitialState, action: PayloadAction<any>) => {
            state.productDetail = action.payload;
        },
        handleBuyFigureDetail: (state: InitialState, action: PayloadAction<any>) => {
            state.buyFigureDetail = action.payload;
        },
        updateInventoryList: (state: InitialState, action: PayloadAction<any>) => {
            state.InventoryList = action.payload;
        },
        handleFiltersInventory: (state: InitialState, action: PayloadAction<any>) => {
            state.FiltersData = action.payload;
        },
        handleClearAllInventory: (state: InitialState, action: PayloadAction<any>) => {
            state.ClearAll = action.payload;
        },
        handleDealerState: (state: InitialState, action: PayloadAction<any>) => {
            state.dealerState = action.payload;
        },
        handleRoadDealerAdmin: (state: InitialState, action: PayloadAction<any>) => {
            state.RoadDealerAdmins = action.payload;
        },
        handleUpdateRoadDealerAdmin: (state: InitialState, action: PayloadAction<any>) => {
            state.updateRoadDealerAdmin = action.payload;
        },
        handleProductImges: (state: InitialState, action: PayloadAction<any>) => {
            state.productImages = action.payload;
        },
        handleBuyFigureImages: (state: InitialState, action: PayloadAction<any>) => {
            state.BuyFigureImages = action.payload;
        },
        handleHomePageNavigation: (state: InitialState, action: PayloadAction<any>) => {
            state.HomePageNavigation = action.payload;
        },
        handleDealerAdmin: (state: InitialState, action: PayloadAction<any>) => {
            state.dealerAdminData = action.payload;
        },
        handleChatRoomData: (state: InitialState, action: PayloadAction<any>) => {
            state.chatRoom = action.payload;
        },
        handleFilterRequests: (state: InitialState, action: PayloadAction<any>) => {
            state.FilteredRequests = action.payload;
        },

        // Chat Reducers
        handleSelectedUserMessage: (state: InitialState, action: PayloadAction<any>) => {
            state.SelectedUser = action.payload;
        },
        handleSendMessage: (state: InitialState, action: PayloadAction<any>) => {
            state.ChatMessageWindow = [...state.ChatMessageWindow, action.payload];
        },
        handleChatUsers: (state: InitialState, action: PayloadAction<any>) => {
            state.ChatUsersList = action.payload;
        },
        UpdateQuote: (state: InitialState, action: PayloadAction<any>) => {
            state.UpdatedQuoteData = action.payload;
        },
        handleUpdatePrivateNetworks: (state: InitialState, action: PayloadAction<any>) => {
            state.UpdatePrivateNetworks = action.payload;
        },
        handleView: (state: InitialState, action: PayloadAction<any>) => {
            state.View = action.payload;
        },
        handleChatWindowView: (state: InitialState, action: PayloadAction<any>) => {
            state.chatWindowView = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(GetAllRoles.pending, (state: InitialState) => {
                state.loaderState = { loading: true };
            })
            .addCase(GetAllRoles.rejected, (state: InitialState) => {
                state.loaderState = { loading: false };
            })
            .addCase(GetAllRoles.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.loaderState = { loading: false };
                state.Roles = action?.payload?.data?.map((e: any) => {
                    return { value: e.Role_Id, label: e.Role };
                });
            })
            .addCase(GetDealer.pending, (state: InitialState) => {
                state.dealerLoader = { loading: true };
            })
            .addCase(GetDealer.rejected, (state: InitialState) => {
                state.dealerLoader = { loading: false };
            })
            .addCase(GetDealer.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.dealerLoader = { loading: false };
                state.dealers = action?.payload?.data;
            })
            // .addCase(GetChatId.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
            //     state.loaderState = { loading: false };
            //     state.chatNotify = action?.payload?.data?.data;
            // })
            .addCase(GetInventory.pending, (state: InitialState) => {
                state.loaderState = { loading: false };
                state.inventoryLoader = { loading: true };
            })
            .addCase(GetInventory.rejected, (state: InitialState) => {
                state.loaderState = { loading: false };
                state.inventoryLoader = { loading: false };
            })
            .addCase(GetInventory.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.loaderState = { loading: false };
                state.inventoryLoader = { loading: false };
                state.InventoryList = action?.payload?.data;
                state.BidManagement = action?.payload?.data?.filter((e: any) => e.Bids);
            })
            .addCase(GetProducts.pending, (state: InitialState) => {
                state.productLoader = { loading: true };
            })
            .addCase(GetProducts.rejected, (state: InitialState) => {
                state.productLoader = { loading: false };
            })
            .addCase(GetProducts.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.productLoader = { loading: false };
                state.GarageProductList = action?.payload?.data;
                state.ProductListData = action?.payload?.data?.filter((e: any) => !e?.ProductList?.IsPrivateNetwork);
                state.PrivateProductList = action?.payload?.data?.filter((e: any) => e?.ProductList?.IsPrivateNetwork);
            })
            .addCase(GetBidsData.pending, (state: InitialState) => {
                state.loaderState = { loading: false };
            })
            .addCase(GetBidsData.rejected, (state: InitialState) => {
                state.loaderState = { loading: false };
            })
            .addCase(GetBidsData.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.loaderState = { loading: false };
                state.TotalBids = action?.payload?.data;
            })
            .addCase(getAllUsers.pending, (state: InitialState) => {
                state.userLoader = { loading: true };
            })
            .addCase(getAllUsers.rejected, (state: InitialState) => {
                state.userLoader = { loading: false };
            })
            .addCase(getAllUsers.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.userLoader = { loading: false };
                state.RoadDealerAdmins = action?.payload?.data?.data
                    ?.filter((e: any) => e.RoleId === RolesData?.RoadDealerAdmin?.RoleId)
                    .map((item: any) => {
                        return { ...item, FullName: `${item?.First_Name} ${item?.Last_Name}` };
                    });
            })
            .addCase(getAllUsersByDealerID.pending, (state: InitialState) => {
                state.userLoader = { loading: true };
            })
            .addCase(getAllUsersByDealerID.rejected, (state: InitialState, action: any) => {
                if (action?.error?.message === "Request failed with status code 404") {
                    state.userLoader = { loading: false };
                    state.dealerUsers = [];
                }
            })
            .addCase(getAllUsersByDealerID.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.userLoader = { loading: false };
                state.dealerUsers = action?.payload?.data?.data;
            })
            .addCase(GetBidByUserIdData.pending, (state: InitialState) => {
                state.myBidsloaderState = { loading: false };
            })
            .addCase(GetBidByUserIdData.rejected, (state: InitialState) => {
                state.myBidsloaderState = { loading: false };
            })
            .addCase(GetBidByUserIdData.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.myBidsloaderState = { loading: false };
                state.mybids = action?.payload?.data;
            })
            .addCase(GetDashboardData.pending, (state: InitialState) => {
                state.dashBoardloaderState = { loading: true };
            })
            .addCase(GetDashboardData.rejected, (state: InitialState) => {
                state.dashBoardloaderState = { loading: false };
            })
            .addCase(GetDashboardData.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.dashBoardloaderState = { loading: false };
                state.dashboardData = action?.payload?.data;
            })
            .addCase(GetViewList.pending, (state: InitialState) => {
                state.userLoader = { loading: true };
            })
            .addCase(GetViewList.rejected, (state: InitialState) => {
                state.userLoader = { loading: false };
            })
            .addCase(GetViewList.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.userLoader = { loading: false };
                state.viewProduct = action?.payload?.data.ProductView ?? [];
            })
            .addCase(ProdcutFilter.pending, (state: InitialState) => {
                state.productFilterLoader = { loading: true };
            })
            .addCase(ProdcutFilter.rejected, (state: InitialState) => {
                state.productFilterLoader = { loading: false };
            })
            .addCase(ProdcutFilter.fulfilled, (state: InitialState) => {
                state.productFilterLoader = { loading: false };
            })
            .addCase(GetRoleDetailsByRoleId.pending, (state: InitialState) => {
                state.rolesLoader = { loading: true };
            })
            .addCase(GetRoleDetailsByRoleId.rejected, (state: InitialState) => {
                state.rolesLoader = { loading: false };
            })
            .addCase(GetRoleDetailsByRoleId.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.rolesLoader = { loading: false };
                state.RoleManagementData = action.payload.data;
            })
            .addCase(GetMyGarageDetailsByUserId.pending, (state: InitialState) => {
                state.garageLoader = { loading: true };
            })
            .addCase(GetMyGarageDetailsByUserId.rejected, (state: InitialState) => {
                state.garageLoader = { loading: false };
            })
            .addCase(GetMyGarageDetailsByUserId.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.garageLoader = { loading: false };
                state.myGarage = action.payload.data;
            })
            .addCase(GetReachoutData.pending, (state: InitialState) => {
                state.reachOutLoader = { loading: true };
            })
            .addCase(GetReachoutData.rejected, (state: InitialState) => {
                state.reachOutLoader = { loading: false };
            })
            .addCase(GetReachoutData.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.reachOutLoader = { loading: false };
                state.ReachoutsData = action.payload.data?.map((e: any, index: number) => ({ ...e, SNO: index + 1 }));
                state.FilteredRequests = action.payload.data?.map((e: any, index: number) => ({ ...e, SNO: index + 1 }));
            })
            .addCase(GetDealerUserByUserId.pending, (state: InitialState) => {
                state.userLoader = { loading: true };
            })
            .addCase(GetDealerUserByUserId.rejected, (state: InitialState) => {
                state.userLoader = { loading: false };
            })
            .addCase(GetDealerUserByUserId.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.userLoader = { loading: false };
                state.MultiDealerUser = action.payload.data.data;
            })
            // .addCase(getUsersByUserID.pending, (state: InitialState) => {
            //     state.chatLoader = { loading: true };
            // })
            // .addCase(getUsersByUserID.rejected, (state: InitialState) => {
            //     state.chatLoader = { loading: false };
            // })
            // .addCase(getUsersByUserID.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
            //     state.chatLoader = { loading: false };
            //     state.SelectedUser = action.payload.data.data;
            //     state.ChatReceiversList = [action.payload.data.data];
            // })
            // .addCase(getInitialChatsByUserID.pending, (state: InitialState) => {
            //     state.chatLoader = { loading: true };
            // })
            // .addCase(getInitialChatsByUserID.rejected, (state: InitialState) => {
            //     state.chatLoader = { loading: false };
            // })
            // .addCase(getInitialChatsByUserID.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
            //     state.chatLoader = { loading: false };
            //     // eslint-disable-next-line prefer-destructuring
            //     state.SelectedReceiver = action.payload.data.data[0];
            //     state.ChatMessageWindow = action.payload.data.data[0]?.Chats;
            //     state.ChatReceiversList = action.payload.data.data?.filter((e: any) => e.IsChatArchived === null || e.IsChatArchived === 0);
            //     state.ArchiveChats = action.payload.data.data?.filter((e: any) => e.IsChatArchived);
            // })
            // .addCase(getChatsByUserID.pending, (state: InitialState) => {
            //     state.chatLoader = { loading: true };
            // })
            // .addCase(getChatsByUserID.rejected, (state: InitialState) => {
            //     state.chatLoader = { loading: false };
            // })
            // .addCase(getChatsByUserID.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
            //     state.chatLoader = { loading: false };
            //     state.ChatMessageWindow = action?.payload?.data?.data;
            // })
            .addCase(GetChatNotificationByUserID.pending, (state: InitialState) => {
                state.NotificationsLoader = { loading: false };
            })
            .addCase(GetChatNotificationByUserID.rejected, (state: InitialState) => {
                state.NotificationsLoader = { loading: false };
            })
            .addCase(GetChatNotificationByUserID.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.NotificationsLoader = { loading: false };
                state.Notifications = action.payload.data.data;
            })
            .addCase(GetChatUserList.pending, (state: InitialState) => {
                state.chatLoader = { loading: true };
            })
            .addCase(GetChatUserList.rejected, (state: InitialState) => {
                state.chatLoader = { loading: false };
            })
            .addCase(GetChatUserList.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.chatLoader = { loading: false };
                state.ChatUsersList = action.payload.data.data
                    .filter((e: any) => !e.IsChatArchived)
                    .map((a: any) => ({
                        ...a,
                        Chat_Users_List: a?.Chat_Users_List?.find((item: any) => item.UserID !== state.user.UserID)
                    }))
                    .flat();
                state.ArchiveChats = action.payload.data.data
                    ?.filter((e: any) => e.IsChatArchived)
                    .map((a: any) => {
                        const archivedUser = a?.Chat_Users_List?.find((item: any) => item.UserID === a.ArchivedUserID);
                        return archivedUser ? { ...a, Chat_Users_List: archivedUser } : null;
                    })
                    .filter(Boolean);
            })
            .addCase(GetMessageByChatUserId.pending, (state: InitialState) => {
                state.chatLoader = { loading: true };
            })
            .addCase(GetMessageByChatUserId.rejected, (state: InitialState) => {
                state.chatLoader = { loading: false };
            })
            .addCase(GetMessageByChatUserId.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.chatLoader = { loading: false };
                state.ChatMessageWindow = action?.payload?.data?.data;
            })
            .addCase(GetBuyFigure.pending, (state: InitialState) => {
                state.buyFigureLoader = { loading: true };
            })
            .addCase(GetBuyFigure.rejected, (state: InitialState) => {
                state.buyFigureLoader = { loading: false };
            })
            .addCase(GetBuyFigure.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.buyFigureLoader = { loading: false };
                state.BuyFigureData = action?.payload?.data?.data?.filter((e: any) => !e.IsPrivateNetwork);
                state.PrivateBuyFigureData = action?.payload?.data?.data?.filter((e: any) => e.IsPrivateNetwork);
            })
            .addCase(GetQuotesByBuyFigureId.pending, (state: InitialState) => {
                state.quoteLoader = { loading: true };
            })
            .addCase(GetQuotesByBuyFigureId.rejected, (state: InitialState) => {
                state.quoteLoader = { loading: false };
            })
            .addCase(GetQuotesByBuyFigureId.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.quoteLoader = { loading: false };
                state.quoteDetails = action?.payload?.data?.data;
            })
            .addCase(GetPrivateNetwork.pending, (state: InitialState) => {
                state.PrivateNetworkLoader = { loading: true };
            })
            .addCase(GetPrivateNetwork.rejected, (state: InitialState) => {
                state.PrivateNetworkLoader = { loading: false };
            })
            .addCase(GetPrivateNetwork.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                state.PrivateNetworkLoader = { loading: false };
                state.PrivateNetworkData = action?.payload?.data;
            });
    }
});

export const {
    handleUpdatePrivateNetworks,
    UpdateQuote,
    updateUser,
    updateBidsDetails,
    updateLoader,
    handleUpdateDealer,
    showDealersTab,
    showAlert,
    handleModel,
    handleBreakPoints,
    getDealerByID,
    handleErrorState,
    handleTabs,
    handleDealers,
    handleChatOpen,
    handleChatReply,
    updateInventory,
    updateInventoryList,
    handleUpdateInventory,
    handleFiltersInventory,
    handleClearAllInventory,
    handleUpdateDealerUsers,
    handleDealerState,
    handleRoadDealerAdmin,
    handleUpdateRoadDealerAdmin,
    handleProductImges,
    handleBuyFigureImages,
    handleProductDetail,
    handleHomePageNavigation,
    handleDealerAdmin,
    handleChatRoomData,
    handleGarageData,
    handleMyGarage,
    handleFilterRequests,
    handleSendMessage,
    handleSelectedUserMessage,
    handleChatUsers,
    handleBuyFigureDetail,
    handleDrawer,
    handleView,
    handleChatWindowView
} = MainProvider.actions;

export default MainProvider.reducer;
