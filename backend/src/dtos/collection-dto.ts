import {ICollection} from "../models/collection-model";

export class CollectionDto {
    name;
    id;
    content;
    author;

    constructor(model: ICollection) {
        this.name = model.name;
        this.id = model._id;
        this.content = model.content;
        this.author = model.author;
    }
}