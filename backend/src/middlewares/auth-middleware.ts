import {ApiError} from '../exceptions/api-error';
import {TokenService} from '../service/token-service';
import {NextFunction} from "express";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import {JwtPayload} from "jsonwebtoken";
import {UserDto} from "../dtos/user-dto";

export function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken: string = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken) as JwtPayload;
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData as UserDto;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}
