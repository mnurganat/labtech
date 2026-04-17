export interface Category {
  id: string;
  parent_id: string | null;
  slug: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  name?: string;
  description?: string;
  children?: Category[];
}

export interface Product {
  id: string;
  category_id: string;
  slug: string;
  price: string;
  images: string[];
  specs: Spec[];
  features: Feature[];
  is_featured: boolean;
  is_active: boolean;
  hits: number;
  created_at: string;
  name?: string;
  description?: string;
  category?: Category;
}

export interface Spec {
  key: string;
  value: string;
}

export interface Feature {
  title: string;
  text: string;
}

export interface Lead {
  id: string;
  product_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface Translation {
  id: string;
  entity_type: "category" | "product" | "page";
  entity_id: string;
  locale: string;
  field: string;
  value: string;
}

export interface SeoMeta {
  id: string;
  entity_type: string;
  entity_id: string;
  locale: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
}

export interface Page {
  id: string;
  slug: string;
  template: string;
  is_active: boolean;
  created_at: string;
  content?: string;
}

export type Locale = "ru" | "kz" | "en";
