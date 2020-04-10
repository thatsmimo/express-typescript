import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log("sd");
  res.send("Hello world!");
});

export default router;
