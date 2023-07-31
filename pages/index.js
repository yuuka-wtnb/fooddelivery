import { Button, Alert, InputGroupText } from "reactstrap";
import { Col, Input, InputGroup, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantsList";
import { useState } from "react";

const index = () => {
  //文字列を格納する機能
  //1つは現在の状態の値であり、もう1つは状態を更新する関数
  const [query, setQuery] = useState("");
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupText>探す</InputGroupText>

              {/* onChangeとはインプット属性に対して文字列が打ち込まれるたびに
                呼びされるトリガーのようなもの */}

              {/* 打ち込まれるたびにsetQueryをよんであげる */}

              {/* input属性で打ち込む文字列を(e.target.value)の中に格納 */}

              {/* setqueryの中に入れることでqueryの中に格納されていく */}

              {/* toLocaleLowerCase()これによって大文字で入力したものもすべて小文字で小文字で出力 */}

              <Input
                placeholder="レストラン名を入力してください"
                onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query}/>
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
};

export default index;
