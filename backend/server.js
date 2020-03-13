
const Hapi = require('hapi')
const routes = require('./routes');
const Qs = require('qs');


const server = Hapi.server({
  host: 'localhost',
  port: 3000,
  routes: {
    cors: true
  },
  query: {
    parser: (query) => Qs.parse(query)
  }
})

server.route(routes);

server.start().then(() => {
  console.log('Server running at:', server.info.uri)
}).catch(err => {
  console.log(err)
  process.exit(1)
})
