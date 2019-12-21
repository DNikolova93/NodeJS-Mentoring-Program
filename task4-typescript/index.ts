import { createServer } from 'http';

createServer((request, response) => {
  console.log(request);
  const { headers, method, url } = request;
  let body: any;
  request.on('error', err => {
    console.log(err);
  }).on('data', chunk => {
    body.push(chunk);
  }).on('close', () => {
    body = Buffer.concat(body).toString();
  });
}).listen(8080);
