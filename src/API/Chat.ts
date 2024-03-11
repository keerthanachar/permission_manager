import ApiEndPoints from "../Enums/ApiEndPoint.enum";

import axios from "./Configuration/apiConfiguration";

const CreateChat = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(ApiEndPoints.chat, data)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

const getChatUserList = (userID: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.chat}/${userID}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const addMessage = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.chat}/message`, data)
            .then((res) => {
                resolve({ status: true, data: res.data.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const getMessageByChatUserId = (chat_user_id: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.chat}/message/${chat_user_id}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });

// api's are not in use

// const addChat = (data: any) =>
//     new Promise((resolve, reject) => {
//         axios
//             .post(ApiEndPoints.chat, data)
//             .then((res) => {
//                 resolve({ status: true, data: res.data });
//             })
//             .catch((apiFailed) => {
//                 reject(apiFailed);
//             });
//     });
// const getChatByUserId = () =>
//     new Promise((resolve, reject) => {
//         axios
//             .get(`${ApiEndPoints.chat}`, {})
//             .then((res) => {
//                 resolve({ status: true, data: res.data });
//             })
//             .catch((apiFailed) => {
//                 reject(apiFailed);
//             });
//     });

// const getChatByRoomId = (params: any) =>
//     new Promise((resolve, reject) => {
//         axios
//             .get(`${ApiEndPoints.chat}/${params?.RoomId}/${params?.Inventory_ID}`, {})
//             .then((res) => {
//                 resolve({ status: true, data: res.data });
//             })
//             .catch((apiFailed) => {
//                 reject(apiFailed);
//             });
//     });

// const getChatByDealershipId = (params: any) =>
//     new Promise((resolve, reject) => {
//         axios
//             .get(`${ApiEndPoints.chat}/delership/${params?.DealerShip}/${params?.Inventory_ID}`, {})
//             .then((res) => {
//                 resolve({ status: true, data: res.data });
//             })
//             .catch((apiFailed) => {
//                 reject(apiFailed);
//             });
//     });

const updateNotification = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.chat}/notifications`, data)
            .then((res) => {
                resolve({ status: true, data: res?.data?.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
// const getChatRecievr = (data: any) =>
//     new Promise((resolve, reject) => {
//         axios
//             .post(`${ApiEndPoints.chat}/reciver`, data)
//             .then((res) => {
//                 resolve({ status: true, data: res.data });
//             })
//             .catch((apiFailed) => {
//                 reject(apiFailed);
//             });
//     });
// const getChatsByUserID = (data: any) =>
//     new Promise((resolve, reject) => {
//         axios
//             .get(`${ApiEndPoints.chat}/chatsByUserID/${data?.Sender_UserId}/${data?.Receiver_UserId}`, {})
//             .then((res) => {
//                 resolve({ status: true, data: res.data });
//             })
//             .catch((apiFailed) => {
//                 reject(apiFailed);
//             });
//     });
const getChatNotificationUserID = (UserId: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${ApiEndPoints.chat}/notifications/${UserId}`, {})
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const addChatArchive = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${ApiEndPoints.chat}/archive`, data)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
const updateChatArchive = (data: any) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${ApiEndPoints.chat}/archive`, data)
            .then((res) => {
                resolve({ status: true, data: res.data });
            })
            .catch((apiFailed) => {
                reject(apiFailed);
            });
    });
export default {
    CreateChat,
    addMessage,
    getMessageByChatUserId,
    getChatUserList,
    addChatArchive,
    updateChatArchive,
    getChatNotificationUserID,
    updateNotification
};
