import { ReactNode, useState } from "react";
import { OrderProp } from "../../helpers/Interfaces";
import {
  BEINGPROCESSED_ORDER_STATUS,
  CANCELLED_ORDER_STATUS,
  COMPLETED_ORDER_STATUS,
} from "../../helpers/constants";

interface Props {
  userOrder: OrderProp;
  orderQuantity: number;
}

export default function OrderHistoryItem({ userOrder, orderQuantity }: Props) {
  const defaultExpanded = orderQuantity === 1 ? true : false;
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const orderLines: ReactNode[] = [];
  userOrder.orderLines.forEach((line) => {
    orderLines.push(
      <div key={line.product.id} className="acc-order-content">
        <div className="acc-order-product-info">
          <div className="acc-order-product-item-content-img">
            <img
              alt="product"
              src="/src/assets/item-images/3-drakona-600x400.png"
            />
          </div>
          <div className="acc-order-product-item-content-title">
            <div className="acc-order-product-item-content-title-name">
              {line.product.name}
            </div>
            <div className="acc-order-product-item-content-title-weight">0</div>
          </div>
        </div>
        <div className="acc-order-product-money">
          <div
            style={{
              marginRight: 0,
              marginLeft: "auto",
              fontWeight: 500,
              color: "#a6a6a6",
            }}
            className="acc-order-product-quantity"
          >
            {line.quantity} шт
          </div>
          <div className="acc-order-product-price">
            <div>{line.totalLinePrice}</div>
            <div className="acc-order-product-price-currency">грн</div>
          </div>
        </div>
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
          <div className="acc-order-address">
            <div className="acc-order-address-heading">Адреса доставки</div>
            <div className="acc-order-address-info">
              {userOrder.deliveryAddress}
            </div>
          </div>
        </div>
        <div className="acc-order-price">
          <div style={{ marginBottom: 10 }} className="acc-order-price-heading">
            Вартість
          </div>
          {productPrices}
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
        <div className="acc-order-number">Замовлення №{userOrder.id}</div>
        <div style={{ color: statusColor }} className="acc-order-status">
          {userOrder.status}
        </div>
      </div>
      {expandedContent}
    </div>
  );
}
