export interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

export interface ProductPost {
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
}

export interface ProductPut {
  id: number;
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface ProductCategoryPost {
  name: string;
}

export interface Cart {
  lines: CartLine[];
  totalCartPrice: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  totalLinePrice: number;
}

export interface DeliveryOrderForm {
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  paymentType: string;
  userId: string | null;
}

export interface TakeawayOrderForm {
  customerName: string;
  phoneNumber: string;
  email: string;
  paymentType: string;
  userId: string | null;
  shopId: number;
}

export interface OrderLine {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  totalLinePrice: number;
  product: Product;
}

export interface OrderLinePost {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface OrderLinePut {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string | null;
  paymentType: string;
  totalOrderPrice: number;
  creationDate: string;
  status: string;
  userId: string | null;
  shopId: number | null;
  orderLines: OrderLine[];
}

export interface OrderPut {
  id: number;
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string | null;
  paymentType: string;
  totalOrderPrice: number;
  creationDate: string;
  status: string;
  userId: string | null;
  shopId: number | null;
}

export interface LoginUser {
  userName: string;
  password: string;
}

export interface RegisterUser {
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

export interface AuthorizedUser {
  id: string;
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  token: string;
  refreshToken: string;
}

export interface RefreshToken {
  token: string;
  refreshToken: string;
}

export interface UserPasswordChange {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface UserPasswordChangeAsAdmin {
  userId: string;
  newPassword: string;
}

export interface RootLoaderData {
  cart: Cart;
  user: AuthorizedUser | null;
  shops: Shop[];
}

export interface ErrorInput {
  styles: React.CSSProperties;
  message: string;
}

export interface CheckIfTaken {
  isTaken: boolean;
}

export interface Shop {
  id: number;
  street: string;
  building: string;
  openingTime: string;
  closingTime: string;
}

export interface ShopPost {
  street: string;
  building: string;
  openingTime: string;
  closingTime: string;
}
