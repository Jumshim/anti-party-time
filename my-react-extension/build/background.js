// import utils from './js';
// import storage from './storage.js';

console.log("background.js loading...");

//storage commands

const STORAGE = chrome.storage.local;

const getData = (key) => {
  return new Promise((resolve) => {
    STORAGE.get(key, (result) =>
      result[key] ? resolve(result[key]) : resolve({})
    );
  });
};

const updateTime = async (site, time) => {

  let lobbyKey = await getData("lobby")
  console.log("lobbyKey: ", lobbyKey["id"])

  let email = await getData("user")
  console.log("email: ", email)

  const queryParams = {
    "user_email": email,
    "hash": lobbyKey["id"],
    "website": site,
    "time_spent": time
  };

  console.log("params: ", JSON.stringify(queryParams))

  const response = fetch("http://127.0.0.1:5000/sites_list?", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryParams),
  })
    .then((response) => {
      console.log(`response fetched: ${JSON.stringify(response)}`);
      return response?.json();
    })
    .then((data) => {
      console.log("data:", data);
    });
};

const update = async (host, seconds) => {
  console.log(host, "updating...");
  let data = await getData("sites");
  if (!data[host]) {
    data[host] = 0;
  }
  data[host] += seconds;

  updateTime(host, data[host])

  save("sites", data);
};

const save = (key, value) => {
  // console.log("saving...", key, value);
  return new Promise((resolve) => {
    STORAGE.set({ [key]: value }, () => {
      resolve();
    });
  });
};

const getCurrentDate = () => {
  return new Date().toISOString().substr(0, 10);
};

const getCacheStorage = async () => {
  const cache = await getData("cache");
  return {
    ...cache,
  };
};

//utils commands

export const ALLCOLORS = [
  "#CC1515",
  "#F23C3C",
  "#F28A8A",
  "#E64AD6",
  "#B31EAD",
  "#BAE29B",
  "#89E540",
  "#6DE733",
  "#2ABA86",
  "#15A862",
  "#A6C6E3",
  "#58B3E7",
  "#1780E1",
  "#9080F2",
  "#6525ED",
];

function pad(number) {
  let numberInt = Number(number);
  if (numberInt < 10) {
    return `0${numberInt}`;
  }
  return number;
}

Date.prototype.toISOString = function iso() {
  return `${this.getFullYear()}-${pad(this.getMonth() + 1)}-${pad(
    this.getDate()
  )}T${pad(this.getHours())}:${pad(this.getMinutes())}:${pad(
    this.getSeconds()
  )}.${(this.getMilliseconds() / 1000).toFixed(3).slice(2, 5)}`;
};

const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(":");
  return `${pad(hour)}:${pad(minute)}`;
};

const isTabAMatch = (tabUrl, site_dictionary) => {
  // console.log("matching...");
  const allSites = Object.keys(site_dictionary);
  const tabUrlParts = tabUrl.split(".");
  // console.log(tabUrlParts);
  // console.log(allSites);
  return tabUrlParts.some((part) => {
    return allSites.includes(part);
  });
};

const getActiveTab = () => {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (activeTab) => {
        resolve(activeTab[0]);
      }
    );
  });
};

//poop
const end = async () => {
  let cacheStorage = await getCacheStorage();
  let active = cacheStorage;
  if (active.name) {
    const currentDate = getCurrentDate();
    const startOfDayTimestamp = new Date(`${currentDate}T00:00:00`).getTime();
    const start = Math.max(startOfDayTimestamp, active.timeStamp);
    const moment = Date.now();
    const seconds = parseInt((moment - start) / 1000, 10);
    cacheStorage = {};
    console.log("adding...", seconds, "to ", active.name);
    update(active.name, seconds);
    return cacheStorage;
  }
  return cacheStorage;
};

const getName = (url) => {
  try {
    const host = new URL(url).hostname;
    return host.replace("www.", "").replace(".com", "");
  } catch (error) {
    return "";
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
};

//background commands

const setActive = async () => {
  const activeTab = await getActiveTab();
  // console.log("activeTab: ", activeTab);
  if (activeTab) {
    // console.log("activeTab is true");
    const { url, id } = activeTab;
    const name = getName(url);
    const configuration = await getData("sites");
    // console.log("logging name and config:");
    // console.log(name);
    // console.log(configuration);
    // console.log();
    if (isTabAMatch(name, configuration)) {
      // console.log("tab is a match :D");
      const cacheStorage = await getCacheStorage();
      if (cacheStorage.name !== name) {
        await save("cache", {
          name,
          timeStamp: Date.now(),
        });
      }
    }
  }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const { url } = tab;
  // console.log(url);
  const name = getName(url);
  const cacheStorage = await getCacheStorage();
  if (cacheStorage.name !== name) {
    const updatedCacheStorage = await end();
    await save("cache", updatedCacheStorage);
  }
  if (cacheStorage.name !== name) {
    setActive();
  }
});

chrome.tabs.onActivated.addListener(async () => {
  const cacheStorage = await getCacheStorage();
  if (cacheStorage.name) {
    const updatedCacheStorage = await end();
    await save("cache", updatedCacheStorage);
  }
  await setActive();
});

chrome.windows.onFocusChanged.addListener(async (window) => {
  if (window === -1) {
    const updatedCacheStorage = await end();
    await save("cache", updatedCacheStorage);
  } else {
    await setActive();
  }
});

const initialize = async () => {
  save("sites", {});
};

setInterval(() => {
  console.log(getData("sites"));
  // console.log(getData("cache"));
}, 20000);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "signInWithGoogle": {
      chrome.tabs.onUpdated.removeListener(setTokens);
      const url = request.payload.url;

      chrome.tabs.create({ url: url, active: true }, (tab) => {
        chrome.tabs.onUpdated.addListener(setTokens);
        sendResponse(request.action + " executed");
      });

      break;
    }
    default:
      break;
  }
  return true;
});

const chromeStorageKeys = {
  gauthAccessToken: "gauthAccessToken",
  gauthRefreshToken: "gauthRefreshToken",
};

const setTokens = async (tabId, changeInfo, tab) => {
  if (tab.status === "complete") {
    if (!tab.url) return;

    const url = new URL(tab.url);

    const params = new URL(url.href).searchParams;
    const hashedParams = url.hash.substring(1);
    const hashParams = new URLSearchParams(hashedParams);
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    if (accessToken && refreshToken) {
      if (!tab.id) return;
      await chrome.tabs.remove(tab.id);

      await chrome.storage.sync.set({
        [chromeStorageKeys.gauthAccessToken]: accessToken,
      });
      await chrome.storage.sync.set({
        [chromeStorageKeys.gauthRefreshToken]: refreshToken,
      });

      chrome.tabs.onUpdated.removeListener(setTokens);
    }
  }
};
