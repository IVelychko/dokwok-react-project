import { Link } from "react-router-dom";
import { CartProp } from "../helpers/Interfaces";
import { useEffect, useState } from "react";

interface Props {
  cartProp: CartProp;
}

export default function Header({ cartProp }: Readonly<Props>) {
  const [cartSize, setCartSize] = useState<number>();

  useEffect(() => {
    let cartSizeTemp: number = 0;
    cartProp.lines.forEach((cartLine) => (cartSizeTemp += cartLine.quantity));
    setCartSize(cartSizeTemp);
    console.log("Header effect was called");
  }, [cartProp.lines]);

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/" title="На головну">
          <img alt="logo" src="/src/assets/header/header-wok-logo.png" />
        </Link>
      </div>
      <div className="nav-list">
        <Link to="food-set">Сети</Link>
        <Link to="noodles">Локшина</Link>
        <Link to="roll">Роли</Link>
        <Link to="cold-beverage">Прохолодні напої</Link>
      </div>
      <Link className="account-icon" to="/login" title="До вашого акаунту">
        <img
          className="account-icon-img"
          alt="account"
          src="/src/assets/header/user.png"
        />
      </Link>
      <Link className="shopping-cart" to="cart" title="До товарів в кошику">
        <img
          className="shopping-cart-img"
          alt="shopping-cart"
          src="/src/assets/header/shopping-cart2.0.png"
        />
      </Link>
      <div>{cartSize}</div>
      {/* hidden checkbox for hamburger menu */}
      <input type="checkbox" id="hamburger-input" className="burger-shower" />
      <label id="hamburger-menu" htmlFor="hamburger-input">
        <div id="sidebar-menu">
          <h3>Меню</h3>
          <Link to="/">Головна</Link>
          <Link to="food-set">Сети</Link>
          <Link to="noodles">Локшина</Link>
          <Link to="roll">Роли</Link>
          <Link to="cold-beverage">Прохолодні напої</Link>
          <Link to="cart">Кошик</Link>
        </div>
      </label>
    </div>
  );
}
