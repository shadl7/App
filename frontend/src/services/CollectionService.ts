import $api from "../http";
export default class CollectionService {
    static async GetCollections(author: string) {
        return $api.post('/collections', {author})
    }
    static async NewCollection(name: string, content: string[], author: string) {
        return $api.post('/newCollection', {name, content, author})
    }
    static async RemoveCollection(id: string) {
        return $api.post('/removeCollection', {id})
    }
    static async UpdateCollection(collection: collection) {
        return $api.post('/updateCollection', {collection})
    }

}