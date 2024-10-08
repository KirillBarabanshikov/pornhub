import axios from 'axios';
import { API_URL } from '@/shared/consts';

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: false,
});
