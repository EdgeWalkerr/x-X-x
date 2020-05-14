# hahah

加载js的方式用script导入文件或者写在<script>中， 由scope的问题
如果进行加载的话， 各个浏览器只能同时加载10个以内的js文件
IIFS如何实现scope的
使用静态拼接的话， 生产发布时会生成很多冗余文件， 开发时每次更改文件都要重新拼接

CommonJS AMD ESM 三种模块的问题

side effect / tree shake