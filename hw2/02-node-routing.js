/** Exercise02 - Node Routing **/
const http = require('http');

const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'other',
  ];

  // Match the path without its query string.
  const [pathname] = req.url.split('?');
  const route = routes.find((name) => pathname === `/${name}`);

  switch (route) {
    case 'welcome':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('Node Routing Exercise');
      res.write('<h1>Welcome to my Node.js server!</h1>');
      res.end();
      break;

    case 'redirect':
      // The browser follows the destination in the Location header.
      res.writeHead(302, { Location: '/redirected' });
      res.end();
      break;

    case 'redirected':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<h1>You have reached the redirected page!</h1>');
      res.end();
      break;

    case 'cache':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        // Cache-Control uses seconds: one day is 24 * 60 * 60.
        'Cache-Control': 'public, max-age=86400',
      });
      res.write('<p>this resource was cached</p>');
      res.end();
      break;

    case 'cookie':
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Set-Cookie': 'hello=world; Path=/',
      });
      res.write('cookies… yummm');
      res.end();
      break;

    default:
      // Both /other and paths missing from the routes array end up here.
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<h1>404 - page not found</h1>');
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
