//dont need: isTimelimit exceeded, capitolize, getSecondsToNextBlock?
import storage from './storage';

console.log("utils.js loading...");

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

export default class utils{

    formatTime(timeString) {
        const [hour, minute] = timeString.split(':');
        return `${pad(hour)}:${pad(minute)}`;
    },
    

    isTabAMatch(tabUrl, site_dictionary) {
        const allSites = Object.keys(site_dictionary)
        const tabUrlParts = tabUrl.split(".")
        return tabUrlParts.some(part => {
            return allSites.includes(part)
        });
    },

    getActiveTab() {
        return new Promise((resolve) => {
          chrome.tabs.query({
                active: true,
                currentWindow: true
            }, (activeTab) => {
                resolve(activeTab[0]);
            });
        });
    },

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    },

    async end() {
        const cacheStorage = await storage.getCacheStorage();
        const active = cacheStorage;
        if (active.name) {
            const currentDate = this.getCurrentDate();
            const startOfDayTimestamp = new Date(`${currentDate}T00:00:00`).getTime();
            const start = Math.max(startOfDayTimestamp, active.timeStamp);
            const moment = Date.now();
            const seconds = parseInt((moment - start) / 1000, 10);
            cacheStorage = {};
            storage.update(active.name, seconds);
            return cacheStorage;
        }
        return cacheStorage;
      },

    getName(url) {
        try {
            const host = new URL(url).hostname;
            return host.replace('www.', '').replace('.com', '');
        } catch (error) {
            return '';
        }
    },

    saveConfiguration(key, data) {
        return storage.save(key, data);
    },

    getCurrentTime(currentDate = null) {
        if (!currentDate) {
            currentDate = new Date();
        }
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        hours = pad(hours);
        minutes = pad(minutes);
        return `${hours}:${minutes}`;
    },

    getBarBackgroundColors(siteKeys, allSitesConfig) {
        let index = -1;
        return siteKeys.map((each) => {
            if (!allSitesConfig[each] || !allSitesConfig[each].color) {
                index = (index + 1) % ALLCOLORS.length;
                return ALLCOLORS[index];
            }
          return allSitesConfig[each].color;
        });
      }

};