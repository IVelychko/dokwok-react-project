import { useLoaderData } from "react-router-dom";
import { Order } from "../../models/dataTransferObjects";
import OrderHistoryContainer from "./OrderHistoryContainer";
import useRootContext from "../../hooks/useRootContext";

export default function OrderHistory() {
  const { shops } = useRootContext();
  const userOrders: Order[] = useLoaderData() as Order[];
  if (userOrders.length < 1) {
    return (
      <div style={{ height: "auto" }} className="account-orders">
        <div className="account-heading">Історія замовлень</div>
        <div
          style={{
            textAlign: "center",
            fontSize: 26,
            fontFamily: "Montserrat",
            fontWeight: 500,
            marginTop: 160,
            marginBottom: 160,
          }}
        >
          Ви ще не створили жодного замовлення
        </div>
      </div>
    );
  }
  return (
    <div className="account-orders">
      <div className="account-heading">Історія замовлень</div>
      <OrderHistoryContainer
        userOrders={userOrders}
        shops={shops}
      />
    </div>
  );
}
