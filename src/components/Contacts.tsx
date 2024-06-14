export default function Contacts() {
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
          <div>09:00 - 21:00</div>
        </div>
      </div>
    </main>
  );
}
