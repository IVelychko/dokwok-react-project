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
