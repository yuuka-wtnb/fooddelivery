import { Button, Alert, InputGroupText } from "reactstrap";
import { Col, Input, InputGroup, Row } from "reactstrap";

const index = () => {
    return (
        <div className="container-fluid">
            <Row>
                <Col>
                <div className="search">
                <InputGroup>
                <InputGroupText>探す</InputGroupText>
                <Input placeholder = "レストラン名を入力してください" />
                </InputGroup>
                </div>

                </Col>
            </Row>
            <style jsx>
                {`
                .search {
                    margin:20px;
                    width: 500px;
                }
                `}
            </style>
        </div>
    );
}

export default index;