import {IScript, ScriptModel} from '../models/script-model';
import {IUser, UserModel} from '../models/user-model';
import {ScriptDto} from '../dtos/script-dto';
import mongoose, {Types} from "mongoose";

class ScriptService {
    async newScript(name: string, content: string, config: string, author: string) {
        const script = await ScriptModel.create({name, content, config, author})
        const scriptDto = new ScriptDto(script);
        const user = await UserModel.findOne({_id: scriptDto.author})
        if (user == null) {
            throw new Error('User not found')
        }
        user.scripts.push(scriptDto.id)
        user.save()
        return {script: scriptDto}
    }
    async getScripts(user: string){
        // TODO: read author.scripts and generate array from scriptDto
        return (await ScriptModel.find({author: user}))
            .map((el) => {return new ScriptDto(el)});
    }

    async removeScript(id: string) {
        const script = await ScriptModel.findById(id)
        if (script == null) {
            throw new Error('Script not found')
        }
        const scriptDto = new ScriptDto(script);
        const authorID = scriptDto.author;
        UserModel.findByIdAndUpdate(authorID, {
            $pullAll: {
                scripts: [{_id: scriptDto.id}],
            },
        }, function (err: never, docs: never) {});
        ScriptModel.findByIdAndRemove(id, function (err: never, docs: never) {})
        return scriptDto;
    }
    async updateScript(script: ScriptDto) {
        return ScriptModel.findByIdAndUpdate(
            { _id: script.id},
            {name: script.name, content: script.content, config: script.config}
        )
    }
}

export const scriptService = new ScriptService();
