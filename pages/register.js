import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { registerUser } from "../lib/auth";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const register = () => {
  //useContextを使うことによって_app.jsで<AppContext.Provider value={{user: this.state.user, setUser:this.setUser}}>
  //渡したvalue→value={{user: this.state.user, setUser:this.setUser　が使えるようになる

  //AppContext.jsでつかったAppContextを引数で渡すことでグローバルのバリューを取ってくることができる
  const appContext = useContext(AppContext);
  const [data, setData] = useState({ username: "", email: "", password: "" });

  const handleRegister = () => {
    registerUser(data.username, data.email, data.password)
      .then((res) => {
        //_app.jsで登録したsetUser関数を使ってsetStateという形でユーザーをnullの状態ではなく値がある状態に変更する
        appContext.setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ユーザー登録</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <Label>ユーザー名：</Label>
                  <Input
                    type="text"
                    name="username"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    // dataは{ username: "", email: "", password: "" }のこと
                    // スプリット構文(...のこと)を展開することによって
                    // usernameのプロパティに対してe.target.valueこのように値を変えることができる
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  ></Input>
                </FormGroup>
              </fieldset>
            </Form>

            <Form>
              <fieldset>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Input
                    type="email"
                    name="email"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  ></Input>
                </FormGroup>
              </fieldset>
            </Form>

            <Form>
              <fieldset>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Input
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  ></Input>
                </FormGroup>
              </fieldset>
            </Form>
            <span>
              <a href="">
                <small>パスワードをお忘れですか？</small>
              </a>
            </span>
            <Button
              style={{ float: "right", width: 120 }}
              color="primary"
              onClick={() => {
                handleRegister();
              }}
            >
              登録
            </Button>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            text-align: center;
            margin-top: 50px;
          }

          .header {
            width: 100%;
            margin-bottom: 30px;
          }

          .wrapper {
            padding: 10px 30px 20px 30px;
          }
        `}
      </style>
    </Container>
  );
};

export default register;
