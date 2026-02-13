import axios from 'axios';
import { Platform } from 'react-native';
import { getAccessToken } from './storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || Platform.select({
    android: 'http://10.0.2.2:3000/api',
    ios: 'http://localhost:3000/api',
    default: 'http://localhost:3000/api',
});

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Auth Token to requests
client.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const api = {
    auth: {
        login: async (email: string, password: string) => {
            const response = await client.post('/auth/login', { email, password });
            return response.data;
        },
        register: async (data: any) => {
            const response = await client.post('/auth/register', { ...data, company_name: "My Business" }); // Default company name for now
            return response.data;
        }
    },
    promotions: {
        list: async () => {
            const response = await client.get('/promotions');
            return response.data;
        },
        create: async (data: any) => {
            const response = await client.post('/promotions', data);
            return response.data;
        },
    },
    welcomeOffer: {
        get: async () => {
            const response = await client.get('/welcome-offer');
            return response.data;
        },
    },
    dashboard: {
        stats: async () => {
            const response = await client.get('/dashboard/stats');
            return response.data;
        },
    },
    subscribers: {
        list: async () => {
            const response = await client.get('/subscribers');
            return response.data;
        },
    },
    push: {
        send: async (title: string, body: string, segment: string = 'ALL') => {
            const response = await client.post('/push/send', { title, body, segment });
            return response.data;
        },
    },
    ai: {
        generateWithEko: async (prompt: string) => {
            const response = await client.post('/ai/generate', { prompt });
            return response.data;
        },
    },
    coupons: {
        list: async (status?: string) => {
            const params = status ? `?status=${status}` : '';
            const response = await client.get(`/coupons${params}`);
            return response.data;
        },
        validate: async (code: string) => {
            const response = await client.post('/coupons/validate', { code });
            return response.data;
        },
        redeem: async (code: string) => {
            const response = await client.post('/coupons/redeem', { code });
            return response.data;
        },
    },
};
