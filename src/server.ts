import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";
import routes from "./controllers";

const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/v1", routes);

// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  res.send("Hello world!");
});

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // logger.error(err.message, err);
  return res.status(400).json({
    error: err.message,
  });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

const port = 8080; // default port to listen

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
