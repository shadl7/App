import { Request } from 'express';
import {UserDto} from "../dtos/user-dto";

interface RequestWithUser extends Request {
    user: UserDto;
}

export default RequestWithUser;