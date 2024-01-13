import utils from './utils';
import storage from './storage';

console.log("background.js loading...");

const setActive = async () => {
    const activeTab = await utils.getActiveTab();
    if (activeTab) {
      const { url, id } = activeTab;
      const name = utils.getName(url);
      const configuration = await utils.getData('sites');
      if (utils.isTabAMatch(name, configuration)) {
        const cacheStorage = await storage.getCacheStorage();
        if (cacheStorage.name !== name) {
          await storage.save('cache', {
            name,
            timeStamp: Date.now()
          });
        }
      }
    }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const { url } = tab;
    const name = utils.getName(url);
    const cacheStorage = await storage.getCacheStorage();
    if (cacheStorage.name !== name) {
        const updatedCacheStorage = await utils.end();
        await storage.save('cache', updatedCacheStorage);
    }
    if (cacheStorage.name !== name) {
        setActive();
    }
});

chrome.tabs.onActivated.addListener(async () => {
    const cacheStorage = await storage.getCacheStorage();
    if (cacheStorage.name) {
        const updatedCacheStorage = await utils.end();
        await storage.save('cache', updatedCacheStorage);
    }
    await setActive();
});

chrome.windows.onFocusChanged.addListener(async (window) => {
    if (window === -1) {
        const updatedCacheStorage = await utils.end();
        await storage.save('cache', updatedCacheStorage);
    } else {
        await setActive();
}
});