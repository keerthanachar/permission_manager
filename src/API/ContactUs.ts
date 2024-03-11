import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const addContactUs = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(ApiEndPoints.addAboutUs, data)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

export default { addContactUs };
