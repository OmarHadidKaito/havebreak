// app/api/products/route.ts
import { NextResponse } from 'next/server';

import dbConnect from 'src/lib/mongodb';
import Product from 'src/app/models/product';

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}
