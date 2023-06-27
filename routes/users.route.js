const express = require("express");
const {Users} = require("../models");
const router = express.Router();


//회원가입 API
router.post("/users", async(req, res) => {
    const{login_id, password, nickname, age} =req.body;
    console.log(Users);
    const isExitsUser = await Users.findOne({
        where: {
            login_id: login_id,
        }
    });
    if(isExitsUser){
        return res.status(409).json({ message: "이미 존재하는 아이디 입니다."});
    }

    //사용자 테이블에 데이터 삽입
    const user = await Users.create({login_id,password,nickname,age});

    return res.status(201).json({ message: "회원가입이 완료되었습니다."})
})


module.exports = router;