import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const addQuote = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.quote}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getQuotesByBuyfigureId = (Id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.quote}/${Id}`, {})
            .then((apiResponse: any) => {
                resolve({ success: true, data: apiResponse?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateQuote = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.quote}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const deleteQuote = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${ApiEndPoints.quote}/${params?.quoteid}/${params?.ModifiedBy}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    addQuote,
    getQuotesByBuyfigureId,
    updateQuote,
    deleteQuote
};
