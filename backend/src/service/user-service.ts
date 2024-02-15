import {UserModel} from '../models/user-model';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import {tokenService} from './token-service';
import {UserDto} from '../dtos/user-dto';
import {ApiError} from '../exceptions/api-error';
import {JwtPayload} from "jsonwebtoken";

class UserService {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({email, password: hashPassword, activationLink, scripts: []})

        const userDto = new UserDto(user); // id, email, isActivated, scripts, collections
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id as unknown as string, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id as unknown as string, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken: string) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById((userData as JwtPayload).id);
        if (user == null) {
            throw Error('User not found')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id as unknown as string, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

export const userService = new UserService();
