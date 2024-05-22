import { ProductDataProp } from "../../helpers/Interfaces";
import { useLoaderData } from "react-router-dom";
import { addItemToCart } from "../../functions/cartFunctions";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import GridItemContainer from "./GridItemContainer";

interface Props {
  heading: string;
}

export default function Menu({ heading }: Readonly<Props>) {
  const productData: ProductDataProp[] = useLoaderData() as ProductDataProp[];
  const contextState: ContextStateType = useMyContext();
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

  return (
    <main>
      {contentHeading ? <div className="heading">{heading}</div> : null}
      <GridItemContainer products={productData} onAddToCart={handleAddToCart} />
    </main>
  );
}
