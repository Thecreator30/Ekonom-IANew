import jwt from 'jsonwebtoken';
import { JWTPayload } from '../domain/auth';
import { env } from '../config/env';

const SECRET = env.JWT_SECRET;

export const signAccessToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
    return jwt.sign(payload, SECRET, { expiresIn: '15m' });
};

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, SECRET) as JWTPayload;
};

export const verifyJwt = verifyToken;
