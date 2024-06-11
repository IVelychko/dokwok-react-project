import { Link } from "react-router-dom";
import { CartProp } from "../helpers/Interfaces";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface Props {
  cartProp: CartProp;
}

export default function Header({ cartProp }: Readonly<Props>) {
  const [cartSize, setCartSize] = useState<number>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    let cartSizeTemp: number = 0;
    cartProp.lines.forEach((cartLine) => (cartSizeTemp += cartLine.quantity));
    setCartSize(cartSizeTemp);
    console.log("Header effect was called");
  }, [cartProp.lines]);

  const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: "#e2520d",
    },
  };

  const toggleDrawer = (isOpen: boolean) => () => {
    setIsDrawerOpen(isOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          "Головна",
          "Сети",
          "Локшина",
          "Роли",
          "Прохолодні напої",
          "Кошик",
        ].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <header>
      <div className="header-logo">
        <Link to="/" title="На головну">
          <img alt="logo" src="/src/assets/header/dokwok-logo.png" />
        </Link>
      </div>
      <nav>
        <Link to="food-set">Сети</Link>
        <Link to="noodles">Локшина</Link>
        <Link to="roll">Роли</Link>
        <Link to="cold-beverage">Прохолодні напої</Link>
      </nav>
      <Link className="account-icon" to="/account" title="До вашого акаунту">
        <img
          className="account-icon-img"
          alt="account"
          src="/src/assets/header/user.png"
        />
      </Link>
      <Link className="shopping-cart" to="cart" title="До товарів в кошику">
        <Badge sx={badgeStyle} color="primary" badgeContent={cartSize}>
          <img
            className="shopping-cart-img"
            alt="shopping-cart"
            src="/src/assets/header/empty-cart3.0.png"
          />
        </Badge>
      </Link>
      <button onClick={toggleDrawer(true)}>Toggle drawer</button>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
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
    </header>
  );
}
