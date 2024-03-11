import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const getProducts = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.productsList}/User/${id}`)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

const getProductsFilter = (params: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.productsList}/Dealer`, params)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default { getProducts, getProductsFilter };
