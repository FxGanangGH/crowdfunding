export interface Item {
  name: string
  price: number
  details: string
  stock: number
  amount: number
}

export interface Images {
  desktop: string
  mobile: string
}

export interface Product {
  name: string
  brief: string
  progress: number
  target: number
  backer: number
  duration: number
  description: string
  extra: string
  images: {
    desktop: string
    mobile: string
  }
}

export interface Data {
  product: Product
  items: Item[]
}
