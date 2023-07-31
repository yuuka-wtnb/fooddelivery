import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";

const RestaurantList = () => {
  return (
    <Row>
      <Col>
        <Card>
            <CardImg src=""></CardImg>
            <CardBody>
                <CardTitle>
                    Italian Restaurant
                </CardTitle>
                <CardTitle>
                    イタリアンのレストランです。
                </CardTitle>
            </CardBody>
            <div className="card-footer">
            </div>
            <Link href="/restaurants?id=1" as="/restaurants/1">
                <a className="btn btn-primary">もっとみる</a>
            </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default RestaurantList;
