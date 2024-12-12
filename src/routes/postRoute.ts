import express from "express";
import { createPost, deletePost, updatePost, getPost, getPosts } from "../controllers/postController";
import { 
  createPostValidationRules, 
  postParamValidationRules, 
  updatePostValidationRules, 
  getPostByIdValidationrules, 
  getPostsByBoardIdValidationRules, 
  validatePost 
} from "../validators/postValidator";

const router = express.Router({mergeParams: true});

router.post("/", createPostValidationRules(), validatePost, createPost);

router.put("/:postId", updatePostValidationRules(), validatePost, updatePost);

router.delete("/:postId", postParamValidationRules(), validatePost, deletePost);

router.get('/:postId',  getPostByIdValidationrules(), validatePost, getPost);

router.get('/', getPostsByBoardIdValidationRules(), validatePost, getPosts);

export default router;