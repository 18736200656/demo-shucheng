const localEvent = {
  StorageGetter:function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  StorageSetter:function (key,value) {
    return localStorage.setItem(key,JSON.stringify(value))
  }
}
export default localEvent
