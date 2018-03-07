const express = require('express');
const path = require('path')
const ejs = require('ejs')
var history = require('connect-history-api-fallback');
const router = express.Router()
const app = express();
app.set('views', __dirname);
app.set('view engine', 'html')
app.engine('html', ejs.__express)
app.use('/',history());
app.use('/dist', express.static(path.join(__dirname,'/dist')))
app.use('/', express.static(path.join(__dirname)))
router.get('/', (req, res) => {
    res.status(200).render('index', {
        title: '首页'
    })
})
app.use(router);
app.use((req, res) => {
    res.status(404).send('File not found!')
})
app.listen(3000, function () {   //监听http://127.0.0.1:3000端口
    console.log("server start");
});