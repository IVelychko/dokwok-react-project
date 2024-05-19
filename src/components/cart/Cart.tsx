import { Link } from "react-router-dom";
import { CartStateType, useCart } from "../../hooks/hooks";
import CartContainer from "./CartContainer";

export default function Cart() {
  const cartState: CartStateType = useCart();
  const cart = cartState.cartProp;
  const setCart = cartState.setCartProp;

  if (cart === null || cart.lines.length < 1) {
    return (
      <div className="main">
        <div className="shopping-wrapper">
          <div
            style={{
              textAlign: "center",
              fontSize: 30,
              fontFamily: "Montserrat",
              fontWeight: 500,
              marginTop: 100,
            }}
          >
            Кошик порожній
          </div>
          <Link to={"/"} style={{ marginTop: 20 }} className="go-home-button">
            На головну
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="shopping-wrapper">
        <h3
          style={{
            fontSize: 32,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: 700,
            paddingLeft: 16,
          }}
        >
          Кошик
        </h3>
        <CartContainer cart={cart} setCart={setCart} />
        <div id="total-price">
          <div>Всього:</div>
          <div style={{ display: "flex", marginRight: 0, marginLeft: "auto" }}>
            <div id="total">{cart.totalCartPrice}</div>
            <div style={{ justifySelf: "right" }}>&nbsp;грн</div>
          </div>
        </div>
        <Link
          to={"/order"}
          style={{ marginTop: 20, marginBottom: 20 }}
          className="go-form-order-button"
        >
          Оформити замовлення
        </Link>
      </div>
    </div>
  );
}
