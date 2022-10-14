const express = require("express");
const app = express();
const userRouter = require("./router/user.router");
const port = 1111;

app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    message:
      "Login & Signup CRUD with Middleware :: Validation :: JWT :: Nodemailer",
  });
});

app.listen(port, () => {
  console.log("Port is listing :", port);
});
