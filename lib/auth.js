import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:1337";

//新しいユーザーを登録
export const registerUser = (username, email, password) => {
  //resolveは、この非同期処理がきちんと正常に作動したならば
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
      })
      .then((res) => {
        //どういう名前でcookieを保存して（第一引数）、どういう値をcookieに保存するか（第二引数）
        Cookie.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
        window.location.href = "/";
      })
      //エラーがはかれたとき用
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};

export const login = (identifier, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local`, {
        identifier,
        password,
      })
      .then((res) => {
        //どういう名前でcookieを保存して（第一引数）、どういう値をcookieに保存するか（第二引数）
        Cookie.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
        window.location.href = "/";
      })
      //エラーがはかれたとき用
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
