import localforage from 'localforage';

const debug = process.env.NODE_ENV !== 'production';

const hasStore = typeof window !== 'undefined' && 'localStorage' in window || 'indexedDB' in window;
const promiseWrap = asyncHandler => new Promise((resolve, reject) => {
  if (!hasStore) return reject();
  asyncHandler(resolve, reject);
});

// 数据持久化
const setItem = stores => {
  return promiseWrap((resolve, reject) => {
    const failedNames = [];

    // 确保持久化只运行一次
    const dataPersistence = (() => {
      let executed = false;

      return () => {
        if (executed) return;
        executed = true;

        const results = stores.map(store => {
          const result = localforage.setItem(store.name, store.data);

          if (debug) {
            result.then(_ => {
              console.log(`Successful: 持久化成功: ${store.name}`);
            }).catch(e => {
              failedNames.push(store.name);
              console.log(`Failed: 持久化失败: ${store.name} - ${e.message}`);
            });
          }

          return result;
        });

        Promise.all(results)
          .then(_ => {
            if (debug) console.log(`All Successful: 持久化工作已完成`);
            console.log(_);
            resolve(_);
          })
          .catch(e => {
            if (debug) console.log(`All Failed: 未能全部持久化: ${failedNames.join(',')} - ${e.message}`);
            reject(e);
          });
      };
    })();

    // 在刷新或卸载时启动持久化
    window.addEventListener('beforeunload', dataPersistence);
    window.addEventListener('unload', dataPersistence);
    // window.addEventListener('dblclick', dataPersistence);
  });
};

// 获取持久化数据
const getItem = names => {
  return promiseWrap((resolve, reject) => {
    const datas = [];
    const failedNames = [];

    const results = names.map(name => {
      const result = localforage.getItem(name)

      result.then(data => {
        if (debug) console.log(`Successful: 数据提取成功: ${name}`);
        console.log(data);
        datas.push(data);
      }).catch(e => {
        if (debug) console.log(`Failed: 数据提取失败: ${name}`);
        datas.push({});
        failedNames.push(name);
      });

      return result;
    });

    // 全部取值完毕后传递结果
    Promise.all(results)
      .then(_ => {
        if (debug) console.log(`All Successful: 数据提取完毕`);
        console.log(_);
        resolve(_);
      })
      .catch(e => {
        if (debug) console.log(`All Failed: 数据未提取完毕: ${failedNames.join(',')} - ${e.message}`);
        console.log(datas);
        reject(datas);
      });
  });
};

export default { setItem, getItem };
