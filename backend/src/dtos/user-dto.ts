import {IUser} from "../models/user-model";

export class UserDto {
    email;
    id;
    isActivated;
    scripts;
    collections;

    constructor(model: IUser) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.scripts = model.scripts;
        this.collections = model.collections;
    }
}
