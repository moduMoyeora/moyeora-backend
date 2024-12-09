import express from "express";
import { createPost } from "../controllers/postController";
import { createPostValidationRules, validatePost } from "../validators/postValidator";

const router = express.Router({mergeParams: true});

router.post("/", createPostValidationRules(), validatePost, createPost);

export default router;