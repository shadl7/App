class AutoSaver {
    timeout: NodeJS.Timeout | undefined;
    saveFunc;
    constructor(save: (value: any) => void, content: any) {
        this.saveFunc = save
        this.updateSaver(content)
    }
    async updateSaver(content: any) {
        if (this.timeout !== undefined && this.timeout !== null) {
            clearTimeout(this.timeout)
        }
        if (content !== null) {
            this.timeout = setTimeout(() => {
                this.saveFunc(content)
            }, 1000)
        }
    }
}

export default AutoSaver;