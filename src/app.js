import express from "express";
import path from "path";
import logger from "morgan";
import engines from "consolidate";

import indexRouter from "./routes/index.js";

const __dirname = path.resolve();
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// view 경로 설정
app.set("views", __dirname + "/src/views");

// 화면 engine을 html로 설정
app.engine("html", engines.mustache);
app.set("view engine", "html");

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error,
  });
});

app.listen(app.get("port"), () => {
  console.log(
    `!!!App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode!!!`
  );
});

export default app;
