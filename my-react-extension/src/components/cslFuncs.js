//cslFuncs.js
const STORAGE = chrome.storage.local;

export default{
    getData(key){
        return new Promise((resolve) => {
            STORAGE.get(key, result => (result[key] ? resolve(result[key]) : resolve({})));
        });
    },
    
    save(key, value) {
        return new Promise((resolve) => {
            STORAGE.set({ [key]: value }, () => {
                resolve();
            });
        });
    },
    async initialize(key, dictValue){
        this.save(key, dictValue);
    
    }
};