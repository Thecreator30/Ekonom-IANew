import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';

export const api = {
    promotions: {
        list: async () => {
            // TODO: Implement actual API call
            return [];
        },
        create: async (data: any) => {
            // TODO: Implement actual API call
            return {};
        },
        generateWithOxy: async (prompt: string) => {
            // Mock response for now
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ content: "🚀 Exclusive Offer! Get 20% off when you visit us this weekend. Don't miss out on our fresh arrivals! ✨" });
                }, 2000);
            });
        }
    },
    auth: {
        login: async (email: string, password: string) => {
            // TODO: Implement actual API call
            return { user: { name: 'Laurent' }, token: 'mock-token' };
        },
        logout: async () => {
            // TODO: Implement actual API call
        }
    }
};
