import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const createDealer = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.dealer}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getDealer = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.dealer}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

const initiateOTP = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.initiateOTP}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const validateOTP = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.validateOTP}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getDealerByRoleId = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.dealer}/${id}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateDealer = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.dealer}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deleteDealerData = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.dealer}/${params?.DealerID}/${params?.ModifiedBy}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getViewProduct = (Id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.viewProduct}/${Id}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const viewProducts = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.viewProduct}`, data)
            .then((res) => {
                resolve({ status: true, data: res.data.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const verifyDelearEmailAndPassword = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.dealer}/check`, params)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const addDealership = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.dealer}/dealership`, params)
            .then((res) => {
                resolve({ status: true, data: res.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateDealership = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.dealer}/unAssign`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    createDealer,
    getDealer,
    deleteDealerData,
    initiateOTP,
    validateOTP,
    getDealerByRoleId,
    updateDealer,
    getViewProduct,
    viewProducts,
    verifyDelearEmailAndPassword,
    addDealership,
    updateDealership
};
