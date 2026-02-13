
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: any, res: any, next: NextFunction) => {
    console.error(`[Error] ${req.method} ${req.path}:`, err.stack);
    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    
    res.status(statusCode).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
};
