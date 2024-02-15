import $api from "../http";
import {AxiosResponse} from "axios";
export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<login>> {
        return $api.post('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<registration>> {
        return $api.post('/registration', {email, password})
    }

    static async logout(): Promise<AxiosResponse<String>> {
        return $api.post('/logout')
    }

}