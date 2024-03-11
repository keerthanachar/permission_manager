import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const addUsers = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(ApiEndPoints.user, data)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

const updateUsers = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(ApiEndPoints.user, data)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deleteUsers = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.user}/${params?.UserID}/${params?.DealerID}/${params?.ModifiedBy}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getUsers = () =>
    new Promise((resolve, reject) => {
        axios
            .get(ApiEndPoints.user, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getUsersByDealerID = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.user}${ApiEndPoints.dealer}/${id}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const verifyUserEmailAndPassword = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.user}/check`, params)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getDealerUserByUserId = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.user}/dealerUser/${id}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

const getUsersByUserID = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.user}/${id}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateAssign = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.user}/assign`, data)
            .then((res) => {
                resolve({ status: true, data: res.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    addUsers,
    updateUsers,
    deleteUsers,
    getUsers,
    getUsersByDealerID,
    verifyUserEmailAndPassword,
    getDealerUserByUserId,
    getUsersByUserID,
    updateAssign
};
