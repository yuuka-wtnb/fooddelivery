import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import { useContext } from "react";
import AppContext from "../context/AppContext";

//variablesがrestaurant(id: $id)の$idに設定されるようになる
const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const Restaurants = (props) => {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    // ここのqueryはhref={`/restaurants?id=${res.id}`}のres.idをとってきてる
    variables: { id: router.query.id },
  });

  if (loading) return <h2>ロード中・・・</h2>;
  if (error) return "レストランの読み込みに失敗しました";

  if (data) {
    const { restaurant } = data;

    return (
      //xs="6" sm="4"はレスポンシブの設定
      <>
        <h1 style={{ padding: "0 0 0 10px" }}>{restaurant.name}</h1>
        <Row>
          {/* restaurantの中のdishesを1つ1つ取り出す */}
          {restaurant.dishes.map((dish) => (
            <Col xs="6" sm="4" key={dish.id} style={{ padding: "0 0 0 10px" }}>
              <Card style={{ margin: "0 10px 0 20px" }}>
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${dish.image.url}`}
                  top={true}
                  style={{ height: 250 }}
                >
                  {/* topプロパティに trueが指定されているため、カードの上部に画像が表示されます。*/}
                </CardImg>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardTitle>{dish.description}</CardTitle>
                </CardBody>
                <div className="card-footer"></div>
                <Button outline color="primary" onClick={() =>appContext.addItem(dish) }>
                  +カートに入れる
                </Button>
              </Card>
            </Col>
          ))}

          <style jsx>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart></Cart>
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <h1>レストランが見つかりませんでした</h1>;
  }
};

export default Restaurants;
