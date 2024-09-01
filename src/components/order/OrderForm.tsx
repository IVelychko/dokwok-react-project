import { ReactNode, useState } from "react";
import { ContextState, useMyContext } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import OrderProductsContainer from "./OrderProductsContainer";
import {
  addDeliveryOrder,
  addTakeawayOrder,
} from "../../repositories/orderRepository";
import { ErrorInputProp, OrderProp } from "../../helpers/Interfaces";
import {
  validateDeliveryAddress,
  validateEmail,
  validateFirstName,
  validatePaymentType,
  validatePhoneNumber,
} from "../../validation/orderFormValidation";

interface ShopAddress {
  id: number;
  address: string;
}

export default function OrderForm() {
  const contextState: ContextState = useMyContext();
  const cart = contextState.cartProp;
  const user = contextState.authUserProp;
  const shops = contextState.shopsProp;
  const shopAddresses = shops.map((shop) => {
    const stringAddress = `${shop.street} ${shop.building}`;
    const shopAddress: ShopAddress = { id: shop.id, address: stringAddress };
    return shopAddress;
  });

  const [isTakeawayActive, setIsTakeawayActive] = useState(true);
  const [isDeliveryActive, setIsDeliveryActive] = useState(false);

  const [customerName, setCustomerName] = useState(user.firstName);
  const [customerPhone, setCustomerPhone] = useState(user.phoneNumber);
  const [customerEmail, setCustomerEmail] = useState(user.email);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [orderResult, setOrderResult] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderProp | null>(null);
  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Введені некоректні дані",
  });
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Введене некоректне ім'я",
    });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введений некоректний номер телефону",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введена некоректна електронна пошта",
  });
  const [addressErrorInput, setAddressErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введена некоректна адреса доставки",
  });
  const [paymentErrorInput, setPaymentErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Обраний некоректний тип оплати",
  });

  const validateFormData = () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      validateFirstName(
        customerName,
        firstNameErrorInput,
        setFirstNameErrorInput
      )
    );
    validationResults.push(
      validatePhoneNumber(customerPhone, phoneErrorInput, setPhoneErrorInput)
    );
    validationResults.push(
      validateEmail(customerEmail, emailErrorInput, setEmailErrorInput)
    );
    if (isDeliveryActive) {
      validationResults.push(
        validateDeliveryAddress(
          deliveryAddress,
          addressErrorInput,
          setAddressErrorInput
        )
      );
    }
    validationResults.push(
      validatePaymentType(paymentType, paymentErrorInput, setPaymentErrorInput)
    );
    let isValid = true;
    for (const result of validationResults) {
      if (!result) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleCreateOrderClick = () => {
    if (isTakeawayActive) {
      const orderShop = shopAddresses.find(
        (shop) => shop.address === shopAddress
      );
      if (orderShop === null) {
        setFormErrorInput((prevData) => ({
          ...prevData,
          styles: { visibility: "visible", marginTop: 0 },
        }));
        return;
      }
      addTakeawayOrder({
        customerName: customerName,
        phoneNumber: customerPhone,
        email: customerEmail,
        shopId: orderShop!.id,
        paymentType: paymentType,
        userId: user.id !== "" ? user.id : null,
      })
        .then((order) => {
          if (order !== null) {
            setOrderResult("successful");
            setOrder(order);
            contextState.setCartProp({ totalCartPrice: 0, lines: [] });
          } else {
            setFormErrorInput((prevData) => ({
              ...prevData,
              styles: { visibility: "visible", marginTop: 0 },
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setOrderResult("unsuccessful");
        });
    } else {
      addDeliveryOrder({
        customerName: customerName,
        phoneNumber: customerPhone,
        email: customerEmail,
        deliveryAddress: deliveryAddress,
        paymentType: paymentType,
        userId: user.id !== "" ? user.id : null,
      })
        .then((order) => {
          if (order !== null) {
            setOrderResult("successful");
            setOrder(order);
            contextState.setCartProp({ totalCartPrice: 0, lines: [] });
          } else {
            setFormErrorInput((prevData) => ({
              ...prevData,
              styles: { visibility: "visible", marginTop: 0 },
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setOrderResult("unsuccessful");
        });
    }
  };

  let orderResultMessage: ReactNode;
  if (orderResult === "successful") {
    orderResultMessage = (
      <span>Замовлення №{order?.id} було створено успішно</span>
    );
  } else if (orderResult === "unsuccessful") {
    orderResultMessage = (
      <>
        <div>Під час створення замовлення виникла помилка.</div>
        <div style={{ marginTop: 15 }}>
          Будь ласка повторіть спробу пізніше.
        </div>
      </>
    );
  } else {
    orderResultMessage = null;
  }

  if (orderResult !== null) {
    return (
      <main>
        <div style={{ marginBottom: 170 }} className="order-result-wrapper">
          <div
            style={{
              textAlign: "center",
              fontSize: 30,
              fontFamily: "Montserrat",
              fontWeight: 500,
              marginTop: 100,
            }}
          >
            {orderResultMessage}
          </div>
          <Link to={"/"} style={{ marginTop: 40 }} className="go-home-button">
            На головну
          </Link>
        </div>
      </main>
    );
  }

  const orderTypeInput: ReactNode = isTakeawayActive ? (
    <div className="order-form-input-block form-group">
      <div className="order-form-input-block-element">
        <label htmlFor="shop-address">Адреси закладу</label>
      </div>
      <div className="order-form-input-block-element">
        <select
          id="shop-address"
          className="form-select"
          value={shopAddress}
          onChange={(e) => {
            setShopAddress(e.target.value);
          }}
        >
          {shopAddresses.map((shopAddress) => (
            <option key={shopAddress.address}>{shopAddress.address}</option>
          ))}
        </select>
      </div>
    </div>
  ) : (
    <div className="order-form-input-block form-group">
      <div className="order-form-input-block-element">
        <label htmlFor="customer-delivery-address">Адреса доставки</label>
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
      <div style={addressErrorInput.styles} className="error-input">
        {addressErrorInput.message}
      </div>
    </div>
  );

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
            <div className="order-form-order-type">
              <button
                onClick={() => {
                  setIsTakeawayActive(true);
                  setIsDeliveryActive(false);
                }}
                className={
                  isTakeawayActive
                    ? "order-takeaway-type-button-active"
                    : "order-takeaway-type-button-inactive"
                }
              >
                Самовиніс
              </button>
              <button
                onClick={() => {
                  setIsTakeawayActive(false);
                  setIsDeliveryActive(true);
                }}
                className={
                  isDeliveryActive
                    ? "order-delivery-type-button-active"
                    : "order-delivery-type-button-inactive"
                }
              >
                Доставка
              </button>
            </div>
            <div
              style={formErrorInput.styles}
              className="auth-form-error-input"
            >
              {formErrorInput.message}
            </div>
            <form encType="multipart/form-data">
              <div className="order-form-input-block form-group">
                <div className="order-form-input-block-element">
                  <label style={{ paddingTop: 0 }} htmlFor="customer-name">
                    Ім'я
                  </label>
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
                <div style={firstNameErrorInput.styles} className="error-input">
                  {firstNameErrorInput.message}
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
                <div style={phoneErrorInput.styles} className="error-input">
                  {phoneErrorInput.message}
                </div>
              </div>
              <div className="order-form-input-block form-group">
                <div className="order-form-input-block-element">
                  <label htmlFor="customer-email">Email</label>
                </div>
                <div className="order-form-input-block-element">
                  <input
                    className="form-control"
                    type="email"
                    id="customer-email"
                    name="customer_email"
                    placeholder="Ваш email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
                <div style={emailErrorInput.styles} className="error-input">
                  {emailErrorInput.message}
                </div>
              </div>
              {orderTypeInput}
              <div className="order-form-input-block">
                <div className="order-form-input-block-element">
                  <label htmlFor="payment-type">Тип оплати</label>
                </div>
                <div className="order-form-input-block-element">
                  <div style={{ marginBottom: 10 }} id="payment-type">
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
                  <div style={paymentErrorInput.styles} className="error-input">
                    {paymentErrorInput.message}
                  </div>
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
            onClick={() => {
              if (validateFormData()) {
                console.log("The data is valid.");
                handleCreateOrderClick();
              } else {
                console.log("The data is not valid.");
              }
            }}
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
