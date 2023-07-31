import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = () => {
  const { loading, error, data } = useQuery(query);
  console.log(data)

  return (
    //xs="6" sm="4"はレスポンシブの設定
    <Row>
      <Col xs="6" sm="4">
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            src="http://localhost:1337/uploads/thumbnail_restaurant1_03e3dc9bfb.jpg"
            top={true}
            style={{ height: 250 }}
          >
            {/* topプロパティに trueが指定されているため、カードの上部に画像が表示されます。*/}
          </CardImg>
          <CardBody>
            <CardTitle>Italian Restaurant</CardTitle>
            <CardTitle>イタリアンのレストランです。</CardTitle>
          </CardBody>
          <div className="card-footer"></div>
          <Link href="/restaurants?id=1" as="/restaurants/1">
            <a className="btn btn-primary">もっとみる</a>
          </Link>
        </Card>
      </Col>
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
    </Row>
  );
};

export default RestaurantList;
