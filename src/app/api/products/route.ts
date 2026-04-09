import { NextResponse } from 'next/server';
import { getProducts, saveProducts, Product } from '@/lib/storage';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const products = await getProducts();
    
    const newProduct: Product = {
      ...body,
      id: Math.random().toString(36).substring(2, 11),
      aspectRatio: body.aspectRatio || "1.0"
    };
    
    products.push(newProduct);
    await saveProducts(products);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
