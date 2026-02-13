import axios from 'axios';
import { Platform } from 'react-native';
import { getAccessToken } from './storage';

// Use localhost for web/iOS simulator, 10.0.2.2 for Android emulator
const BASE_URL = Platform.select({
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
        }
    },
    ai: {
        generateWithEko: async (prompt: string) => {
            // Mock response for now (Backend AI service coming in Phase 2)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ content: "🚀 Exclusive Offer! Get 20% off when you visit us this weekend. Don't miss out on our fresh arrivals! ✨" });
                }, 2000);
            });
        }
    },
    welcomeOffer: {
        get: async () => {
            const response = await client.get('/welcome-offer');
            return response.data;
        }
    },
    push: {
        send: async (title: string, body: string, segment: string = 'ALL') => {
            const response = await client.post('/push/send', { title, body, segment });
            return response.data;
        }
    }
};
