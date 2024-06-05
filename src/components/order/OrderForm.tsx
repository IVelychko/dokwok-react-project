import { useState } from "react";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import OrderProductsContainer from "./OrderProductsContainer";
import { addOrder } from "../../functions/orderFunctions";
import { OrderProp } from "../../helpers/Interfaces";

export default function OrderForm() {
  const contextState: ContextStateType = useMyContext();
  const cart = contextState.cartProp;
  const user = contextState.authUserProp;

  const [customerName, setCustomerName] = useState(user.firstName);
  const [customerPhone, setCustomerPhone] = useState(user.phoneNumber);
  const [customerEmail, setCustomerEmail] = useState(user.email);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [orderResult, setOrderResult] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderProp | null>(null);

  const handleCreateOrderClick = () => {
    addOrder({
      customerName: customerName,
      phoneNumber: customerPhone,
      email: customerEmail,
      deliveryAddress: deliveryAddress,
      paymentType: paymentType,
      userId: user.id !== "" ? user.id : null,
    })
      .then((order) => {
        console.log(`New order was created: ${order.totalOrderPrice}`);
        setOrderResult("successful");
        setOrder(order);
        contextState.setCartProp({ totalCartPrice: 0, lines: [] });
      })
      .catch((error) => {
        console.error(error);
        setOrderResult("unsuccessful");
      });
  };

  if (orderResult !== null) {
    const result = orderResult;
    const resultOrder = order;
    return (
      <main>
        <div className="order-result-wrapper">
          <div
            style={{
              textAlign: "center",
              fontSize: 30,
              fontFamily: "Montserrat",
              fontWeight: 500,
              marginTop: 100,
            }}
          >
            {result === "successful"
              ? `Замовлення №${resultOrder?.id} було створено успішно`
              : "Під час створення замовлення виникла помилка. Будь ласка повторіть спробу пізніше"}
          </div>
          <Link to={"/"} style={{ marginTop: 20 }} className="go-home-button">
            На головну
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="order-wrapper">
        <div className="order-form-wrapper">
          <div className="manage-order">
            <div
              style={{
                fontSize: 26,
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: 700,
              }}
            >
              Контактна інформація
            </div>
            <form encType="multipart/form-data">
              <div className="order-form-input-block form-group">
                <div className="order-form-input-block-element">
                  <label htmlFor="customer-name">Ім'я</label>
                </div>
                <div className="order-form-input-block-element">
                  <input
                    className="form-control"
                    type="text"
                    id="customer-name"
                    name="customer_name"
                    placeholder="Ваше ім'я"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div id="error-name" className="error-input">
                  Введіть ваше ім’я
                </div>
              </div>
              <div className="order-form-input-block form-group">
                <div className="order-form-input-block-element">
                  <label htmlFor="customer-phone">Телефон</label>
                </div>
                <div className="order-form-input-block-element">
                  <input
                    className="form-control"
                    type="text"
                    id="customer-phone"
                    name="customer_phone"
                    placeholder="Ваш телефон"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
                <div id="error-phone" className="error-input">
                  Введіть ваш номер телефону
                </div>
              </div>
              <div className="order-form-input-block form-group">
                <div className="order-form-input-block-element">
                  <label htmlFor="customer-email">Email</label>
                </div>
                <div className="order-form-input-block-element">
                  <input
                    className="form-control"
                    type="text"
                    id="customer-email"
                    name="customer_email"
                    placeholder="Ваш email (необов'язково)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
                <div id="error-email" className="error-input">
                  Введіть правильний email
                </div>
              </div>
              <div className="order-form-input-block form-group">
                <div className="order-form-input-block-element">
                  <label htmlFor="customer-delivery-address">
                    Адреса доставки
                  </label>
                </div>
                <div className="order-form-input-block-element">
                  <input
                    className="form-control"
                    type="text"
                    id="customer-delivery-address"
                    name="customer_delivery_address"
                    placeholder="Ваша адреса"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
                <div id="error-delivery-address" className="error-input">
                  Введіть адресу доставки
                </div>
              </div>
              <div className="order-form-input-block">
                <div className="order-form-input-block-element">
                  <label htmlFor="payment-type">Тип оплати</label>
                </div>
                <div className="order-form-input-block-element">
                  <div id="payment-type">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_type"
                      onClick={() => setPaymentType("cash")}
                    />
                    Готівкою
                    <br />
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_type"
                      onClick={() => setPaymentType("card")}
                    />
                    Банківською карткою
                    <br />
                  </div>
                  <br />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="order-products-wrapper">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                fontSize: 26,
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: 700,
              }}
            >
              Моє замовлення
            </div>
            <Link to="/cart" className="order-product-modify-link">
              Редагувати
            </Link>
          </div>
          <OrderProductsContainer cart={cart} />
          <div id="total-price">
            <div>Всього:</div>
            <div
              style={{ display: "flex", marginRight: 0, marginLeft: "auto" }}
            >
              <div id="total">{cart.totalCartPrice}</div>
              <div style={{ justifySelf: "right" }}>&nbsp;грн</div>
            </div>
          </div>
          <button
            onClick={handleCreateOrderClick}
            style={{ marginTop: 20, marginBottom: 20 }}
            className="regular-button"
          >
            Створити замовлення
          </button>
        </div>
      </div>
    </main>
  );
}
