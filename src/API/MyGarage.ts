import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const createGarage = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.myGarage}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getMyGarageDetailsByUserId = (Id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.myGarage}/${Id}`, {})
            .then((apiResponse: any) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deleteMyGarage = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.myGarage}/${params?.GarageID}/${params?.ModifiedBy}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    createGarage,
    getMyGarageDetailsByUserId,
    deleteMyGarage
};
