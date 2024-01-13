// import utils from './js';
// import storage from './storage.js';


console.log("background.js loading...");

//storage commands

const STORAGE = chrome.storage.local;
const DEFAULT_CACHE = {
    active: {},
};

const getData = (key) => {
  return new Promise((resolve) => {
      STORAGE.get(key, result => (result[key] ? resolve(result[key]) : resolve({})));
  });
};

const update = async(host, seconds) => {
  let data = await getData("sites");
  if (!data[host]) {
      data[host] = 0;
  }
  data[host] += seconds;
  save("sites", {data});
}

const save = (key, value) => {
  return new Promise((resolve) => {
      STORAGE.set({ [key]: value }, () => {
          resolve();
      });
  });
};

const getCurrentDate = () => {
  return new Date().toISOString().substr(0, 10);
};

const getCacheStorage = async() => {
  const cache = await getData('cache');
  return {
    ...DEFAULT_CACHE,
    ...cache,
  }
}


//utils commands

export const ALLCOLORS = [
  '#CC1515',
  '#F23C3C',
  '#F28A8A',
  '#E64AD6',
  '#B31EAD',
  '#BAE29B',
  '#89E540',
  '#6DE733',
  '#2ABA86',
  '#15A862',
  '#A6C6E3',
  '#58B3E7',
  '#1780E1',
  '#9080F2',
  '#6525ED'
];

function pad(number) {
  let numberInt = Number(number);
  if (numberInt < 10) {
    return `0${numberInt}`;
  }
  return number;
}

Date.prototype.toISOString = function iso() {
  return `${this.getFullYear()
  }-${pad(this.getMonth() + 1)
  }-${pad(this.getDate())
  }T${pad(this.getHours())
  }:${pad(this.getMinutes())
  }:${pad(this.getSeconds())
  }.${(this.getMilliseconds() / 1000).toFixed(3).slice(2, 5)}`;
};


const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(':');
  return `${pad(hour)}:${pad(minute)}`;
};


const isTabAMatch = (tabUrl, site_dictionary) => {
  const allSites = Object.keys(site_dictionary)
  const tabUrlParts = tabUrl.split(".")
  return tabUrlParts.some(part => {
      return allSites.includes(part)
  });
};

const getActiveTab = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({
          active: true,
          currentWindow: true
      }, (activeTab) => {
          resolve(activeTab[0]);
      });
  });
};

const end = async() => {
  let cacheStorage = await getCacheStorage();
  let active = cacheStorage;
  if (active.name) {
      const currentDate = getCurrentDate();
      const startOfDayTimestamp = new Date(`${currentDate}T00:00:00`).getTime();
      const start = Math.max(startOfDayTimestamp, active.timeStamp);
      const moment = Date.now();
      const seconds = parseInt((moment - start) / 1000, 10);
      cacheStorage = {};
      update(active.name, seconds);
      return cacheStorage;
  }
  return cacheStorage;
};


const getName = (url) => {
  try {
      const host = new URL(url).hostname;
      return host.replace('www.', '').replace('.com', '');
  } catch (error) {
      return '';
  }
};

const saveConfiguration = (key, data) => {
  return save(key, data);
};

const getCurrentTime = (currentDate = null) => {
  if (!currentDate) {
      currentDate = new Date();
  }
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  hours = pad(hours);
  minutes = pad(minutes);
  return `${hours}:${minutes}`;
};


const getBarBackgroundColors = (siteKeys, allSitesConfig) => {
  let index = -1;
  return siteKeys.map((each) => {
      if (!allSitesConfig[each] || !allSitesConfig[each].color) {
          index = (index + 1) % ALLCOLORS.length;
          return ALLCOLORS[index];
      }
    return allSitesConfig[each].color;
  });
}


//background commands

const setActive = async () => {
    const activeTab = await getActiveTab();
    if (activeTab) {
      const { url, id } = activeTab;
      const name = getName(url);
      const configuration = await getData('sites');
      if (isTabAMatch(name, configuration)) {
        const cacheStorage = await getCacheStorage();
        if (cacheStorage.name !== name) {
          await save('cache', {
            name,
            timeStamp: Date.now()
          });
        }
      }
    }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const { url } = tab;
    console.log(url);
    const name = getName(url);
    const cacheStorage = await getCacheStorage();
    if (cacheStorage.name !== name) {
        const updatedCacheStorage = await end();
        await save('cache', updatedCacheStorage);
    }
    if (cacheStorage.name !== name) {
        setActive();
    }
});

chrome.tabs.onActivated.addListener(async () => {
    const cacheStorage = await getCacheStorage();
    if (cacheStorage.name) {
        const updatedCacheStorage = await end();
        await save('cache', updatedCacheStorage);
    }
    await setActive();
});

chrome.windows.onFocusChanged.addListener(async (window) => {
    if (window === -1) {
        const updatedCacheStorage = await end();
        await save('cache', updatedCacheStorage);
    } else {
        await setActive();
}
});

const initialize = async() => {
  save("sites", {
    'facebook' : 0,
    'youtube' : 0,
    'instagram' : 0
  });
}

initialize();

setInterval(() => {
  console.log(getData("sites"));
  console.log(getData("cache"));
}, 5000);
