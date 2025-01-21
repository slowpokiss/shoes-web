export interface cardInterface {
  price: number;
  images: Array<string>;
  title: string;
  id?: number | undefined;
}

export interface categoryInterface {
  title: string;
  id: number;
}

export interface singleCardInterface {
  id: number;
  category: number;
  title: string;
  images: Array<string>;
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: {
    size: string;
    available: boolean;
  }[];
}

interface Size {
  available: boolean;
  size: string;
}

interface oneCardInterface {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  material: string;
  oldPrice: number;
  price: number;
  reason: string;
  season: string;
  sizes: Size[];
  color: string;
  heelSize: string;
}

interface category {
  id: number;
  category: number;
  title: string;
  images: string[];
  price: number;
}

interface catalogInterface {
  id: number;
  title: string;
}

export interface loaderDataInterface {
  catalog?: catalogInterface[],
  category?: category;
  oneCard?: oneCardInterface;
  sales?: category
}
