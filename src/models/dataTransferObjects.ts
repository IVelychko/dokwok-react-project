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

export interface ProductCategory {
  id: number;
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

export interface OrderLine {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  totalLinePrice: number;
  product: Product;
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
  roles: string[];
}

export interface AuthData {
  user: AuthorizedUser;
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
