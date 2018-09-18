#### 目录结构
```
back-project/
  README.md
  config/
    jest/
      cssTrabsfrorm
      fileTrabsform
    env.js
    paths.js
    polyfills.js
    webpack.config.dev.js
    webpack.config.prod.js
    webpackDevServer.config.js  
  scripts/
    build.js
    start.js
    test.js  
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      app/
        app.less
        App.jsx
      login/
        login.less
        Login.jsx

    App.test.js
    index.js
```
#### 添加环境变量
```bash
1.在项目中可以使用声明在环境中的变量，就好像这个变量是定义在项目的js文件中一样，默认情况下，可以使用的环境变量有NODE_ENV(这个环境变量已经定义好了)，和其他以REACT_APP_开头的环境变量
2.这些环境变量在构建的过程中会自动替换成想要的值，如果在运行的过程中，在静态文件中修改或者使用环境变量，项目不会做出响应，所以你可以重新编译项目
3.普通的环境变量的创建必须要添加REACT_APP_开头，并且其他的环境变量除了NODE_ENV以外，都会被忽略，这是为了避免和系统本机的公钥冲突，如果修改了环境变量，必须重启你的项目
4.这些环境变量会被定义在process.env上面，比如你有一个环境变量叫做REACT_APP_SECRET_CODE当你在js中使用必须通过process.env.REACT_APP_SECRET_CODE才能访问到
5.有一种内置的环境变量叫做NODE_ENV，你可以通过process.env.NODE_ENV访问到这个变量，react不允许自己设置这个变量的值，默认已经设置好了，有development,test,production这几种情况
6.这些环境变量可以很方便的得到运行环境的相关信息和项目本身之外的敏感数据信息
7.使用环境变量之前需要自己定义变量，定义变量的方式有两种，第一种是在你的命令行工具中定义，第二种是新建一个.env文件，在public中的index.html中也可以使用环境变量%REACT_APP_WEBSITE_NAME%必须以REACT_APP开头，所有的环境变量都是编译的时候插入
    第一种方式：通过命令行的方式临时的添加环境变量，只介绍windows
        set REACT_APP_SECRET_CODE=abcdef&&npm start
    第二种方式：将环境变量定义在.env文件中
        在项目根目录中创建.env文件，在里面定义变量 REACT_APP_SECRET_CODE=abcdef，还有其他类型的文件，自行了解
全局通过process.env.REACT_APP_SECRET_CODE可判断当前的自定义环境变量
   ```
#### 在开发环境中使用HTTPS
```
    可能你后台使用https的，所以你可以在cmd运行的时候输入set HTTPS=true&&npm start即可
```
#### 运行测试功能
```bash
   react脚手架使用jest作为测试工具，jest工具用来做单元测试的，端到端的测试react不支持
    jest找自己的测试文件，放在src目录下，有如下三条规则
        1.__tests__目录下的.js文件
        2.后缀.test.js文件
        3.后缀.spec.js文件
        建议最好将测试文件和源文件放一起，减少搜索路径
    命令行接口
        当你运行npm run test，jest会开启watch模式，一旦以保存文件，就会重新更新
```

#### npm start/ npm run dev 打包运行过程
```bash
  1. 执行/scripts/start.js文件,
     start.js结合webpack.DevServerUtils.js详述了确定url的过程(自定义端口号,请求协议和域名)
     内部引入
     require('../config/env');
     const paths = require('../config/paths');
     const config = require('../config/webpack.config.dev');
     const createDevServerConfig = require('../config/webpackDevServer.config');
     最终: openBrowser(urls.localUrlForBrowser);
  env.js的作用: 确定当前运行的环境 即: 获取到最新的process.env,内部有自定义环境变量的实现原理;
  paths.js的作用: 主要生成PublicPath, 及配置应用运行的路径
  webpack.config.dev.js的作用: 开发环境运行相关配置
  2. 执行/scripts/build.js文件,
     内部引入
     require('../config/env');
     const config = require('../config/webpack.config.prod');
     const paths = require('../config/paths');
  webpack.config.prod.js的作用: 生产环境打包相关配置
```
```
npm run build之后要运行build下的打包文件需要
npm install -g serve
serve -s build
```
#### map文件由devtool属性控制
```
    生产环境需要禁用：
    map文件由devtool属性控制，如果不想要map，注释掉就可以，大约第57行；
```
#### 在执行了npm run eject之后实现antd的按需加载
```bash
    第一步：用create-react-app创建完成项目后，执行yarn eject 。在config文件夹会显示配置文档
    第二步：添加插件yarn add babel-plugin-import --save-dev  yarn add antd --save-dev 
    第三步：在congif文件夹下webpack.config.dev.js第147行添加代码
    options: {
         plugins: [
         ['import', [{ libraryName: "antd", style: 'css' }]], ], 
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds. 
          cacheDirectory: true, },            
    第四步：在config文件下webpack.config.prod.js第154行添加 
    options: {
        plugins: [
             ['import', [{ libraryName: "antd", style: 'css' }]], 
              ], compact: true, },
    第五步：在页面引入antd  import { Button } from 'antd';
```

#### 在执行了npm run eject之后配置less
```javascript
 在webpack.config.dev.js 和 webpack.config.prod.js 做一下修改
    exclude: [
  /\.html$/,
  /\.(js|jsx)$/,
  /\.(css|less)$/,   //敲黑板，划重点
  /\.json$/,
  /\.bmp$/,
  /\.gif$/,
  /\.jpe?g$/,
  /\.png$/,
],
{
  test: /\.(css|less)$/,   //敲黑板，划重点
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    //敲黑板，划重点
    {
      loader: require.resolve('less-loader') // compiles Less to CSS
    }
  ],
}
```
#### 请求地址中若想不要#号，需要将 HashRouter用 BrowserRouter替代
