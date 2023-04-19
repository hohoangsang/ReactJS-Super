const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = new Date();
  }
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (new Date().getTime() > new Date(req.body.publishDate).getTime()) {
      return res.status(422).send({
        error: {
          publishDate: "Publish date là ngày trong quá khứ!!",
        },
      });
    }
  }

  setTimeout(() => {
    next();
  }, 800);
});

// Use default router
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
