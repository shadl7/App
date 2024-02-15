import {userService} from '../service/user-service';
import {validationResult} from 'express-validator';
import {ApiError} from '../exceptions/api-error';
import express, { NextFunction, Response } from "express";
interface AuthRequestBody {
    email: string;
    password: string;
}

class UserController {
    async registration(req: express.Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body as unknown as AuthRequestBody;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: express.Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body as unknown as AuthRequestBody;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: express.Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req: express.Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const activationLink = req.params.link as string;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || "https://shadl7.ru");
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: express.Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const {refreshToken}: {refreshToken: string} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}


export const userController = new UserController();
