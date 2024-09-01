import { AuthorizedUser, Cart, Shop } from "../models/dataTransferObjects";

export interface RootLoaderData {
  cart: Cart;
  user: AuthorizedUser | null;
  shops: Shop[];
}

export interface ErrorInput {
  styles: React.CSSProperties;
  message: string;
}
