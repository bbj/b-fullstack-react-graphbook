import express from 'express';

const app = express();
// app.get('*', (req, res) => {
//   res.send('* Hello World!');
// });
app.get('/', function (req, res, next) {
  console.log('first function');
  // next();
}, function (req, res) {
  console.log('second function');
  res.send('Hello World!');
});
app.listen(8000, () => console.log('Listening on port 8000!'));