const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./db/dbConnection");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at port: http://localhost:${process.env.PORT}`);
  dbConnection();
});
