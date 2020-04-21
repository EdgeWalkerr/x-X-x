const proxy = Proxy.revocable({}, {
    set: function (obj, property, value) {
        obj[property] = value + 1
        return false
    }
});
const proxy1 = new Proxy(proxy.proxy, {
    set: function (obj, property, value) {
        // obj[property] = value + 1
        return false
    }
})
proxy.proxy.a = 'asfd'
proxy.proxy // ?
proxy1.a = 'adsf'
proxy1 // ?
const a = { adf: "ASDfa" }
Object.defineProperty(a, 'adf', {
    writable: false
})
a.adf = 'adsf'
a.adf // ?

Object.defineProperty(a, 'adf', {
    writable: true
})
a.adf = 'adsf'
a // ?

