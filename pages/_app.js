import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";

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
