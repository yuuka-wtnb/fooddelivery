import {CardElement} from "@stripe/react-stripe-js";



const CardSection = () => {
  return (
    <div>
      <div>
        <label htmlFor="card-element">クレジット/デビットカード</label>
        <div>
          <fieldset>
            <div className="form-raw">
              <div id="id-element" style={{ width: "100%" }}>
                <CardElement />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
