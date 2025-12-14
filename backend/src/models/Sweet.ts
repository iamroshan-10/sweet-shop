export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSweetDto {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image_url?: string;
}

export interface UpdateSweetDto {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  description?: string;
  image_url?: string;
}

export interface SearchQuery {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

