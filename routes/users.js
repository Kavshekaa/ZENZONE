import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
//not changing anything just reading "CRUD" functionality
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
//cuurent user and the user to add and remove as friends
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
