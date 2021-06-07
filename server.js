const jsonServer = require('json-server');
const { default: jwtDecode } = require('jwt-decode');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/lists', (req, res) => {
  console.log(req.headers.authorization);
  const decodedToken = jwtDecode(req.headers.authorization);

  const lists = router.db
    .get('lists')
    .filter({ userId: decodedToken.sub })
    .value();

  res.jsonp(lists);
});

server.delete('/lists/:id', (req, res) => {
  try {
    const decodedToken = jwtDecode(req.headers.authorization);

    const listId = parseInt(req.params.id, 10);

    const list = router.db.get('lists').find({ id: listId }).value();

    if (!list) {
      res.sendStatus(404);
    }

    if (list.userId !== decodedToken.sub) {
      res.sendStatus(401);
    }

    router.db.get('lists').remove({ id: listId }).write();

    res.json({});
  } catch (e) {
    res.sendStatus(401);
  }
});

server.post('/lists/:id/reorder-tasks', (req, res) => {
  res.json({});
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
