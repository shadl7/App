import {UserDto} from "../dtos/user-dto";

import jwt, {JwtPayload} from 'jsonwebtoken';
import {TokenModel} from '../models/token-model';

class TokenService {
     generateTokens(payload: UserDto) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || "1", {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || "1", {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token: string): JwtPayload | string | null {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET || "1");
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): JwtPayload | string | null {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET || "1");
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await TokenModel.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken: string) {
        return TokenModel.deleteOne({refreshToken});
    }

    async findToken(refreshToken: string) {
        return TokenModel.findOne({refreshToken});
    }
}

export const tokenService = new TokenService();