import App from "./app";
import { mongodb } from "./datasource/db";

const app = new App();

(async () => {
  await mongodb.connect();
  app.listen();
})();
