import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const getAllRoles = () =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.roleManagement}${ApiEndPoints.getRoles}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateRoledetails = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.roleManagement}`, data)
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getRoleDetailsByRoleId = (id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.roleManagement}/${id}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

export default { getAllRoles, updateRoledetails, getRoleDetailsByRoleId };
