import express from 'express';
import path from 'path';

import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';

const app = express();

//compresses all the responses going through it.
//add it very high in your routing order so that all the requests are affected
app.use(compress());
//allow CORS (cross-origin resource sharing) requests
//It merely sets a wildcard with * inside of Access-Control-Allow-Origin
app.use(cors());

/**
 * See https://github.com/helmetjs/helmet. 
 * add some cross-site scripting (XSS) protection tactics
 * remove the X-Powered-By HTTP header
 * ensure that no one can inject malicious code (CSP: Content-Security-Policy)
 *    => prevents attackers from loading resources from external URLs
 *    => see https://helmetjs.github.io/docs/csp/
 * IMPORTANT: initialize Helmet very high in your Express router 
 *            so that all the responses are affected
 */
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "*.amazonaws.com"]
  }
}));
// do not include referer when changing domain: hide where you come from
// so Referrer is set only when routing on same host
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

//ROOT
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

  app.get('/', function (req, res, next) {
    var random = Math.random() * (10 -1) + 1; // 1 >= n <= 10
    // skip next handler in current app.get(), 
    // goto next app.get() with same path, log "second"
    if (random > 5) next('route');
    // goto "first", next handler function in current app.get()
    else next();                      
  }, function(req, res, next) {
    res.send('first');
  });

  app.get('/', function(req, res, next) {
    res.send('second');
  });
*/