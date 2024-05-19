import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <Link to="/" title="На головну">
          <img alt="logo" src="/src/assets/header/header-wok-logo.png" />
        </Link>
        <div>@ 2024 DOKWOK</div>
      </div>
      <div className="footer-info">
        <div className="footer-phones">
          <div>093 12 34 567</div>
          <div>095 12 34 567</div>
          <div>096 12 34 567</div>
        </div>
        <div className="footer-links">
          <a href="contacts">Контакти</a>
          <a href="aboutus">Про нас</a>
        </div>
      </div>
      <div className="footer-partners">
        <div>Партнери</div>
        <div className="footer-partners-img">
          <img alt="partners" src="/src/assets/footer/Partners.png" />
        </div>
      </div>
    </div>
  );
}
