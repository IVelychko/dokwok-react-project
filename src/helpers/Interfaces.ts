export interface ProductDataProp {
  id: number;
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

export interface ProductPostData {
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
}

export interface ProductPutData {
  id: number;
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
}

export interface ProductCategoryDataProp {
  id: number;
  name: string;
}

export interface ProductCategoryPostData {
  name: string;
}

export interface CartProp {
  lines: CartLineProp[];
  totalCartPrice: number;
}

export interface CartLineProp {
  product: ProductDataProp;
  quantity: number;
  totalLinePrice: number;
}

export interface DeliveryOrderFormProp {
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  paymentType: string;
  userId: string | null;
}

export interface TakeawayOrderFormProp {
  customerName: string;
  phoneNumber: string;
  email: string;
  paymentType: string;
  userId: string | null;
  shopId: number;
}

export interface OrderLineProp {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  totalLinePrice: number;
  product: ProductDataProp;
}

export interface OrderLinePostProp {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface OrderLinePutProp {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

export interface OrderProp {
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
  orderLines: OrderLineProp[];
}

export interface OrderPutProp {
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

export interface LoginUserProp {
  userName: string;
  password: string;
}

export interface RegisterUserProp {
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthUserProp {
  id: string;
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

export interface UserPasswordChangeProp {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface UserPasswordChangeAsAdminProp {
  userId: string;
  newPassword: string;
}

export interface RootLoaderData {
  cart: CartProp;
  user: AuthUserProp | null;
  shops: ShopProp[];
}

export interface ErrorInputProp {
  styles: React.CSSProperties;
  message: string;
}

export interface CheckIfTaken {
  isTaken: boolean;
}

export interface ShopProp {
  id: number;
  street: string;
  building: string;
  openingTime: string;
  closingTime: string;
}

export interface ShopPostProp {
  street: string;
  building: string;
  openingTime: string;
  closingTime: string;
}
