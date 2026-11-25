import { Router} from "express";
import { userController } from './user.controller';
import auth from "../../middleware/auth";

const router = Router()
///api/v1/users/
router.post("/",userController.createUser);
router.get("/",auth,userController.getAllUsers);
router.get("/:id",userController.getUser)
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);
export const userRouter = router;