import { Link, useNavigate } from "react-router-dom";
import { CartProp } from "../helpers/Interfaces";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
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
  isUserLoggedIn: boolean;
}

export default function Header({ cartProp, isUserLoggedIn }: Readonly<Props>) {
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

  const logInButtonStyle = {
    textTransform: "capitalize",
    color: "black",
    letterSpacing: -0.1,
    fontSize: 17,
    fontWeight: 500,
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "rgb(0 0 0 / 4%)",
    },
  };

  const drawerListStyle = {
    width: "100vw",
    "@media (min-width: 400px)": { width: 400 },
  };
  const listItemTextStyle = {
    fontSize: 18,
    color: "gray",
    fontFamily: "Montserrat",
    fontWeight: 400,
  };

  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/login");
  };

  const toggleDrawer = (isOpen: boolean) => () => {
    setIsDrawerOpen(isOpen);
  };

  const accountButton = isUserLoggedIn ? (
    <Link className="account-icon" to="/account" title="До вашого акаунту">
      <img
        className="account-icon-img"
        alt="account"
        src="/src/assets/header/user.png"
      />
    </Link>
  ) : (
    <div className="account-icon">
      <Button sx={logInButtonStyle} onClick={handleLogInClick} variant="text">
        Увійти
      </Button>
    </div>
  );

  const accountDrawerButton = isUserLoggedIn ? (
    <div style={{ marginBottom: 5, marginTop: 5 }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/account")}>
          <img
            className="drawer-icon"
            alt="account"
            src="/src/assets/header/user.png"
          />
          <ListItemText
            primary={"Профіль"}
            primaryTypographyProps={listItemTextStyle}
          />
        </ListItemButton>
      </ListItem>
    </div>
  ) : (
    <div style={{ marginBottom: 5, marginTop: 5 }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/login")}>
          <img
            className="drawer-icon"
            alt="account"
            src="/src/assets/header/user.png"
          />
          <ListItemText
            primary={"Увійти"}
            primaryTypographyProps={listItemTextStyle}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );

  const DrawerList = (
    <Box sx={drawerListStyle} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <div className="drawer-header-logo">
          <Link to={"/"}>
            <img alt="На головну" src="/src/assets/header/dokwok-logo.png" />
          </Link>
          <button className="drawer-close-button" onClick={toggleDrawer(false)}>
            <img src="/src/assets/header/close2.png" alt="Закрити" />
          </button>
        </div>
        <Divider />
        {accountDrawerButton}
        <Divider />
        {[
          {
            title: "Сети",
            link: "/food-set",
            image: "/src/assets/header/drawer/sushi-set.png",
          },
          {
            title: "Локшина",
            link: "/noodles",
            image: "/src/assets/header/drawer/noodles.png",
          },
          {
            title: "Роли",
            link: "/roll",
            image: "/src/assets/header/drawer/three-rolls.png",
          },
          {
            title: "Прохолодні напої",
            link: "/cold-beverage",
            image: "/src/assets/header/drawer/cold-beverage.png",
          },
        ].map((line) => (
          <div key={line.title} style={{ marginBottom: 5, marginTop: 5 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(line.link)}>
                <img className="drawer-icon" alt="account" src={line.image} />
                <ListItemText
                  primary={line.title}
                  primaryTypographyProps={listItemTextStyle}
                />
              </ListItemButton>
            </ListItem>
          </div>
        ))}
        <Divider />
      </List>
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
      {accountButton}
      <Link className="shopping-cart" to="cart" title="До товарів в кошику">
        <Badge sx={badgeStyle} color="primary" badgeContent={cartSize}>
          <img
            className="shopping-cart-img"
            alt="shopping-cart"
            src="/src/assets/header/shopping-cart8.0.svg"
          />
        </Badge>
      </Link>
      <button
        className="drawer-header-icon-button"
        onClick={toggleDrawer(true)}
      >
        <img
          alt="Відкрити меню навігації"
          className="drawer-header-icon-img"
          src="/src/assets/header/bars-solid.svg"
        />
      </button>

      <Drawer
        ModalProps={{ disableScrollLock: true }}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </header>
  );
}
