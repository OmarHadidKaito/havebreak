// app/api/auth/register/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from 'src/app/models/user';
import dbConnect from 'src/lib/mongodb';

const { JWT_SECRET } = process.env || '';

export async function POST(req: any) {
  await dbConnect();

  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '99h' });

    return new Response(JSON.stringify({ message: 'User created successfully', token }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating user' }), { status: 500 });
  }
}
