import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";
import connectToDatabase from "./src/database";

// Router
import router from "./src/routes/index";

const app = express();
const port = config.get("port");
const clientUrl: string = config.get("client_url");

app.use(cors({ credentials: true, origin: clientUrl }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

async function main() {
  await connectToDatabase();

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main();
