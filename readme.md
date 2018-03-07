# mars系统移动端项目


## 技术栈

react + redux + react-router + webpack + ES6/7 + fetch + less + flex



## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
git clone https://github.com/duxianwei520/react.git  

cd react （进入当前的项目）

npm install  (安装依赖包)

npm start (运行本地开发环境)

npm run build (打包)

另开启一个命令窗口 启动node的本地json数据代理服务

node mockserver.js (前端本地用node模拟接口进程)

```


## 开发和测试人员

前端：张谊东、黎上

后端：王瑞杰

测试：米佳



## 功能一览
- [√] 项目按路由模块加载
- [√] 登录，以及登录权限控制
- [√] 退出
- [√] 欢迎主页
- [√] 左侧菜单，正常moni切换
- [√] redux完整范例
- [√] nodejs代理数据示例
- [√] 页面高度flex自适应
- [√] fetch数据跨域的设置
- [√] 实时的webpack包大小预览

## 项目结构

```
.
├─.babelrc                            // babel的配置
├─.config.json                        // 如果使用了ip代理，那么配置文件在这里
├─.eslintcache                        // eslint的缓存
├─.eslintignore	                      // eslint设置忽略的文件
├─.eslintrc.json                      // eslint的配置文件
├─.gitignore                          // git忽略上传的文件
├─mockserver.js                       // node本地转发json的执行文件
├─package.json                        // npm命令包
├─proxy.js                            // 设置代理的js,现在基本不用
├─readme.md                           // 项目介绍
├─webpack-test.config.js              // webpack测试的配置文件，目前还没做
├─webpack.config.js                   // 目前项目webpack的配置文件
├─_config.yml 
├─_gitattributes
├─test
|  └setup-test-env.js
├─screenshots                         // 项目截图
|      ├─list.png
|      ├─login.png
|      ├─receiveData.png
|      ├─requestData.png
|      └welcome.png
├─mockapi                             // 前端静态json数据存放的文件夹
|    └data.json
├─app                                 // 页面主文件
|  ├─client1.js
|  ├─history.js
|  ├─index.html                       // 入口html文件，配置静态菜单等全局常见变量
|  ├─routes.js                        // 路由配置
|  ├─utils                            // 公用的文件
|  |   ├─ajax.js                      // 发送异步获取数据的配置
|  |   ├─config.js                    // 常用的配置
|  |   └index.js                      // 发送异步数据前的准备工作
|  ├─style                            // 样式库
|  |   ├─base.less                    // 全局通用的样式
|  |   └theme.less                    // 存放变量的less
|  ├─store                            // redux的store的配置
|  |   └configureStore.js
|  ├─reducers                         // reduce的配置
|  |    ├─common.js
|  |    ├─house.js
|  |    ├─index.js
|  |    └tabList.js
|  ├─pages                            // 项目绝大部分业务文件
|  |   ├─Welcome.js
|  |   ├─test
|  |   |  ├─index.js
|  |   |  ├─sub.js
|  |   |  └third.js
|  |   ├─house
|  |   |   ├─houseManage.js
|  |   |   └index.js
|  ├─middleware                       
|  |     ├─index.js
|  |     ├─logger.js
|  |     └router.js
|  ├─images                           // 图片文件夹
|  |   ├─default.png
|  |   ├─leftBg.jpg
|  |   └navcontrol.png
|  ├─iconfont
|  |    ├─iconfont.eot
|  |    ├─iconfont.svg
|  |    ├─iconfont.ttf
|  |    └iconfont.woff
|  ├─containers                       // 全局的框架文件 
|  |     ├─App
|  |     |  ├─extra.js
|  |     |  ├─footer.js
|  |     |  ├─header.js
|  |     |  ├─index.js
|  |     |  ├─login.js
|  |     |  ├─rightAside.js
|  |     |  ├─tabList.js
|  |     |  ├─leftNav
|  |     |  |    └index.js
|  ├─constants
|  |     ├─actionTypes.js
|  |     └index.js
|  ├─components                        // 公用的组件库 
|  |     ├─index.less
|  |     ├─searchTable
|  |     |      └index.js
|  |     ├─searchForm
|  |     |     └index.js
|  |     ├─searchChosen
|  |     |      └index.js
|  |     ├─multiSelect
|  |     |      └index.js
|  ├─api                              // 整个项目API的url配置
|  |  ├─common.js
|  |  ├─house.js
|  |  └index.js
|  ├─actions                          // 整个项目的actions配置
|  |    ├─common.js
|  |    ├─house.js
|  |    └tabList.js


```