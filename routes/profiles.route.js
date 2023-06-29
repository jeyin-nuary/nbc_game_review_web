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
  const { userId } = req.params;
  const { user } = res.locals;
  const { password, nickname, introduction } = req.body;

  if (user.user_id !== Number(userId)) {
    return res.status(403).json({ message: "프로필을 수정할 권한이 없습니다." });
  }

  // 비밀번호 인증
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "비밀번호가 올바르지 않습니다." });
  }

  try {
    // 이름, 한 줄 소개 등 프로필 정보 수정
    await Users.update(
      { nickname, introduction },
      { where: { user_id: userId } }
    );

    res.status(200).json({ message: "프로필이 성공적으로 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "프로필 수정 중에 오류가 발생했습니다." });
  }
});

// 비밀번호 수정
router.put('/profiles/:userId/password', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { user } = res.locals;
  const { currentPassword, newPassword } = req.body;

  if (user.user_id !== Number(userId)) {
    return res.status(403).json({ message: "비밀번호를 수정할 권한이 없습니다." });
  }

  // 현재 비밀번호 인증
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    return res.status(401).json({ message: "현재 비밀번호가 올바르지 않습니다." });
  }

  try {
    // 새로운 비밀번호 해싱
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 비밀번호 업데이트
    await Users.update(
      { password: hashedNewPassword },
      { where: { user_id: userId } }
    );

    res.status(200).json({ message: "비밀번호가 성공적으로 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "비밀번호 수정 중에 오류가 발생했습니다." });
  }
});

module.exports = router;

