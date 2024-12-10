import express from "express";
import { createPost, updatePost } from "../controllers/postController";
import { createPostValidationRules, updatePostValidationRules, validatePost } from "../validators/postValidator";

const router = express.Router({mergeParams: true});

router.post("/", createPostValidationRules(), validatePost, createPost);

router.put("/:postId", updatePostValidationRules(), validatePost, updatePost);

export default router;