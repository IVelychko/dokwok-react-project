export interface AddProductRequest {
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
}

export interface UpdateProductRequest {
  id: number;
  name: string;
  price: number;
  weight: number;
  measurementUnit: string;
  description: string;
  categoryId: number;
}

export interface AddProductCategoryRequest {
  name: string;
}

export interface UpdateProductCategoryRequest {
  id: number;
  name: string;
}

export interface AddDeliveryOrderRequest {
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  paymentType: string;
  userId: number | null;
  orderLines: AddOrderLineWithOrderRequest[];
}

export interface AddTakeawayOrderRequest {
  customerName: string;
  phoneNumber: string;
  email: string;
  paymentType: string;
  userId: number | null;
  shopId: number;
  orderLines: AddOrderLineWithOrderRequest[];
}

export interface AddOrderLineRequest {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface AddOrderLineWithOrderRequest {
  productId: number;
  quantity: number;
}

export interface UpdateOrderLineRequest {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

export interface UpdateOrderRequest {
  id: number;
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string | null;
  paymentType: string;
  totalOrderPrice: number;
  creationDate: string;
  status: string;
  userId: number | null;
  shopId: number | null;
}

export interface LoginAdminRequest {
  userName: string;
  password: string;
}

export interface LoginCustomerRequest {
  userName: string;
  password: string;
}

export interface RegisterUserRequest {
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AddUserRequest {
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateUserRequest {
  id: number;
  firstName: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface UserPasswordChangeRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

export interface UserPasswordChangeAsAdminRequest {
  userId: number;
  newPassword: string;
}

export interface AddShopRequest {
  street: string;
  building: string;
  openingTime: string;
  closingTime: string;
}

export interface UpdateShopRequest {
  id: number;
  street: string;
  building: string;
  openingTime: string;
  closingTime: string;
}
