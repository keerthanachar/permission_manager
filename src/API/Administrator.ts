import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const getAdministrator = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.administrator}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateAdministrator = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.administrator}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deleteAdministrator = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.administrator}/${id}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const addAdministrator = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.administrator}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

export default { getAdministrator, addAdministrator, deleteAdministrator, updateAdministrator };
