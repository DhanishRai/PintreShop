import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/products.json');

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  affiliateLink: string;
  aspectRatio?: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving products:', error);
  }
}
