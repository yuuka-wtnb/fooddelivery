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
import { registerUser, login } from "../lib/auth";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const Login = () => {
  //useContextを使うことによって_app.jsで<AppContext.Provider value={{user: this.state.user, setUser:this.setUser}}>
  //渡したvalue→value={{user: this.state.user, setUser:this.setUser　が使えるようになる

  //AppContext.jsでつかったAppContextを引数で渡すことでグローバルのバリューを取ってくることができる
  const appContext = useContext(AppContext);
  const [data, setData] = useState({ identifier: "", password: "" });
  console.log(data);

  const handleLogin = () => {
    login(data.identifier, data.password)
      .then((res) => {
        //ログインに成功したらuserにセットする
        appContext.setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    //[e.target.name]はname="identifier"
    //メールを打っているときはidentifierが属性として読み込まれる
    //e.target.valueのなかにインプット属性でうちこんでる文字列を格納
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ログイン</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Input
                    value={data.email}
                    type="email"
                    name="identifier"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Input
                    value={data.password}
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <span>
                    <a href="">
                      <small>パスワードをお忘れですか？</small>
                    </a>
                  </span>
                  <Button
                    style={{ float: "right", width: 120 }}
                    color="primary"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    ログイン
                  </Button>
                </FormGroup>
              </fieldset>
            </Form>
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
            border-radius-top: 6px;
          }
          .header h2 {
            margin: 0;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
        `}
      </style>
    </Container>
  );
};

export default Login;
