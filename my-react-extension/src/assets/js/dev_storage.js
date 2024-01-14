const data = {
  'lobby': {
    'id': 142434,
  },
  'sites' : {
    'facebook' : 12000,
    'youtube' : 32000,
    'instagram' : 6000
  },
  'rankings' : [
    [
      3,  // user id
      200,  // total seconds watched
      1 // ranking (descending)
    ], 
    [2, 115, 2] 
  ],
  "users": {
    "2": {
      "email": "test@email.com", 
      "name": "Test", 
      "sites": {
        "facebook": 15, 
        "youtube": 100
      }
    },
    
    "3": {
      "email": "smyan@email.com", 
      "name": "Smyan", 
      "sites": {
      "\"instagram.com": 200
      }
    }  
  }, 
  
  
'cache' : {
    //site:
    //timestamp:
  }
};

const printTest = async () => {
  const initRankings = await cslFuncs.getData('rankings');
  const initUsers = await cslFuncs.getData('users');
  
  console.log('testing rankings and users init')
  console.log(initRankings)
  console.log(initUsers)
};
printTest();


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