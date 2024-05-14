import express, { NextFunction, Request, Response } from "express";

const app = express();

//parser
app.use(express.json());
app.use(express.text());

const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/courses/", courseRouter);

userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User is created successfully",
    data: user,
  });
});

userRouter.post("/create-course", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "course is created successfully",
    data: user,
  });
});

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(something);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.json(req.body);
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route is not found",
  });
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default app;
