import { ShoppingCartKey } from "../helpers/constants";
import { Cart, CartLine, Product } from "../models/dataTransferObjects";
import { getProduct } from "./productRepository";

export function getCart(): Cart {
  const cart = localStorage.getItem(ShoppingCartKey);
  if (cart === null) {
    return {
      totalCartPrice: 0,
      lines: [],
    };
  }
  return JSON.parse(cart);
}

export async function addItemToCart(productId: number, quantity: number) {
  if (quantity <= 0) {
    throw new Error("The quantity must be greater than 0");
  }
  let product: Product;
  try {
    const response = await getProduct(productId);
    if (response === 404) {
      throw new Error("The product does not exist");
    }
    product = response;
  } catch (error) {
    throw new Error("An error occured while getting the product data");
  }
  const cart: Cart = getCart();
  const cartLine: CartLine | undefined = cart.lines.find(
    (cl) => cl.product.id === productId
  );
  if (!cartLine) {
    cart.lines.push({
      product: product,
      quantity: quantity,
      totalLinePrice: product.price * quantity,
    });
  } else {
    cartLine.quantity += quantity;
    cartLine.totalLinePrice = product.price * cartLine.quantity;
  }

  let cartPrice: number = 0;
  cart.lines.forEach((cl) => (cartPrice += cl.totalLinePrice));
  cart.totalCartPrice = cartPrice;
  localStorage.setItem(ShoppingCartKey, JSON.stringify(cart));
  return cart;
}

export async function removeItemFromCart(productId: number, quantity: number) {
  if (quantity <= 0) {
    throw new Error("The quantity must be greater than 0");
  }
  let product: Product;
  try {
    const response = await getProduct(productId);
    if (response === 404) {
      throw new Error("The product does not exist");
    }
    product = response;
  } catch (error) {
    throw new Error("An error occured while getting the product data");
  }
  const cartJson: string | null = localStorage.getItem(ShoppingCartKey);
  if (cartJson === null) {
    throw new Error("There is no cart in storage to modify");
  }
  const cart: Cart = JSON.parse(cartJson);
  const cartLine: CartLine | undefined = cart.lines.find(
    (cl) => cl.product.id === productId
  );
  if (!cartLine) {
    throw new Error("There is no cart line to modify");
  }
  cartLine.quantity -= quantity;
  cartLine.quantity = cartLine.quantity <= 0 ? 1 : cartLine.quantity;
  cartLine.totalLinePrice = product.price * cartLine.quantity;

  let cartPrice: number = 0;
  cart.lines.forEach((cl) => (cartPrice += cl.totalLinePrice));
  cart.totalCartPrice = cartPrice;
  localStorage.setItem(ShoppingCartKey, JSON.stringify(cart));
  return cart;
}

export async function removeLineFromCart(productId: number) {
  try {
    const response = await getProduct(productId);
    if (response === 404) {
      throw new Error("The product does not exist");
    }
  } catch (error) {
    throw new Error("An error occured while getting the product data");
  }
  const cartJson: string | null = localStorage.getItem(ShoppingCartKey);
  if (cartJson === null) {
    throw new Error("There is no cart in storage to modify");
  }
  const cart: Cart = JSON.parse(cartJson);
  const updatedCartLines: CartLine[] = cart.lines.filter(
    (cl) => cl.product.id !== productId
  );
  cart.lines = updatedCartLines;

  if (cart.lines.length > 0) {
    let cartPrice: number = 0;
    cart.lines.forEach((cl) => (cartPrice += cl.totalLinePrice));
    cart.totalCartPrice = cartPrice;
    localStorage.setItem(ShoppingCartKey, JSON.stringify(cart));
    return cart;
  } else {
    cart.totalCartPrice = 0;
    localStorage.removeItem(ShoppingCartKey);
    return cart;
  }
}

export function clearCart() {
  localStorage.removeItem(ShoppingCartKey);
}
