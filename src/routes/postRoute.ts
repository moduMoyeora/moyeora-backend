import express from "express";
import { createPost, deletePost, updatePost } from "../controllers/postController";
import { createPostValidationRules, postParamValidationRules, updatePostValidationRules, validatePost } from "../validators/postValidator";

const router = express.Router({mergeParams: true});

router.post("/", createPostValidationRules(), validatePost, createPost);

router.put("/:postId", updatePostValidationRules(), validatePost, updatePost);

router.delete("/:postId", postParamValidationRules(), validatePost, deletePost);

export default router;