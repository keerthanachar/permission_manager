import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../API";

export const addContactUsAPI = createAsyncThunk("addContactUsAPI", async (data: any) => {
    try {
        const response = await API.AddContactUs.addContactUs(data);
        return response;
    } catch (error) {
        throw new Error("error");
    }
});
export const CreateDealer = createAsyncThunk("CreateDealer", async (params: any) => {
    try {
        const data = await API.Dealer.createDealer(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetAllRoles = createAsyncThunk("GetAllRoles", async () => {
    try {
        const data = await API.RoleManagement.getAllRoles();
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetDealer = createAsyncThunk("GetDealer", async () => {
    try {
        const data = await API.Dealer.getDealer();
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const UpdateDealer = createAsyncThunk("UpdateDealer", async (params: any) => {
    try {
        const data = await API.Dealer.updateDealer(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});

// export const GetChatId = createAsyncThunk("GetChatId", async () => {
//     try {
//         const data = await API.Chat.getChatByUserId();
//         return data;
//     } catch (error: any) {
//         throw new Error(error?.message ?? "Something Went Wrong");
//     }
// });
export const GetInventory = createAsyncThunk("GetInventory", async (params: any) => {
    try {
        const data = await API.Inventory.getInventoryByUserId(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetProducts = createAsyncThunk("GetProducts", async (params: any) => {
    try {
        const data = await API.Products.getProducts(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetBidsData = createAsyncThunk("GetBidsData", async () => {
    try {
        const data = await API.Bid.getBidData();
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const getAllUsersByDealerID = createAsyncThunk("getAllUsersByDealerID", async (params: any) => {
    try {
        const data = await API.Users.getUsersByDealerID(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    try {
        const data = await API.Users.getUsers();
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetBidByUserIdData = createAsyncThunk("GetBidByUserIdData", async (params: any) => {
    try {
        const data = await API.Bid.getbidByUserId(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetDashboardData = createAsyncThunk("GetDashboardData", async (params: any) => {
    try {
        const data = await API.Dashboard.getDashboardData(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetViewList = createAsyncThunk("GetViewList", async (params: any) => {
    try {
        const data = await API.Dealer.getViewProduct(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const ViewProducts = createAsyncThunk("ViewProducts", async (params: any) => {
    try {
        const data = await API.Dealer.viewProducts(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const InventoryFilter = createAsyncThunk("InventoryFilter", async (params: any) => {
    try {
        const data = await API.Inventory.InventoryFilter(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});

export const ProdcutFilter = createAsyncThunk("ProductFilter", async (params: any) => {
    try {
        const data = await API.Products.getProductsFilter(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetRoleDetailsByRoleId = createAsyncThunk("GetRoleDetailsByRoleId", async (params: any) => {
    try {
        const data = await API.RoleManagement.getRoleDetailsByRoleId(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetMyGarageDetailsByUserId = createAsyncThunk("GetMyGarageDetailsByUserId", async (params: any) => {
    try {
        const data = await API.MyGarage.getMyGarageDetailsByUserId(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetReachoutData = createAsyncThunk("GetReachoutData", async (params: any) => {
    try {
        const data = await API.Reachout.getReachout(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetDealerUserByUserId = createAsyncThunk("getDealerUserByUserId", async (params: any) => {
    try {
        const data = await API.Users.getDealerUserByUserId(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const getUsersByUserID = createAsyncThunk("getUsersByUserID", async (params: any) => {
    try {
        const data = await API.Users.getUsersByUserID(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
// export const getChatsByUserID = createAsyncThunk("getChatsByUserID", async (params: any) => {
//     try {
//         const data: any = await API.Chat.getChatsByUserID(params);
//         return data;
//     } catch (error: any) {
//         throw new Error(error?.message ?? "Something Went Wrong");
//     }
// });
export const GetChatNotificationByUserID = createAsyncThunk("GetChatNotificationByUserID", async (params: any) => {
    try {
        const data = await API.Chat.getChatNotificationUserID(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
// export const getInitialChatsByUserID = createAsyncThunk("getInitialChatsByUserID", async (params: any) => {
//     try {
//         const data = await API.Chat.getChatsByUserID(params);
//         return data;
//     } catch (error: any) {
//         throw new Error(error?.message ?? "Something Went Wrong");
//     }
// });
export const GetChatUserList = createAsyncThunk("getChatUserList", async (params: any) => {
    try {
        const data = await API.Chat.getChatUserList(params);
        return data;
    } catch (error) {
        throw new Error("Something Went Wrong");
    }
});
export const GetMessageByChatUserId = createAsyncThunk("GetMessageByChatUserId", async (params: any) => {
    try {
        const data = await API.Chat.getMessageByChatUserId(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetBuyFigure = createAsyncThunk("GetBuyFigure", async () => {
    try {
        const data = await API.BuyFigure.getBuyFigure();
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetQuotesByBuyFigureId = createAsyncThunk("GetQuotesByBuyFigureId", async (params: any) => {
    try {
        const data = await API.Quote.getQuotesByBuyfigureId(params);
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
export const GetPrivateNetwork = createAsyncThunk("GetPrivateNetwork", async () => {
    try {
        const data = await API.PrivateNetwork.getPrivateNetwork();
        return data;
    } catch (error: any) {
        throw new Error(error?.message ?? "Something Went Wrong");
    }
});
