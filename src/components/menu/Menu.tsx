import { Product } from "../../models/dataTransferObjects";
import { Link, useLoaderData } from "react-router-dom";
import { addItemToCart } from "../../repositories/cartManagement";
import GridItemContainer from "./GridItemContainer";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import useRootContext from "../../hooks/useRootContext";

interface Props {
  heading: string;
}

export default function Menu({ heading }: Readonly<Props>) {
  const productData: Product[] = useLoaderData() as Product[];
  const { cart, setCart } = useRootContext();
  const [cartSize, setCartSize] = useState<number>();

  useEffect(() => {
    let cartSizeTemp: number = 0;
    cart.lines.forEach((cartLine) => (cartSizeTemp += cartLine.quantity));
    setCartSize(cartSizeTemp);
    console.log("Menu effect was called");
  }, [cart.lines]);

  const handleAddToCart = (productId: number, quantity: number) => {
    addItemToCart(productId, quantity)
      .then((cart) => {
        setCart(cart);
        console.log("Item was added to the cart.");
      })
      .catch((error) => console.error(error));
  };

  let contentHeading;
  if (productData !== null && productData.length > 0) {
    contentHeading = heading;
  }

  const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: "#e2520d",
    },
  };

  return (
    <main>
      {contentHeading ? <div className="heading">{heading}</div> : null}
      <GridItemContainer products={productData} onAddToCart={handleAddToCart} />
      <Link
        className="menu-shopping-cart"
        to="/cart"
        title="До товарів в кошику"
      >
        <Badge sx={badgeStyle} color="primary" badgeContent={cartSize}>
          <div className="menu-shopping-cart-block">
            <img
              className="menu-shopping-cart-img"
              alt="shopping-cart"
              src="/src/assets/header/shopping-cart8.0.svg"
            />
          </div>
        </Badge>
      </Link>
    </main>
  );
}
