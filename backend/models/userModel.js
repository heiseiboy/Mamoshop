import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//保存する前にasync function を実行
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //modified 変更
    //変更されている場合、これが実行されてパスワードがハッシュ化される
    //hash=key:value 元のデータを書き換えること
    next();
  }

  //パスワードを暗号化したいので実際にパスワードを非同期にハッシュするためにこのsaltが必要
  const salt = await bcrypt.genSalt(10);
  //重要なことはこれはパスワードが送信、変更の場合にのみ実行したい
  //なぜなら実行すると新しいハッシュが作成され、ログインできなくなる
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
