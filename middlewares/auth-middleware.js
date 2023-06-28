const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, token] = authorization.split(" ");
    console.log(tokenType);
    console.log(token);
    console.log(tokenType !== "Bearer");
    console.log(!token);




    if (tokenType !== "Bearer" || !token) {
      return res.status(401).json({ message: "토큰 타입이 일치하지 않습니다." });

    }

    const decodedToken = jwt.verify(token, "customized_secret_key");
    const user_id = decodedToken.userId;


    const user = await Users.findOne({ where: { user_id } });
    if (!user) {
      res.clearCookie("authorization");
      return res.status(401).json({ message: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.clearCookie("authorization");
    return res.status(401).json({
      message: "비정상적인 요청입니다."
    });
  }
}