import devStorage from '../src/assets/js/dev_storage';

console.log("storage.js loading...");

const STORAGE = devStorage;
const DEFAULT_CACHE = {
    active: {},
  };

export default{
    async update(host, seconds) {
        let data = await this.getData("sites");
        if (!data[host]) {
            data[host] = 0;
        }
        data[host] += seconds;
        this.save("sites", {data});
    },
    
    getData(key) {
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

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    },

    async getCacheStorage() {
        const cache = await this.getData('cache');
        return {
          ...DEFAULT_CACHE,
          ...cache,
        }
    },

};