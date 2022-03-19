import express, { Request, Response } from "express";
import { json } from "body-parser";

const app = express();
app.use(json());
const port = 3000;

app.get("/api/users/", (req: Request, res: Response) => {
  res.send("<h1>Hello from Auth service</h1><div>This is awesome</div>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!`);
});
