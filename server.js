import { app } from "./app.js";
import { mongoConnection } from "./data/database.js";

mongoConnection();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
