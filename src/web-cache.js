import Cache from './cache';

const caches = {};

class WebCache extends Cache {

  static createCache(name, config) {
    if (!config || typeof config !== 'object') {
      throw new TypeError('factory createCache arguments error');
    }
    caches[name] = new WebCache(config);
    return caches[name];
  }

  static getCache(name) {
    return caches[name];
  }

  constructor(config) {
    super(config);
    this.requestBefore = this.requestBefore.bind(this);
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
