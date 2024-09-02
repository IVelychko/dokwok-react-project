import { ProductDataProp } from "../../helpers/Interfaces";
import { Link, useLoaderData } from "react-router-dom";
import { addItemToCart } from "../../repositories/cartManagement";
import { ContextState, useMyContext } from "../../hooks/hooks";
import GridItemContainer from "./GridItemContainer";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";

interface Props {
  heading: string;
}

export default function Menu({ heading }: Readonly<Props>) {
  const productData: ProductDataProp[] = useLoaderData() as ProductDataProp[];
  const contextState: ContextState = useMyContext();
  const cart = contextState.cartProp;
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
        contextState.setCartProp(cart);
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
