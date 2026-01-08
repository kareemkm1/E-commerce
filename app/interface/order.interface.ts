export interface IOrder {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  paidAt: string
  createdAt: string
  updatedAt: string
  id: number
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface CartItem {
  count: number
  _id: string
  product: OrderProduct
  price: number
}

export interface OrderProduct {
  _id: string
  title: string
  imageCover: string
  category: {
    _id: string
    name: string
  }
  brand: {
    _id: string
    name: string
  }
  ratingsAverage: number
  id: string
}
