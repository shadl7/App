import $api from "../http";
export default class ScriptService {
    static async GetScripts(author: string) {
        return $api.post('/scripts', {author})
    }
    static async NewScript(name: string, content: string, config: string, author: string) {
        return $api.post('/newscript', {name, content, config, author})
    }
    static async RemoveScript(id: string) {
        return $api.post('/removescript', {id})
    }
    static async UpdateScript(script: script) {
        return $api.post('/updatescript', {script})
    }

}