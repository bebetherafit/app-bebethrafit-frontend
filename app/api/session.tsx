import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { idToken } = req.body;

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5일
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict'
    };

    res.setHeader('Set-Cookie', `session=${sessionCookie}; ${Object.entries(options).map(([key, val]) => `${key}=${val}`).join('; ')}`);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  }
};

export default handler;
