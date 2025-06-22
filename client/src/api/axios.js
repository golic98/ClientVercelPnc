import axios from "axios";

const instance = axios.create({
    baseURL: 'https://service-vercel-pnc.vercel.app/meg',
    withCredentials: true,
    timeout: 10000
});

export default instance;
