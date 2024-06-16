import { ReactNode } from "react";
import { ContextStateType, useMyContext } from "../hooks/hooks";

export default function Contacts() {
  const contextState: ContextStateType = useMyContext();
  const shops: ReactNode[] = contextState.shopsProp.map((shop, index) => (
    <div
      key={shop.id}
      style={{
        borderBottom:
          index === contextState.shopsProp.length - 1
            ? "none"
            : "1px solid #e4e4e4",
      }}
      className="contact-shop"
    >
      <div className="contact-shop-address">
        {shop.street} {shop.building}
      </div>
      <div className="contact-shop-working-time">
        <div className="working-time-header">Час роботи</div>
        <div className="working-time">
          {shop.openingTime} - {shop.closingTime}
        </div>
      </div>
    </div>
  ));
  return (
    <main>
      <div className="heading">Контакти</div>
      <div className="contact-info">
        <div className="contact-number">
          <div style={{ fontWeight: 500 }}>Телефон адміністрації:</div>
          <div>073 56 71 381</div>
        </div>
        <div className="contact-email">
          <div style={{ fontWeight: 500 }}>Пошта адміністрації:</div>
          <div>admin@dokwok.com.ua</div>
        </div>
        <div className="contact-work-time">
          <div style={{ fontWeight: 500 }}>Час роботи</div>
          <div>09:00 - 22:00</div>
        </div>
      </div>
      <div className="contact-shops">
        <div className="contact-shops-header">Ресторани</div>
        {shops}
      </div>
    </main>
  );
}
