import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const addBuyFigure = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.buyFigure}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getBuyFigure = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.buyFigure}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateBuyFigureStatus = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.buyFigure}/status`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateBuyFigurePrivateNetwork = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.buyFigure}/unassignpn`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    addBuyFigure,
    getBuyFigure,
    updateBuyFigureStatus,
    updateBuyFigurePrivateNetwork
};
