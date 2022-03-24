import express from 'express';
import path from 'path';

import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';

//from server/services/index.js
// export default { graphql, ...};
import services from './services';

/**
 * Init express server
 */
const app = express();

/**
 * For convenience, we loop through all indexes of the services object and 
 * use the index as the name of the route the service will be bound to. 
 * The path would be /example for the example index in the services object. 
 * For a typical service, such as a REST interface, we rely on the standard 
 * app.use method of Express.js.
 * 
 * Since the Apollo Server is kind of special, when binding it to Express.js, 
 * we need to run the applyMiddleware function, which is provided 
 * by the initialized Apollo Server, and avoid using the app.use function from Express.js. 
 * Apollo automatically binds itself to the /graphql path because it is the default option.
 * You could also include a path parameter if you want it to respond from a custom route.
 * 
 * The Apollo Server requires us to run the start command before applying the middleware. 
 * As this is an asynchronous function, we are wrapping the complete block into a wrapping
 * async function so that we can use the await statement.
 */
const serviceNames = Object.keys(services);
for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  if (name === 'graphql') {
    (async () => {
      await services[name].start();
      services[name].applyMiddleware({ app });
    })();
  } else {
    app.use('/${name}', services[name]);
  }
}

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