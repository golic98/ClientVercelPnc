import axios from "axios";

const instance = axios.create({
    baseURL: 'https://service-vercel-pnc.vercel.app/meg',
    withCredentials: true
});

export default instance;
