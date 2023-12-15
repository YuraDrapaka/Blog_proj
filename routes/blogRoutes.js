let express = require('express');
let router = express.Router();
let {getMainPage,
    getAddPost,
    addPost,
    getAllPosts,
    getEditPost,
    editPost,
    deletePost} = require('../controllers/postContollers');

    
router.get('/', getMainPage);
router.get('/add-post', getAddPost);
router.post('/add-post', addPost);
router.get("/posts", getAllPosts);
router.get("/edit-post/:id", getEditPost);
router.put("/edit-post/:id", editPost);
router.delete("/posts/:id", deletePost);

module.exports = router;