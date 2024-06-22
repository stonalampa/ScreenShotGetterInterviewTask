import express, { NextFunction, Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/health", (req: any, res: any) => {
  return res.json({
    status: "okay",
  });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Route failed for %s", req.url, { error });

  let errorMessage = "General Error Occurred!";
  if (error.message) {
    errorMessage = error.message;
  }

  res.status(500).send(errorMessage);
});

//For local development set the port to 4000
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
