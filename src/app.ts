import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/users/user.route";
import { profileRoute } from "./modules/profiles/profile.route";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users",userRouter);

app.use("/api/v1/profiles",profileRoute)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
  });
});

export default app;
