import express from 'express';
import path from 'path';

const app = express();

const root = path.join(__dirname, '../../');

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/dist/client/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000!'));

/*---------------------------- DOC -------------------------
  app.use()
      Express.js provides the use function, which runs 
      a series of commands when a given path matches. 
      When executing this function without a path, 
      it is executed for every request.
  next()
      app.get('/', function (req, res, next) {
        console.log('first function');
        next();
      }, function (req, res) {
        console.log('second function');
        res.send('Hello World!');
      });
  app.get('*'
      app.get('*', (req, res) => {
        res.send('* Hello World!');
      });
*/