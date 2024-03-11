import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const getDashboardData = (Id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.dashboard}/${Id}`, {})
            .then((apiResponse) => {
                resolve({ success: true, data: apiResponse?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

export default { getDashboardData };
