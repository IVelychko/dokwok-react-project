import { useState } from "react";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import OrderProductsContainer from "./OrderProductsContainer";

export default function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const contextState: ContextStateType = useMyContext();
  const cart = contextState.cartProp;

  return (
    <div className="main">
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
            <form id="form1" encType="multipart/form-data">
              <div className="form-input-block">
                <div className="form-input-block-element">
                  <label htmlFor="customer-name">Ім'я</label>
                </div>
                <div className="form-input-block-element">
                  <input
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
              <div className="form-input-block">
                <div className="form-input-block-element">
                  <label htmlFor="customer-phone">Телефон</label>
                </div>
                <div className="form-input-block-element">
                  <input
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
              <div className="form-input-block">
                <div className="form-input-block-element">
                  <label htmlFor="customer-email">Email</label>
                </div>
                <div className="form-input-block-element">
                  <input
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
              <div className="form-input-block">
                <div className="form-input-block-element">
                  <label htmlFor="customer-delivery-address">
                    Адреса доставки
                  </label>
                </div>
                <div className="form-input-block-element">
                  <input
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
              <div className="form-input-block">
                <div className="form-input-block-element">
                  <label htmlFor="payment-type">Тип оплати</label>
                </div>
                <div className="form-input-block-element">
                  <div id="payment-type">
                    <input
                      type="radio"
                      name="payment_type"
                      onClick={() => setPaymentType("cash")}
                    />
                    Готівкою
                    <br />
                    <input
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
          <Link
            to={"/order"}
            style={{ marginTop: 20, marginBottom: 20 }}
            className="regular-button"
          >
            Створити замовлення
          </Link>
        </div>
      </div>
    </div>
  );
}
