import Cache from './cache';
import persistemce from './persistence';

let caches = {};
let collections = {};
persistemce.getItem(['caches', 'collections']).then(datas => {
  caches = datas[0];
  collections = datas[1];
});
persistemce.setItem([
  {
    name: 'caches',
    data: caches,
  },{
    name: 'collections',
    data: collections,
  },
]);

class WebCache extends Cache {

  static createCache(name, config) {
    if (WebCache.getCache(name)) return WebCache.getCache(name);

    if (!config || typeof config !== 'object') {
      throw new TypeError('factory createCache arguments error');
    }
    caches[name] = new WebCache(config);
    return caches[name];
  }

  static getCache(name) {
    return caches[name];
  }

  static deleteCache(name) {
    delete caches[name];
  }

  constructor(config) {
    super(config);
  }

  async requestBefore(key, getRequestData) {
    let data = this.get(key);
    if (!data) {
      data = await getRequestData(); 
      this.set(key, data);
    }
    return data;
  }

}

export default WebCache;
