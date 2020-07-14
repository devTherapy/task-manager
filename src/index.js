const express = require("express");
require("./db/mongoose");
const User = require("./models/users");
const Task = require("./models/task");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
// const bcrypt = require("bcryptjs");

// const getpassword = async () => {
//   const password = "123455jf";
//   const hashpassword = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashpassword);
//   const isMatch = await bcrypt.compare("123455jf", hashpassword);
//   console.log(isMatch);
// };
// getpassword();
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
