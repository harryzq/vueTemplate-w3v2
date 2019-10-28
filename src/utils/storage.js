
    /**
     * 
     * @param {*} key 
     * @param {*} val 
     */
    let setSessionStorage = (key,val)=>{
       let result = window.sessionStorage.setItem(key,val)
       return result
    }
    /**
     * 
     * @param {*} key 
     */
    let getSessionStorage = (key)=>{
        let result = window.sessionStorage.getItem(key)
        return result
     }
     /**
     * 
     * @param {*} key 
     * @param {*} val 
     */
    let setLocalStorage=(key,val)=>{
        let result = window.localStorage.setItem(key,val)
        return result
     }
     /**
      * 
      * @param {*} key 
      */
    let getLocalStorage=(key)=>{
         let result = window.localStorage.getItem(key)
         return result
    }
    /**
     * 
     * @param {*} type local或session
     * @param {*} key 
     * @param {*} data 
     */
    let emitStorage=(type, key, data) =>{
        // 创建一个StorageEvent事件
        let gaStorage
        if(!window.storageEvent){
            gaStorage = document.createEvent('storageEvent');
        }
        if (type === 'local') {
        const storage = {
            setItem: function (k, val) {
                setLocalStorage(k,val)
                localStorage.setItem(k, val);
                // 初始化创建的事件
                gaStorage.initStorageEvent(key, false, false, k, null, val, null, null);
                // 派发对象
                window.dispatchEvent(gaStorage);
            }
        }
        return storage.setItem(key, data);
      } else {
        const storage = {
            setItem: function (k, val) {
                setSessionStorage(k,val)
                // 初始化创建的事件
                gaStorage.initStorageEvent(key, false, false, k, null, val, null, null);
                // 派发对象
                window.dispatchEvent(gaStorage);
            }
        }
        return storage.setItem(key, data);
      }
    }
     /**
     * 
     * @param {*} type local或session
     * @param {*} key 
     */
    let onStorage = (key,cb)=>{
        window.addEventListener(key, (e) => {
           return cb(e.oldValue||null,e.newValue||null)
            // return {
            //     oldValue:e.oldValue||null,
            //     newValue:e.newValue||null
            // }
        });
    }
export default {
    setSessionStorage,
    getSessionStorage,
    setLocalStorage,
    getLocalStorage,
    emitStorage,
    onStorage
}