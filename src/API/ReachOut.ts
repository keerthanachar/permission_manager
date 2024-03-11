import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const addReachout = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.reachOut}`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const ResendReachout = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.reachOut}/resend`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deleteReachout = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.reachOut}/${id}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getReachout = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.reachOut}/${id}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

export default { addReachout, ResendReachout, deleteReachout, getReachout };
