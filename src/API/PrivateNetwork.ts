import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const addPrivateNetwork = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.privateNetworks}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getPrivateNetwork = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.privateNetworks}`, {})
            .then((apiResponse: any) => {
                resolve({ success: true, data: apiResponse?.data.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updatePrivateNetwork = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.privateNetworks}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deletePrivateNetwork = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.privateNetworks}/${params.pn_id}/${params.modifiedby}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    addPrivateNetwork,
    getPrivateNetwork,
    updatePrivateNetwork,
    deletePrivateNetwork
};
