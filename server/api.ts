import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || '/api';

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(cfg => {
    // const token = localStorage.getItem('token');
    // if(token) cfg.headers!['Authorization'] = `Bearer ${token}`;
    return cfg;
});

api.interceptors.response.use(
    res => res,
    err => {
        console.error(err);
        return Promise.reject(err);
    }
);

export async function get<T>(url: string, params?: any) {
    const res = await api.get<T>(url, { params });
    return res.data;
}

export async function post<T, B = any>(url: string, body?: B) {
    const res = await api.post<T>(url, body);
    return res.data;
}

export async function put<T, B = any>(url: string, body?: B) {
    const res = await api.put<T>(url, body);
    return res.data;
}

export async function del<T>(url: string) {
    const res = await api.delete<T>(url);
    return res.data;
}

export default api;
