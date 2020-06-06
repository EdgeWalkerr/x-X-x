深浅拷贝

浅层拷贝:

Object.create(obj, Object.getOwnPropertyDescriptors(obj));

{…obj}

Object.assign({}, obj)

效果差的深度拷贝:

JSON.parse(JSON.stringify(obj))

能够避免循环拷贝的方式

将每一个object放入到一个map中，如果说为true， 就将原来的object放入到里面

效果好的深拷贝:

https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm