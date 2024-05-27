import { ReactNode } from "react";
import { OrderProp } from "../../helpers/Interfaces";
import OrderHistoryItem from "./OrderHistoryItem";

interface Props {
  userOrders: OrderProp[];
}

export default function OrderHistoryContainer({ userOrders }: Readonly<Props>) {
  const orderHistoryItems: ReactNode[] = [];
  userOrders.forEach((order) => {
    orderHistoryItems.push(
      <OrderHistoryItem
        key={order.id}
        userOrder={order}
        orderQuantity={userOrders.length}
      />
    );
  });
  return <div className="acc-orders-content">{orderHistoryItems}</div>;
}
