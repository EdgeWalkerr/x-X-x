# Performance

![image-20200710103929169](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200710103929169.png?token=ADGPFSBROKKY2VZDFJRFMVK7A7KSA)

![image-20200710103906063](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200710103906063.png?token=ADGPFSAKPAU7NJ2ASUTZAV27A7KQO)

主要原因：

![image-20200710105302675](https://github.com/EdgeWalkerr/images/blob/master/image-20200710102952510.png)

js执行的时间过长，并且第一个有效帧取决于js的执行

1. 找出没有用的工作
   - 要兼容的代码 包括框架、需求等等

2. 找出可以提前做好的工作

3. 找出可以延后的工作
4. 找出可以更高效的工作方法

5. 找出可以不串行的工作， 然后放到service work里面

解决方案有：

1. 在刚开始将第一帧提前在后端渲染成html放到前端,目前首先加载的内容包括__app,  __app中没有包含太多显示在页面中的内容

   - 有很多和执行的时间不相干的代码， 可以直接生成放在前端和执行相关的内容

2. 在前端的第一帧内容渲染出来之前， 不要跑过多和第一帧内容不相关js代码

   - 结合web worker service work将和渲染内容不相关的内容放到service worker中
   - 使用全局的回调函数， 在每个和渲染任务相关的执行完毕了之后， 回调所有js执行栈
   
   