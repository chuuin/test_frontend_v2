// src/services/api.ts
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || '/api'; // 面試官會給 baseUrl，部署時設 env

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// interceptor 範例：自動帶 token（如果有）
api.interceptors.request.use((cfg) => {
    // const token = localStorage.getItem('token');
    // if (token) cfg.headers!['Authorization'] = `Bearer ${token}`;
    return cfg;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        // 全域錯誤處理
        return Promise.reject(err);
    }
);

// CRUD helpers (generic)
export async function get<T>(url: string, params?: any) {
    const r = await api.get<T>(url, { params });
    return r.data;
}
export async function post<T, B = any>(url: string, body?: B) {
    const r = await api.post<T>(url, body);
    return r.data;
}
export async function put<T, B = any>(url: string, body?: B) {
    const r = await api.put<T>(url, body);
    return r.data;
}
export async function del<T>(url: string) {
    const r = await api.delete<T>(url);
    return r.data;
}

export default api;
