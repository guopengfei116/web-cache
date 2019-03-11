class Cache {

  // meta = {};
  // cache = {};

  constructor(config) {
    this.meta = {};
    this.cache = {};
    this.meta.maxage = config.maxage;
  }

  static createDataBox(data) {
    return {
      data,
      createTime: Date.now(),
    };
  }

  get(key) {
    const cache = this.cache[key];
    if (!cache) return null;

    const { data, createTime } = cache;
    if (Date.now() - createTime > this.meta.maxage * 1000) {
      this.remove(key);
      return null;
    }
  
    return data;
  }

  set(key, value) {
    this.cache[key] = Cache.createDataBox(value);
  }

  remove(key) {
    delete this.cache[key];
  }

}

export default Cache;
