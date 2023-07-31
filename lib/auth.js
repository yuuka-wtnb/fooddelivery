import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:1337";

//新しいユーザーを登録
export const registerUser = async (username, email, password) => {
  await axios
    .post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    })
    .then((res) => {
      //どういう名前でcookieを保存して（第一引数）、どういう値をcookieに保存するか（第二引数）
      Cookie.set("token", res.data.jwt, { expires: 7 });
      console.log(res.data.jwt);
    })
    //エラーがはかれたとき用
    .catch((err) => {
        console.log(err);
    });
};
