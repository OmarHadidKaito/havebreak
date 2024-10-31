// app/api/auth/login/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from 'src/app/models/user';
import dbConnect from 'src/lib/mongodb';

export async function POST(req: any) {
  await dbConnect();

  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user)
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });

  // @ts-ignore
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '99h' });
  return new Response(JSON.stringify({ token }), { status: 200 });
}
