import { app } from "./app.js";
import { mongoConnection } from "./data/database.js";

mongoConnection();

app.listen(8000, () => {
  console.log(`Successfully conncted to sever !`);
});
