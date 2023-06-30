const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.route");
const profilesRouter = require("./routes/profiles.route");
const postsRouter = require("./routes/posts.route");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api',express.json(), [usersRouter, postsRouter, profilesRouter]);

app.use(express.urlencoded({extended:false}));
app.use(express.static("assets"))


app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})