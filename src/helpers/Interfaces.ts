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
