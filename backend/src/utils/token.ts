import jwt from 'jsonwebtoken';
import { JWTPayload } from '../domain/auth';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

export const signAccessToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
    return jwt.sign(payload, SECRET, { expiresIn: '15m' });
};

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, SECRET) as JWTPayload;
};
