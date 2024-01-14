const data = {
    lobby: {
        id: 142434,
    },
    sites : {
        'facebook' : 12000,
        'youtube' : 32000,
        'instagram' : 6000
    },
    cache : {
        //site:
        //timestamp:
    }
};

export default {
    get(key, callback) {
      callback(data);
    },
    set(details, callback) {
      const key = Object.keys(details)[0];
      data[key] = details[key];
      callback();
    }
  };