const path = require('path')
const express = require('express')
const multer = require('multer')

const app = express()
// const upload = multer({
//   dest: './uploads/'
// })
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage
})

app.use(express.json());

app.post('/login', upload.any(), (req, res, next) => {
  console.log(req.body);
  res.end('用户登录成功')
})

//创建内部中间件，upload.array()可以上传多个中间件
app.post('/upload', upload.fields([{
  name: 'file',
  maxCount: 2
}]), (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  console.log(req.files);
  res.end('文件上传成功')
})

// app.post('/upload', upload.array('file'), (req, res, next) => {
//   req.header('Access-Control-Allow-Origin', "*")
//   res.end('文件上传成功')
// })
app.listen(8000, () => {
  console.log('form-data解析服务器启动成功');
})