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
  state = {
    //stateで情報を管理
    user: null,
    //items；料理、total:itemsに入った合計の値段
    cart: { items: [], total: 0 },
  };

  //setUserは、この関数を使えばユーザーをセットすることができる
  setUser = (user) => {
    this.setState({ user });
  };

  //すでにユーザーのクッキーが残っているかどうかを確認するための関数
  componentDidMount() {
    const token = Cookies.get("token"); //tokenのなかにはjwdが入っている

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          //本当にcookieがそもそも情報に入っているのか確認する
          Authorization: `Bearer ${token}`,
        },
        //${process.env.NEXT_PUBLIC_API_URL}/users/meこのエンドポイントが正常に作動するならば
        //そしてBearer token、ヘッダー付きのauthorizationのtokenこれを組み込んだFetch
        //APIをたたくことができたならどうするか
      }).then(async (res) => {
        if (!res.ok) {
          //tokenはセットしてAPIは叩けたけどトークンが7日経過してるとかjwtの記述の文字列が違うなど
          //有効期限が切れているのであればcookieを削除する
          Cookies.remove("token");
          this.setState({ user: null });
          //なにも入っていない状態を返す
          return null;
        }
        //このifを通らなかった場合ちゃんとユーザー情報が入ってる
        //まずjson形式になおす
        const user = await res.json();
        //そのなかにユーザー情報が入っているからsetUser関数を使ってそれを入れてあげる
        this.setUser(user); //ログイン
      });
    }
  }

  //カートへ商品の追加
  //itemsはサラダやパスタなどの商品を指定で、restaurants.jsのmap関数で展開したresのこと
  //dish.name dish.descriptionとかが入っててdishのなかに料理1つ1つの情報がはいっている
  addItem = (item) => {
    //this.state.cart;が今現在のカートの中身
    //その中からitems属性だけ取り出す
    let { items } = this.state.cart;

    //items→現在のカートの中身
    //find((i)→iでパスタ、サラダなど1つ1つ取り出していく
    //i,idでもしサラダが入っていたらサラダのidをとる
    // i,id === item.id→サラダのidがitem.idと等しいならば
    // それだけをnewItemに格納する
    // items.idはサラダやパスタなどの商品を指定で、restaurants.jsのmap関数で展開したresのid
    const newItem = items.find((i) => i.id === item.id);

    // console.log(newItem);

    if (!newItem) {
      //itemの商品の数
      item.quantity = 1;

      //cartに追加する
      this.setState(
        {
          cart: {
            //今まで入ってたもの（...items）に新しいものを追加（item）する
            items: [...items, item],

            //state={cart: {items:[], total:0}のtotalにアクセス
            //  それに対してせってされている価格をたす
            total: this.state.cart.total + item.price,
          },
        },
        //カートの中の情報をCookieに保存
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
    //すでに同じ商品がカートに入っているとき
    else {
      this.setState({
        cart: {
          items: this.state.cart.items.map((item) =>
            //もしitem.id === newItem.idがtrueなら？以降を実行
            item.id === newItem.id
              ? //Object.assign()関数は、既存の配列に対してなにかしらの新しいフィールドを追加したりするときなどに使用
                //{}の引数を指定することでコピーしますよという意味
                //items: []の空の配列に対してquantityというをフィールドを新しくitemに追加する
                //item.quantity→既存の数量ですでにカートに入っているときは＋1してあげる(1+1みたいに)
                Object.assign({}, item, { quantity: item.quantity + 1 })
              : item //falseのとき（item.id === newItem.idじゃないときは）ただ単にitemだけ返す
          ),
          total:this.state.cart.total + item.price,
        },
      },
      //カートの中の情報をCookieに保存
      () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      //ユーザーがログインしているのか監視→全部のページで監視したいからreturn全部で囲ってる
      //user: this.state.user→今現在のユーザー状態を渡してあげている
      //どのコンポーネントにおいてもユーザーがログインしたのかをセットしたいからsetUser:this.setUserを渡す必要がある
      <AppContext.Provider
  
      //thisとはこのクラス自身をさしてる。今回だとMyApp
      //このvalueを全てのコンポーネント内で使うことができる→だからグローバルコンテキストと呼ばれてる
        value={{ user: this.state.user,cart: this.state.cart ,setUser: this.setUser, addItem:this.addItem }}
      >
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
