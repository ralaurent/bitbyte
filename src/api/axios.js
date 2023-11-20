import axios from 'axios';
import Cookies from 'js-cookie'

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'X-WWW-API-KEY': process.env.REACT_APP_SERVER_API_KEY },
    withCredentials: true
});