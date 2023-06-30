const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");

// 프로필 상세 조회
router.get('/profiles/:login_id', authMiddleware, async (req, res) => {
  const { login_id } = req.params;
  const { user_id } = res.locals.user;


  const user = await Users.findOne({
    where: {user_id}
  });

  if (user.user_id !== user_id) {
    return res.status(403).json({ message: "프로필을 조회할 권한이 없습니다." });
  }

  res.status(200).json({ data: user });
});

// 프로필 수정
router.put('/profiles/:login_id', authMiddleware, async (req, res) => {
  const { login_id } = req.params;
  const { user_id } = res.locals.user;
  const { password, nickname, age, email, introduction  } = req.body;

  const user = await Users.findOne({
    where: { user_id }
  });

  if (user.login_id !== login_id) {
    return res.status(403).json({ message: "프로필을 수정할 권한이 없습니다." });
  }

  try {
    // 유효성 검사
    if (email && !email.includes('@')) {
      return res.status(400).json({ message: "이메일 형식이 아닙니다." });
    }

    if (introduction && introduction.length > 30) {
      return res.status(400).json({ message: "한 줄 소개는 30자 이하여야 합니다." });
    }

    // 이름, 한 줄 소개 등 프로필 정보 수정
    await Users.update(
      { nickname, age, email, introduction },
      { where: { user_id: user_id } }
    );

    res.status(200).json({ message: "프로필이 성공적으로 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "프로필 수정 중에 오류가 발생했습니다." });
  }
});

// 비밀번호 수정

router.put('/profiles/:login_id/password', authMiddleware, async (req, res) => {
  const { login_id } = req.params;
  const { user_id } = res.locals.user;
  const { password, newPassword, confirmPassword } = req.body;

  const user = await Users.findOne({
    where: { user_id }
  });

  if (user.login_id !== login_id) {
    return res.status(403).json({ message: "비밀번호를 수정할 권한이 없습니다." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다." });
  }
  
// 비밀번호 유효성 검사

let scriptTagPwd = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

if (password.length == 0) {
  return res.status(400).json({ message: "비밀번호를 입력해주세요." });
} else if (newPassword.length < 8) {
  return res.status(400).json({ message: "비밀번호는 8자리 이상입니다." });
} else if (scriptTagPwd.test(newPassword) == false) {
  return res.status(400).json({ message: "비밀번호에는 영문, 숫자, 특수문자가 포함되어야 합니다." });
} else if (newPassword.includes(login_id)) {
  return res.status(400).json({ message: "비밀번호에는 아이디가 들어갈 수 없습니다." });
}


  try {
    // 현재 비밀번호 인증
    if (password !== user.password) {
      console.log('현재 비밀번호가 올바르지 않습니다.'); // 콘솔 로그 출력
      return res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
    }

    // 새로운 비밀번호 해싱
    const hashedNewPassword = newPassword;

    // 비밀번호 업데이트
    await Users.update(
      { password: hashedNewPassword },
      { where: { user_id: user_id } }
    );

    res.status(200).json({ message: "비밀번호가 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error('비밀번호 수정 중에 오류가 발생했습니다:', error); // 콘솔 에러 로그 출력
    res.status(500).json({ message: "비밀번호 수정 중에 오류가 발생했습니다." });

  }
});

module.exports = router;

