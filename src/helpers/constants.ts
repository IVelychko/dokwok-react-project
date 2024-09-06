export const BASE_API_URL = "https://localhost:5500/api";

export const COMPLETED_ORDER_STATUS = "Виконано";

export const BEINGPROCESSED_ORDER_STATUS = "Виконується";

export const CANCELLED_ORDER_STATUS = "Скасовано";

export const RegularExpressions = {
  FirstName: /^[A-Za-zÀ-ÖØ-öø-ÿА-Яа-яЁёІіЇїЄєҐґ]+$/,
  PhoneNumber: /^(?:\+38)?(0\d{9})$/,
  Address: /^[a-zA-Zа-яА-ЯёЁіїІЇєЄґҐ0-9.,\-()№\s]+$/,
  PaymentType: /^(cash|card)$/,
  Guid: /^[{(]?[0-9A-Fa-f]{8}[-]?[0-9A-Fa-f]{4}[-]?[0-9A-Fa-f]{4}[-]?[0-9A-Fa-f]{4}[-]?[0-9A-Fa-f]{12}[)}]?$/,
  OrderStatus: new RegExp(
    `^(${BEINGPROCESSED_ORDER_STATUS}|${COMPLETED_ORDER_STATUS}|${CANCELLED_ORDER_STATUS})$`
  ),
  RegularString:
    /^[a-zA-Zа-яА-ЯёЁіїєґІЇЄҐ0-9\s.,!?""'@#%&*()\-_=+;:/\\[\]`~]*$/,
  Password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]{6,}$/,
  UserName: /^[a-zA-Z0-9_-]{5,}$/,
  Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  Street: /^[a-zA-Zа-яА-ЯёЁіїІЇєЄґҐ\s\-'`".]+$/,
  Building: /^[0-9a-zA-Zа-яА-ЯёЁіїІЇєЄґҐ\s\-\/]+$/,
  Hour: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
};

export const Categories = {
  roll: 1,
  pizza: 2,
  foodSet: 3,
  noodles: 4,
  coldBeverage: 5,
};

export const ErrorMessages = {
  serverSideError: "A server-side error has occured",
  errorNeverReached: "The request has never reached the server",
  nonAxiosRelatedError: "A non-axios related error has occured",
};

export const Roles = {
  admin: "Admin",
  customer: "Customer",
};

export const AccessTokenKey = "accessToken";

export const ShoppingCartKey = "shoppingCart";

export const UserIdKey = "userId";
