class DB {
constructor(databaseName, version, storeOptions) {
 // 缓存数据库名称：name + version为key
 this._dbs = {};
 this._databaseName = databaseName;
 this.open(databaseName, version, storeOptions);
}


 /**
  * 打开数据库
  */
 /**
  * 获取store
  */
 /**
 * 获取一个store
 */
 collection(storeName, version) {
   this.currentStore = storeName;
   this._getObjectStore(storeName, version);
   return this;
 }

async _getTransaction(storeName, version) {
 let db;
 // 先从缓存获取
 if (this._dbs[this._databaseName + version]) {
   db = this._dbs[this._databaseName + version];
 } else {
   db = this.open(this._databaseName, version);
 }
 return db.transaction( [ storeName ], 'readwrite' );
}
open(databaseName, version, storeOptions) {
   return new Promise((resolve, reject) => {
     // 有缓存的情况
     if (this._dbs[databaseName + version]) {
       resolve(this._dbs[databaseName + version]);
       return;
     }

      const request = indexedDB.open(databaseName, version);
       // 版本更新，创建新的store的时候
      request.onupgradeneeded = (event) => {
          // IDBDatabase
         const database = event.target.result;
         // 缓存起来
         this._dbs[databaseName + version] = database;
         for (const key in storeOptions) {
           if (database.objectStoreNames.contains(key) === false) {
             const keyPath = storeOptions[key] ? storeOptions[key] : [];
             database.createObjectStore(key, { keyPath });
            }
         }
         resolve(database);
      };
     request.onsuccess = (event) => {
       // IDBDatabase
       const database = event.target.result;
       // 缓存起来
       this._dbs[databaseName + version] = database;
       resolve(database);
     };
     request.onerror = (event) => {
       reject(event);
       console.error('IndexedDB', event);
     };
   });
}


/**
 * 获取store
 * ObjectStore: 表示允许访问IndexedDB数据库中的一组数据的对象存储，
 */
  async _getObjectStore(storeName, version) {
    let transaction = await this._getTransaction(storeName, version);
    return transaction.objectStore(storeName);
  }


get(data) {
   return new Promise((resolve, reject) => {
     this._getObjectStore(this.currentStore).then((objectStore) => {
       const request = objectStore.get(data);
       request.onsuccess = function ( event ) {
         resolve(event.target.result);
       };
       request.onerror = (event) => {
         reject(event);
       }
      });
   });
}

add(data) {
 return new Promise((resolve, reject) => {
     this._getObjectStore(this.currentStore).then((objectStore) => {
       const request = objectStore.add(data);
       request.onsuccess = function ( event ) {
         resolve(event.target.result);
       };
       request.onerror = (event) => {
         reject(event);
       }
     });
  });
}

delete(data) {
 return new Promise((resolve, reject) => {
     this._getObjectStore(this.currentStore).then((objectStore) => {
       const request = objectStore.delete(data);
       request.onsuccess = function ( event ) {
         resolve(event.target.result);
       };
       request.onerror = (event) => {
         reject(event);
       }
     });
  });
}

put(data) {
 return new Promise((resolve, reject) => {
     this._getObjectStore(this.currentStore).then((objectStore) => {
       const request = objectStore.put(data);
       request.onsuccess = function ( event ) {
         resolve(event.target.result);
       };
       request.onerror = (event) => {
         reject(event);
       }
     });
  });
}

clear(storeName) {
 return new Promise((resolve, reject) => {
     this._getObjectStore(this.currentStore).then((objectStore) => {
       const request = objectStore.clear(data);
       request.onsuccess = function ( event ) {
         resolve(event.target.result);
       };
       request.onerror = (event) => {
         reject(event);
       }
     });
  });
}


}
