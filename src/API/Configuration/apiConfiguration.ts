import axios from "axios";

const token: any =
    process.env.REACT_APP_AUTH_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtyaXNoZ3VydTQzNUBnbWFpbC5jb20iLCJpYXQiOjE2OTc1MTk1MjMsImV4cCI6MTY5NzUyMzEyM30.0vItX0lgX5bEYB58KCxAn7_Yn26ZVkl9UZMz6wpp4tM";
export default axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL ?? "",
    baseURL: "http://localhost:8181" || process.env.REACT_APP_API_BASE_URL || "",
    timeout: 50000,
    headers: {
        "x-access-token": token
    }
});
