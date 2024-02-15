import {ApiError} from '../exceptions/api-error';
import express, {NextFunction} from "express";

export function errorMW(err: any, req: express.Request, res: express.Response, next: NextFunction) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})

};
