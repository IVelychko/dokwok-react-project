import { ReactNode } from "react";
import { OrderProp, ShopProp } from "../../helpers/Interfaces";
import OrderHistoryItem from "./OrderHistoryItem";

interface Props {
  userOrders: OrderProp[];
  shops: ShopProp[];
}

export default function OrderHistoryContainer({
  userOrders,
  shops,
}: Readonly<Props>) {
  const orderHistoryItems: ReactNode[] = [];
  userOrders.forEach((order) => {
    let shop: ShopProp | null = null;
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
