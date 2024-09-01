import { useLoaderData } from "react-router-dom";
import { OrderProp } from "../../helpers/Interfaces";
import OrderHistoryContainer from "./OrderHistoryContainer";
import { ContextState, useMyContext } from "../../hooks/hooks";

export default function OrderHistory() {
  const contextState: ContextState = useMyContext();
  const userOrders: OrderProp[] = useLoaderData() as OrderProp[];
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
        shops={contextState.shopsProp}
      />
    </div>
  );
}
