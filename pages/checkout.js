import { Col, Row } from "reactstrap";
import { Elements } from "@stripe/react-stripe-js";
import Cart from "../components/cart";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Checkout/CheckOutForm";

const checkout = () => {
  const stripePromise = loadStripe(
    "pk_test_51NaL67HVFtwteNkVEOUvrOIYxMM5OiMjnKZgXxtECYoflQ0aYylJpgKnCCSAHLSlSNs9pLMbYWn8SaohncLoMnsK00wfzFLUh7"
  );
  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20, fontSize: 20, textAlign: "center" }}>
          チェックアウト
        </h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
};

export default checkout;