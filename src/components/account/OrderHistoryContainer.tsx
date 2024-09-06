import { ReactNode } from "react";
import { Order, Shop } from "../../models/dataTransferObjects";
import OrderHistoryItem from "./OrderHistoryItem";

interface Props {
  userOrders: Order[];
  shops: Shop[];
}

export default function OrderHistoryContainer({
  userOrders,
  shops,
}: Readonly<Props>) {
  const orderHistoryItems: ReactNode[] = [];
  userOrders.forEach((order) => {
    let shop: Shop | null = null;
    if (order.shopId !== null) {
      shop = shops.find((shop) => shop.id === order.shopId) ?? null;
    }
    orderHistoryItems.push(
      <OrderHistoryItem
        key={order.id}
        userOrder={order}
        orderQuantity={userOrders.length}
        shop={shop}
      />
    );
  });
  return <div className="acc-orders-content">{orderHistoryItems}</div>;
}
