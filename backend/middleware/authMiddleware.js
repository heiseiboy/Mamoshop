//そもそもmiddlewareとは req,resを受け取って任意の処理を行う関数　関数のことです！！

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    //'Bearerはpostmanで定義したやつ
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //spaceでスプリットしているのはpostmanでtokenを設定したとき
      //Bearerとspaceをtokenの前に挿入したから
      //split後はBearerがindex番号[0], tokenがindex番号[1]だから[1]を取得してる
      //取得したtokenをjwt.verifyに渡して確認
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //verify = 確認
      //{id : xxx, iat: 1234.. , exp1234...}を受け取るようだ

      req.user = await User.findById(decoded.id).select("-password");
      //select(-password)でパスワードを差し引いた物を渡すことができる
      //残りのユーザーデータをリクエストユーザーに配置してアクセスできるようになる
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorize, no token");
  }
});

export { protect };
