const app = require("./index");

const connect = require("./configs/db");

app.listen(8080, async () => {
  await connect();
  console.log("Hi friend i am listening on 8080");
});
