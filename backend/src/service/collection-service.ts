import {UserModel} from '../models/user-model';
import {CollectionModel, ICollection} from '../models/collection-model';
import {CollectionDto} from '../dtos/collection-dto';

class CollectionService {
    async newCollection(name: string, content: string[], author: string) {
        const collection = await CollectionModel.create({name, content, author})
        const collectionDto = new CollectionDto(collection);
        const user = await UserModel.findOne({_id: collectionDto.author}) // FIXME: Not null
        if (user == null) {
            throw new Error('User not found')
        }
        user.collections.push(collectionDto.id)
        user.save()
        return {collection: collectionDto}
    }
    async getCollections(user: string){
        // TODO: read author.collections and generate array from collectionDto
        return (await CollectionModel.find({author: user}))
            .map((el) => {return new CollectionDto(el)});
    }

    async removeCollection(id: string) { // TODO: check script dependencies before remove
        const collection = await CollectionModel.findById(id) as ICollection
        const collectionDto = new CollectionDto(collection);
        const authorID = collectionDto.author;
        UserModel.findByIdAndUpdate(authorID, {
            $pullAll: {
                collections: [{_id: collectionDto.id}],
            },
        }, function (err: never, docs: never) {});
        CollectionModel.findByIdAndRemove(id, function (err: never, docs: never) {})
        return collectionDto;
    }
    async updateCollection(collection: CollectionDto) {
        return new CollectionDto(await CollectionModel.findByIdAndUpdate(
            {_id: collection.id},
            {name: collection.name, content: collection.content},
            {new: true}
        ) as ICollection);
    }
}

export const collectionService = new CollectionService();
