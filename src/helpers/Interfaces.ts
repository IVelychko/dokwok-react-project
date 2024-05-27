export interface ProductDataProp {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  categoryName: string;
}

export interface ProductCategoryDataProp {
  id: number;
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

export interface OrderFormProp {
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  paymentType: string;
  userId: string | null;
}

export interface OrderLineProp {
  quantity: number;
  totalLinePrice: number;
  product: ProductDataProp;
}

export interface OrderProp {
  id: number;
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  paymentType: string;
  totalOrderPrice: number;
  CreationDate: string;
  status: string;
  userId: string | null;
  orderLines: OrderLineProp[];
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

export interface RootLoaderData {
  cart: CartProp;
  user: AuthUserProp | null;
}
