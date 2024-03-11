import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const getInventory = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.inventory}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const addInventory = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.inventory}`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const EditInventory = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.inventory}`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deleteInventory = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.inventory}/${id}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getInventoryByUserId = (UserId: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.inventory}${ApiEndPoints?.user}/${UserId}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const InventoryFilterData = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.masterInventory}/getfilter`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const InventoryFilter = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.masterInventory}/filter`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const UnassignPNInventory = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.inventory}/unassignpn`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    getInventory,
    addInventory,
    EditInventory,
    deleteInventory,
    getInventoryByUserId,
    InventoryFilterData,
    InventoryFilter,
    UnassignPNInventory
};
