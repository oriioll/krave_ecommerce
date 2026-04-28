export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  main_image?: string | null;
  hover_image?: string | null;
  about_image?: string | null;
  info_image?: string | null;
  weight?: number | null;
  slug?: string;
}
