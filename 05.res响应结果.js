const express = require('express');

const app = express();

app.get('/login', (req, res) => {
  res.json({
    name: 'cxx',
    age: 21
  })
})

app.listen(8000, () => {
  console.log('服务器启动成功');
})