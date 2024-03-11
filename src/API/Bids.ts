import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const getBidData = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.bid}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getbidByUserId = (User_ID: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.bid}/user/${User_ID}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const addBid = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.bid}`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default { getBidData, addBid, getbidByUserId };
