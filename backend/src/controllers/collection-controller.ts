import {collectionService} from '../service/collection-service';
import express, {NextFunction, Response} from "express";
import {CollectionDto} from "../dtos/collection-dto";
class CollectionController {

    async newCollection(req: express.Request, res: Response, next: NextFunction) {
        try {
            // TODO: name validator (not empty)
            // TODO: get author by server (for security)
            const {name, content, author} = req.body;
            const collectionData = await collectionService.newCollection(name, content, author);
            return res.json(collectionData);
        } catch (e) {
            next(e);
        }
    }

    async getCollections(req: express.Request, res: Response, next: NextFunction) {
        // TODO: public/private scripts
        try {
            const {author} = req.body;
            const collections = await collectionService.getCollections(author);
            return res.json({collections}); // TODO: remove sub-object
        } catch (e) {
            next(e);
        }
    }

    async removeCollection(req: express.Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.body;
            const collection = await collectionService.removeCollection(id);
            return res.json({collection}); // TODO: remove sub-object 2
        } catch (e) {
            next(e);
        }
    }

    async updateCollection(req: express.Request, res: Response, next: NextFunction) {
        try {
            const {collection} = req.body;
            return res.json(await collectionService.updateCollection(collection));
        } catch (e) {
            next(e);
        }
    }
}


export const collectionController = new CollectionController();
