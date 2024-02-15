import express, {NextFunction, Response} from "express";
import {ScriptDto} from "../dtos/script-dto";

import {scriptService} from '../service/script-service';

class ScriptController {

    async newScript(req: express.Request,
                    res: Response, next: NextFunction) {
        try {
            // TODO: name validator (not empty)
            // TODO: get author by server (not client)
            const {name, content, config, author} = req.body;
            const scriptData = await scriptService.newScript(name, content, config, author);
            return res.json(scriptData);
        } catch (e) {
            next(e);
        }
    }

    async getScripts(req: express.Request, res: Response, next: NextFunction) {
        // TODO: public/private scripts
        try {
            const {author} = req.body;
            const scripts = await scriptService.getScripts(author);
            return res.json({scripts});
        } catch (e) {
            next(e);
        }
    }

    async removeScript(req: express.Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.body;
            const script = await scriptService.removeScript(id);
            return res.json({script});
        } catch (e) {
            next(e);
        }
    }

    async updateScript(req: express.Request, res: Response, next: NextFunction) {
        try {
            const {script} = req.body;
            return res.json(scriptService.updateScript(script));
        } catch (e) {
            next(e);
        }
    }
}


export const scriptController = new ScriptController();
