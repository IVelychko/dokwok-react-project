import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-wrapper">
      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          fontFamily: "Montserrat",
          fontWeight: 500,
          marginTop: 100,
        }}
      >
        Трапилась помилка
      </div>
      <Link style={{ marginTop: 20 }} to={"/"} className="go-home-button">
        На головну
      </Link>
    </div>
  );
}
