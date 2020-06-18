# Webpack优化策略

## 构建优化

1. 使用 source-map 特性查看运行时的源代码

    Dev-tool:

    eval:执行代码

    source-map: 产生.map文件

    cheap: 不包含列信息

    module: 包含第三方模块

    inline: 将.map作为DataURL嵌入

2. 使用 WebpackDevServer 实现浏览器自动刷新

    监听文件变化 hot reload

    devServer: {}

3. 缩小文件范围，优化构建速度

    Resolve.modules

    resolve: {

    ​	modules: [path.resolve(__dirname, './node_modules')],

    ​	alias: {

    ​		"vue": path.resolve(

    ​			__dirname,

    ​			"./node_modules/vue/dist/vue.esm.js"

    ​		),

    ​		"react": path.resolve(

    ​				__dirname, 

    ​				"./node_modules/react/umd/react.production.min.js"

    ​		 ),

    ​		},

    ​	}

    }

4. CSS 支持：支持 less、sass，并支持自动补齐浏览器前缀 postcss

    使用less或者sass

5. 优化文件监听范围

    监听时使用watchOptions来减少文件监听内容

    可能需要忽略node_modules

    watchOptions: {

    ​	ignored: '/node_modules/'

    }

6. DllPlugin  、HardSourceWebpackPlugin 优化构建性能

    对不会频繁变化的第三方库使用hardSourceWebpackPlugin

    new HardSourceWebpackplugin

7. 【重】使用 happypack 并发执行打包任务

    并行化打包

    const HappyPack = require("happypack")

    **const** os = require("os"); //充分发挥多核的作用，进程数量设置为设备的核数

    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

    {

    ​	rules: [

    ​		{

    ​			test: /\.css$/,

    ​			use: ["happypack/loader?id=css"]

    ​		},

    ​		{

    ​			test: /\.less/,

    ​			use: ["happypack/loader?id=less"]		

    ​		}

    ​	],

        plugins: [
                new HappyPack({
                id: "css",
                loaders: ["style-loader", "css-loader"],
                threadPool: happyThreadPool
              }),
              new HappyPack({
                id: "less",
                loaders: ["style-loader", "css-loader","less-loader"],
                threadPool: happyThreadPool
              }),
              new HappyPack({
                id: "pic",
                loaders: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name]_[hash:6].[ext]",
                      outputPath: "images/"
                    }
                  }
                ],
                threadPool: happyThreadPool
              }),
              new HappyPack({
                id: "ttf",
                loaders: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                    }
                  }
                ],
                threadPool: happyThreadPool
              }),
              new HappyPack({
                id: "babel",
                loaders: [
                  {
                    loader: "babel-loader"
                  }
                ],
                threadPool: happyThreadPool
              }),
         ]
    }


## 输出优化

1. 抽离、压缩CSS

    minicssExtractPlugin

2. 压缩 HTML

    htmlwebpackplugin

3. 【重】Tree Shaking

    ESM与AMD等等区别：

    ESM设计思想时尽量的静态化，在编译时就确定模块的依赖关系，输入和输出，

    CommonJS和AMD模块， 只能在运行时确定

    ESM模块输出时值引用， 而CommonJS和AMD模块， 是值的拷贝

4. 代码分割 Code Splitting

#### Webpack 3种hash

1. hash

    每次修改文件， 所有的文件名hash值都会改变

2. chunkhash

    被修改了的文件才会更改hash值

3. contenthash

    更改了文件内容会更改hash值

    

加载js的方式用script导入文件或者写在<script>中， 由scope的问题
如果进行加载的话， 各个浏览器只能同时加载10个以内的js文件
IIFS如何实现scope的
使用静态拼接的话， 生产发布时会生成很多冗余文件， 开发时每次更改文件都要重新拼接

CommonJS AMD ESM 三种模块的问题

side effect / tree shake

sourceMap问题