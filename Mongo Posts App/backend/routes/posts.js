import { Router } from "express";
import { addApost, deletePost, getAllPost, updatePost } from "../controllers/postController.js";
const router = Router();

router.get('/', getAllPost);
router.post('/', addApost);
router.delete('/:id', deletePost); 
router.put('/:id', updatePost);
// if above you wrote /:postId then in the controlled method req.params.postId will be written
export default router;