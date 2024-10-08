import { ReactNode, useState } from "react";
import { Order, Shop } from "../../models/dataTransferObjects";
import {
  BEINGPROCESSED_ORDER_STATUS,
  CANCELLED_ORDER_STATUS,
  COMPLETED_ORDER_STATUS,
} from "../../helpers/constants";

interface Props {
  userOrder: Order;
  orderQuantity: number;
  shop: Shop | null;
}

export default function OrderHistoryItem({
  userOrder,
  orderQuantity,
  shop,
}: Readonly<Props>) {
  const defaultExpanded = orderQuantity === 1;
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const orderLines: ReactNode[] = [];
  userOrder.orderLines.forEach((line) => {
    orderLines.push(
      <div key={line.product.id}>
        <div className="acc-order-content">
          <div className="acc-order-product-info">
            <div className="acc-order-product-item-content-img">
              <img
                alt="product"
                src={`/src/assets/item-images/${line.product.name}.png`}
              />
            </div>
            <div className="acc-order-product-item-content-title">
              <div className="acc-order-product-item-content-title-name">
                {line.product.name}
              </div>
              <div className="acc-order-product-item-content-title-weight">
                {line.product.weight} {line.product.measurementUnit}
              </div>
            </div>
          </div>
          <div className="acc-order-product-money">
            <div className="acc-order-product-quantity">
              {line.quantity} шт x {line.product.price} ₴
            </div>
            <div className="acc-order-product-price">
              <div>{line.totalLinePrice}</div>
              <div className="acc-order-product-price-currency">грн</div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  });
  const productPrices: ReactNode[] = [];
  userOrder.orderLines.forEach((line) => {
    productPrices.push(
      <div key={line.product.id} className="acc-order-price-info">
        <div style={{ marginRight: 20 }}>{line.product.name} </div>
        <div>
          {line.quantity} шт x {line.product.price} грн:
        </div>
        <div className="acc-order-price-info-number">
          <div id="total">{line.totalLinePrice}</div>
          <div>&nbsp;грн</div>
        </div>
      </div>
    );
  });
  let statusColor;
  switch (userOrder.status) {
    case COMPLETED_ORDER_STATUS:
      statusColor = "green";
      break;
    case BEINGPROCESSED_ORDER_STATUS:
      statusColor = "#e2520d";
      break;
    case CANCELLED_ORDER_STATUS:
      statusColor = "red";
      break;
    default:
      statusColor = "black";
      break;
  }

  const monthNames = [
    "Січня",
    "Лютого",
    "Березня",
    "Квітня",
    "Травня",
    "Червня",
    "Липня",
    "Серпня",
    "Вересня",
    "Жовтня",
    "Листопада",
    "Грудня",
  ];

  const orderDeliveryAddress =
    userOrder.deliveryAddress !== null ? (
      <>
        <div className="acc-order-address-heading">Адреса доставки</div>
        <div className="acc-order-address-info">
          {userOrder.deliveryAddress}
        </div>
      </>
    ) : null;

  const orderShopAddress =
    shop !== null ? (
      <>
        <div className="acc-order-address-heading">
          Адреса закладу отримання
        </div>
        <div className="acc-order-address-info">
          {`${shop.street} ${shop.building}`}
        </div>
      </>
    ) : null;

  const dateAndTime = userOrder.creationDate.split("T");
  const date = dateAndTime[0].split("-");
  const day = date[2];
  const month = date[1];
  const year = date[0];

  const expandedContent = expanded ? (
    <div className="acc-order-details">
      {orderLines}
      <div className="acc-order-info">
        <div className="acc-order-delivery-info">
          <div className="acc-order-recipient">
            <div className="acc-order-recipient-heading">Отримувач</div>
            <div className="acc-order-recipient-info">
              <div className="recipient-detail">{userOrder.customerName}</div>
              <div className="recipient-detail">{userOrder.phoneNumber}</div>
              <div className="recipient-detail">{userOrder.email}</div>
            </div>
          </div>
          <div className="acc-order-address">{orderDeliveryAddress}</div>
          <div className="acc-order-address">{orderShopAddress}</div>
        </div>
        <div className="acc-order-price">
          <div style={{ marginBottom: 10 }} className="acc-order-price-heading">
            Вартість
          </div>
          <div style={{ fontWeight: 500 }} className="acc-order-price-info">
            <div>Всього:</div>
            <div className="acc-order-price-info-number">
              <div id="total">{userOrder.totalOrderPrice}</div>
              <div>&nbsp;грн</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
  return (
    <div className="acc-order">
      <div
        onClick={() => {
          setExpanded(!expanded);
        }}
        className="acc-order-heading"
      >
        <div className="acc-order-heading-info">
          <div className="acc-order-number-and-date">
            <span className="acc-order-number">№{userOrder.id}</span>
            <span className="acc-order-date">
              від {day} {monthNames[parseInt(month) - 1]} {year}
            </span>
          </div>
          <div style={{ color: statusColor }} className="acc-order-status">
            {userOrder.status}
          </div>
        </div>
        <img
          className="acc-order-expand-arrow"
          src={
            expanded
              ? "/src/assets/profile/arrow-up.svg"
              : "/src/assets/profile/arrow-down.svg"
          }
        />
      </div>
      {expandedContent}
    </div>
  );
}
