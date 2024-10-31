// app/api/products/route.js
import dbConnect from 'src/lib/mongodb';
import Product from 'src/app/models/product';

export async function POST(req: any) {
  await dbConnect();

  const { name, description, price, stock } = await req.json();

  if (!name || !price || stock == null) {
    return new Response(JSON.stringify({ message: 'Name, price, and stock are required' }), {
      status: 400,
    });
  }

  try {
    const newProduct = new Product({ name, description, price, stock });
    await newProduct.save();

    return new Response(
      JSON.stringify({ message: 'Product created successfully', product: newProduct }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating product' }), { status: 500 });
  }
}
