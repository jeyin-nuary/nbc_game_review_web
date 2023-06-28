const express = require("express");
const { Op } = require("sequelize");
const { Posts } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();


// 게시글 조회 api
router.get("/posts", async (req, res) => {
    const posts = await Posts.findAll({
        attributes: ['post_id', 'user_id', 'nickname', 'title', 'game_title', 'genre', 'content', 'createdAt'],
        order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({ data: posts });

});

// 게시글 상세 조회 api
router.get("/posts/:post_id", async (req, res) => {
    const { post_id } = req.params;
    const post = await Posts.findOne({
        attributes: ['post_id', 'user_id', 'nickname', 'title', 'game_title', 'genre', 'content', 'createdAt'],
        where: { post_id }
    });

    return res.status(200).json({ data: post });
});


// 게시글 생성 api (authMiddleware: 사용자 인증)
router.post("/posts", authMiddleware, async (req, res) => {
    //게시글을 생성하는 사용자의 정보를 가지고 올 것.
    // nickname도 userId처럼 user로컬에서 가져와야 하나?
    //여기도 User_id인가, user_id인가, userId인가
    const { user_id } = res.locals.user;
    const { title, game_title, genre, nickname, content, createdAt } = req.body;

    const post = await Posts.create({
        //그래서 여기는 User_id인가, user_id인가, userId인가
        // 회원가입할 때 사용자 토큰은 userId 여기에 저장함
        //models/posts 에는 User_id 이렇게 함
        // models/users에는 user_id 이거임
        User_id: user_id,
        title,
        game_title,
        genre,
        nickname,
        content,
        createdAt
    });

    return res.status(201).json({ data: post });

});



// 게시글 수정 api
router.put("/posts/:post_id", authMiddleware, async (req, res) => {
    const { post_id } = req.params;
    const { user_id } = res.locals.user;
    const { title, game_title, nickname, genre, content } = req.body;

    // 수정할 게시글 조회
    const post = await Posts.findOne({ where: { post_id } });

    if (!post) {
        return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
    } else if (post.User_id !== user_id) {
        return res.status(401).json({ message: "권한이 없습니다." });
    }
    // 게시글의 권한을 확인, 게시글을 수정
    await Posts.update(
        { title, game_title, genre, content }, // title, game_title, genre, content 수정
        {
            where: {
                [Op.and]: [{ post_id }, { User_id: user_id }]
            }
        }
    );
    return res.status(200).json({ data: "게시글이 수정되었습니다." });
});

// 게시글 삭제
router.delete("/posts/:post_id", authMiddleware, async (req, res) => {
    const { post_id } = req.params;
    const { user_id } = res.locals.user;

    // 삭제할 게시글 조회
    const post = await Posts.findOne({ where: { post_id } });

    if (!post) {
        return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
    } else if (post.User_id !== user_id) {
        return res.status(401).json({ message: "권한이 없습니다." });
    }

    // 게시글 삭제 권한을 확인, 게시글 삭제
    await Posts.destroy({
        where: {
            [Op.and]: [{ post_id }, { User_id: user_id }]
        }
    });
    return res.status(200).json({ data: "게시글이 삭제되었습니다." });
})



module.exports = router;