export interface Ad {
  id: string;
  brand: string;
  brandLogo: string;
  thumbnail: string;
  dataAiHint: string;
  title: string;
  description: string;
  category: string;
  viewedDate: string;
}

export interface Product extends Ad {
  price: number;
  commissionRate: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AdRating = {
  [adId: string]: 'like' | 'dislike';
};
