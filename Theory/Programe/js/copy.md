深浅拷贝

浅层拷贝:

Object.create(obj, Object.getOwnPropertyDescriptors(obj));

{…obj}

Object.assign({}, obj)

效果差的深度拷贝:

JSON.parse(JSON.stringify(obj))

效果好的深拷贝:

https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm