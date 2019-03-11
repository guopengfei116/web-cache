import WebCache from 'web-cache';

const webCache = WebCache.createCache('products', {
  // 有效期5分钟
  maxage: 60 * 5
});
const request = webCache.requestBefore;

const _products = [
  {"id": 1, "title": "iPad 4 Mini", "price": 500.66, "inventory": 2},
  {"id": 2, "title": "iPhone 8", "price": 4999.66, "inventory": 10},
  {"id": 3, "title": "iPhone 8Plus", "price": 5999.66, "inventory": 5},
  {"id": 4, "title": "iPhone XR", "price": 6999.99, "inventory": 5},
  {"id": 5, "title": "iPhone XS", "price": 8666.99, "inventory": 5},
  {"id": 6, "title": "iPhone XS Max", "price": 8999.88, "inventory": 5},
  {"id": 7, "title": "XiaoMi 8", "price": 1999.88, "inventory": 5},
  {"id": 8, "title": "XiaoMi 8SE", "price": 1599.99, "inventory": 5},
  {"id": 9, "title": "XiaoMi 9", "price": 2999.99, "inventory": 5},
  {"id": 10, "title": "XiaoMi 9SE", "price": 1999.69, "inventory": 5},
  {"id": 11, "title": "XiaoMi Mix3", "price": 2999.69, "inventory": 5},
  {"id": 12, "title": "RedMi 7", "price": 999.99, "inventory": 5},
  {"id": 13, "title": "RedMi 7 Pro", "price": 1399.69, "inventory": 5},
  {"id": 14, "title": "HuaWei Mate20", "price": 4999.89, "inventory": 5},
  {"id": 15, "title": "HuaWei Mate20 Pro", "price": 5999.89, "inventory": 5},
  {"id": 16, "title": "HuaWei Mate20 RS", "price": 5999.89, "inventory": 5},
  {"id": 17, "title": "HuaWei Mate20 X", "price": 6999.99, "inventory": 5},
  {"id": 18, "title": "RongYao Magic2", "price": 3999.99, "inventory": 5},
  {"id": 19, "title": "RongYao V20", "price": 2888.99, "inventory": 5},
  {"id": 20, "title": "SamSung Galaxy S10", "price": 5888.98, "inventory": 5},
  {"id": 21, "title": "SamSung Galaxy S10e", "price": 4888.98, "inventory": 5},
  {"id": 22, "title": "SamSung Galaxy S10+", "price": 6888.98, "inventory": 5},
];

// Mock Api
function _getProducts({pageSize, pageIndex}) {
  return new Promise((resolve, reject) => {
    const pageTotal = Math.ceil(_products / pageSize);
    const startIndex = pageSize * (pageIndex - 1);
    const endIndex = startIndex + pageSize <= _products.length ? startIndex + pageSize : _products.length;
    const result = {
      products: _products.slice(startIndex, endIndex),
      totalPage: Math.ceil(_products.length / pageSize),
    };
    setTimeout(() => {
      resolve(result);
    }, 1000);
  });
}

export default {
  // no use webCache
  // getProducts(params) {
  //   return _getProducts(params);
  // },

  // use webCache
  getProducts(params) {
    const cacheKey = `${JSON.stringify(params)}`;
    return request(cacheKey, () => _getProducts(params));
  },
};
