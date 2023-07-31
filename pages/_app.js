import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

//Appで使っているものをMy Appで使うことができる
class MyApp extends App {
  //classなので関数コンポーネント、useStateなどは使えない
  //このstateとsetUserのところは
  //const [state, setState] = useState(null)　と同じ
  state={
    user: null,
  }

  //setUserは、この関数を使えばユーザーをセットすることができる
  setUser = (user) => {
    this.setState({user})
  }

  //すでにユーザーのクッキーが残っているかどうかを確認するための関数
  componentDidMount(){
    const token = Cookies.get("token"); //tokenのなかにはjwdが入っている

    if(token){
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers:{
          //本当にcookieがそもそも情報に入っているのか確認する
          Authorization:`Bearer ${token}`,
        }
        //${process.env.NEXT_PUBLIC_API_URL}/users/meこのエンドポイントが正常に作動するならば
        //そしてBearer token、ヘッダー付きのauthorizationのtokenこれを組み込んだFetch
        //APIをたたくことができたならどうするか
      }).then(async (res) =>{
        if(!res.ok){
          //tokenはセットしてAPIは叩けたけどトークンが7日経過してるとかjwtの記述の文字列が違うなど
          //有効期限が切れているのであればcookieを削除する
          Cookies.remove("token");
          this.setState({user: null});
          //なにも入っていない状態を返す
          return null;
        }
        //このifを通らなかった場合ちゃんとユーザー情報が入ってる
        //まずjson形式になおす
        const user = await res.json();
        //そのなかにユーザー情報が入っているからsetuser関数を使ってそれを入れてあげる
        this.setUser(user); //ログイン
        
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      //ユーザーがログインしているのか監視→全部のページで監視したいからreturn全部で囲ってる
      //user: this.state.user→今現在のユーザー状態を渡してあげている
      //どのコンポーネントにおいてもユーザーがログインしたのかをセットしたいからsetUser:this.setUserを渡す必要がある
      <AppContext.Provider value={{user: this.state.user, setUser:this.setUser}}>
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            />
          </Head>
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

//withDataでMyAppをラッピング
export default withData(MyApp);
