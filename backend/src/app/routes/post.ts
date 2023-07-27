import { Router } from "express";
import { postMedia, getMedia, getAllMedia, getAllUserMedia, postPage, viewPost } from "../service/postService";
import { RetrieveFile } from "../service/fileMiddlewareService";

export const router = Router();

router.route('/post').get(postPage);

router.route('/view-post').get(viewPost);

router.route('/post').post(RetrieveFile, postMedia);

//Name to be change. Get all post except user? Or do want to add user posts to feed?
router.route('/post-feed').get(getAllMedia);

//Name to be change and moved. Belongs under user routes? View all
router.route('/user/post').get(getAllUserMedia);

//Name to be change and moved. Belongs under user routes? View specific
router.route('/user/post/:id').get(getMedia);

