import { useLoaderData } from "react-router-dom";
import { OrderProp } from "../../helpers/Interfaces";
import OrderHistoryContainer from "./OrderHistoryContainer";

export default function OrderHistory() {
  const userOrders: OrderProp[] = useLoaderData() as OrderProp[];

  return (
    <div className="account-orders">
      <div className="account-heading">Історія замовлень</div>
      <OrderHistoryContainer userOrders={userOrders} />
    </div>
  );
}
