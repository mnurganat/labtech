import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

export type Locale = "ru" | "kz" | "en";

export interface FaqItem {
  q: Record<string, string>;
  a: Record<string, string>;
}

export interface Product {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  price?: number;
  currency?: string;
  imageUrl?: string;
  category?: string;
  isBestseller?: boolean;
  brand?: string;
  slug: string;
  specs?: Record<string, string[]>;
  bundle?: Record<string, string[]>;   // комплектация
  faq?: FaqItem[];                     // вопросы и ответы
  [key: string]: unknown;
}

export interface Category {
  id: string;
  name: Record<Locale, string>;
  imageUrl?: string;
  slug: string;
  order?: number;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  order?: number;
}

export async function getProducts(options?: {
  categorySlug?: string;
  bestsellersOnly?: boolean;
  maxItems?: number;
}): Promise<Product[]> {
  try {
    const col = collection(db, "products");
    const constraints: Parameters<typeof query>[1][] = [];

    if (options?.categorySlug) {
      constraints.push(where("category", "==", options.categorySlug));
    }
    if (options?.bestsellersOnly) {
      constraints.push(where("isBestseller", "==", true));
    }
    if (options?.maxItems) {
      constraints.push(limit(options.maxItems));
    }

    const q = constraints.length ? query(col, ...constraints) : col;
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const col = collection(db, "products");
    const q = query(col, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    return { id: d.id, ...d.data() } as Product;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const col = collection(db, "categories");
    const q = query(col, orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
  } catch {
    return [];
  }
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  max = 4
): Promise<Product[]> {
  try {
    const all = await getProducts({ categorySlug });
    return all.filter((p) => p.slug !== excludeSlug).slice(0, max);
  } catch {
    return [];
  }
}

// ─── Оснащение кабинетов ─────────────────────────────────────────────────────

export type OfficeItemCategory = "furniture" | "equipment" | "consumable" | "other";

export interface OfficeSupplier {
  name: string;                  // "SUNCAR Healthcare", "Zeta", "Lab Technology", …
  type: "internal" | "external"; // internal → наш каталог, external → сторонний сайт
  url?: string;                  // external website URL
  productSlug?: string;          // slug товара в нашем каталоге (если internal)
  price?: number;                // цена в KZT
  currency?: string;
}

export interface OfficeItem {
  id: string;
  name: Record<string, string>;
  model?: string;
  category: OfficeItemCategory;
  quantity: number;
  unit?: string;                 // "шт.", "комплект", "пара"
  suppliers: OfficeSupplier[];
}

export interface Office {
  id: string;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  sectionCategory: "ambulatory" | "inpatient" | "emergency" | "other";
  items: OfficeItem[];
  imageUrl?: string;
  iconKey?: string;
  order: number;
  totalEstimate?: number;        // примерная стоимость оснащения в KZT
}

export async function getOffices(): Promise<Office[]> {
  try {
    const col = collection(db, "offices");
    const q = query(col, orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Office));
  } catch {
    return [];
  }
}

export async function getOfficeBySlug(slug: string): Promise<Office | null> {
  try {
    const col = collection(db, "offices");
    const q = query(col, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    return { id: d.id, ...d.data() } as Office;
  } catch {
    return null;
  }
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const col = collection(db, "brands");
    const q = query(col, orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Brand));
  } catch {
    return [];
  }
}
