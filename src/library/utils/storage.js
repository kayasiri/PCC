import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import throttle from 'lodash/throttle';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * This class allows the create of instances to store and access elements within
 * localStorage as a cache. Instances of this class handle the syncing between the
 * local JS cache and localStorage (AsyncStorage in case of native devices).
 */
class Storage {
  static defaults = {
    disablePersist: false,
    enableLocal: Platform.OS === 'web' ? true : false,
    enableSession: false,
    enableAsync: Platform.OS !== 'web' ? true : false,
    // the wait time between persisting the cache to localStorage
    throttleWait: 0,
    // the default ttl for elements that are cached, 0 means never expired
    ttl: 0,
    // function allowing a transformation of the key values, useful for ensuring a specific key format
    transformKey: key => key,
  };

  /**
   * The primary constructor that initially hydrates the cache from localStorage.
   *
   * @param {String} name     the name and key used to store this cache in localStorage
   * @param {Object} options  the object containing the options for this cache
   */
  constructor(name, options = {}) {
    options = merge({}, Storage.defaults, options);
    this.name = name;
    this.throttleWait = options.throttleWait;
    this.disablePersist = options.disablePersist;
    this.enableLocal = options.enableLocal;
    this.enableSession = options.enableSession;
    this.enableAsync = options.enableAsync;
    this.transformKey = options.transformKey;
    this.loading = true;

    this.defaultOptions = {
      ttl: options.ttl || 0,
    };

    console.assert(
      typeof this.defaultOptions.ttl === 'number',
      `Parameter, ttl, must be of type "number", but instead was found to be type "${typeof this
        .defaultOptions.ttl}".`,
    );

    this.loading = this.hydrate().then(() => {
      this.persist();
      return false;
    });
  }

  load = () => this.loading;

  hydrate = async () => {
    try {
      if (this.enableAsync && this.isAsyncStorageExist()) {
        const value = await AsyncStorage.getItem(this.name);
        const cache = deserializeCache(value);
        if (!isEmpty(cache)) {
          this.cache = cache;
          return;
        }
      }

      if (this.enableSession && this.isSessionStorageExist()) {
        const cache = deserializeCache(sessionStorage.getItem(this.name));
        if (!isEmpty(cache)) {
          this.cache = cache;
          return;
        }
      }

      if (this.enableLocal && this.isLocalStorageExist()) {
        const cache = deserializeCache(localStorage.getItem(this.name));
        if (!isEmpty(cache)) {
          this.cache = cache;
          return;
        }
      }

      this.cache = new Map();
    } catch (e) {
      console.log('storage error - ', e);
      this.cache = new Map();
    }
  };

  persist = throttle(() => {
    if (this.disablePersist) {
      return;
    }

    const serializedCache = serializeCache(this.cache);
    if (this.enableAsync && this.isAsyncStorageExist()) {
      AsyncStorage.setItem(this.name, serializedCache);
    }

    if (this.enableSession && this.isSessionStorageExist()) {
      sessionStorage.setItem(this.name, serializedCache);
    }

    if (this.enableLocal && this.isLocalStorageExist()) {
      localStorage.setItem(this.name, serializedCache);
    }
  }, this.throttleWait);

  put = (key, value, options = {ttl: 0}) => {
    const ttl = options.ttl || this.defaultOptions.ttl || 0;

    console.assert(
      typeof ttl === 'number',
      `Parameter, ttl, must be of type "number", but instead was found to be of type "${typeof ttl}".`,
    );

    this.cache.set(this.transformKey(key), {
      expiry: ttl ? now() + ttl : undefined,
      value,
    });

    this.persist();
    return this;
  };

  get = key => {
    const record = this.cache.get(this.transformKey(key));

    if (record) {
      // if cache is expired, delete the value and return undefined
      if (hasExpired(record)) {
        this.delete(this.transformKey(key));
        return undefined;
      }

      return record.value;
    }

    return undefined;
  };

  delete = key => {
    const success = this.cache.delete(this.transformKey(key));
    this.persist();
    return success;
  };

  clear = () => {
    this.cache.clear();
    this.persist();
  };

  /**
   * @see #purge
   * @return {number} the current size of the cache, this may contain expired elements
   */
  size = () => this.cache.size;

  /**
   * Purges this cache of any expired elements. Useful before calling {@link #size}
   * to ensure you get an accurate size.
   */
  purge = () => {
    this.cache.forEach((record, key) => {
      if (hasExpired(record)) {
        this.cache.delete(key);
      }
    });
    this.persist();
  };

  storageExist = async storageType => {
    const test = 'test';
    try {
      const storage =
        storageType === 'async'
          ? AsyncStorage
          : storageType === 'local'
          ? localStorage
          : sessionStorage;

      await storage.setItem(test, test);
      await storage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  isAsyncStorageExist = () => {
    return this.storageExist('async');
  };

  isLocalStorageExist = () => {
    return this.storageExist('local');
  };

  isSessionStorageExist = () => {
    return this.storageExist('session');
  };
}

function serializeCache(deserializedMap) {
  return JSON.stringify(Array.from(deserializedMap.entries()));
}

function deserializeCache(serializedEntries) {
  return new Map(JSON.parse(serializedEntries) || []);
}

/**
 * @param  {Object}  record the record with property expiry
 * @return {Boolean}        whether the record is expired
 */
function hasExpired(record) {
  // be sure to use + operator on expiry as the local storage caching converts it to string
  return record.expiry && record.expiry <= now();
}

/**
 * @return {number} the current time using Date.now
 */
function now() {
  if (!Date.now) {
    return new Date().getTime();
  }

  return Date.now();
}

export default Storage;

// function now() {
//   if (!Date.now) {
//     return new Date().getTime();
//   }

//   return Date.now();
// }

// const setValue = async (key, value) => {
//   console.log('### setValue ###', key, value);
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(value));
//   } catch (e) {
//     console.log('storage - set value error : ' + e);
//   }
// };

// const getValue = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     console.log('### getValue ###', key, value);
//     return value;
//   } catch (e) {
//     console.log('storage - get value error : ' + e);
//   }
// };

// const clearAll = async () => {
//   try {
//     await AsyncStorage.clear();
//   } catch (e) {
//     console.log('storage - clear all error : ' + e);
//   }
// };

// export default {
//   setValue,
//   getValue,
//   clearAll,
// };
