import axios from 'axios';
import cookie from 'cookie';

const callback = async (req, res) => {
  const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 1, // 1 day
    sameSite: 'strict',
    path: '/',
  };
  if (req.method === 'GET') {
    const { token } = cookie.parse(req.headers.cookie);
    if (!token) {
      return res.status(403).json({ message: 'not authorized' });
    }
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        res.status(200).json({
          user: response.data.username,
          email: response.data.email,
          id: response.data.id,
        });
      })
      .catch((error) => {
        res.status(403).json({ message: 'not authorized', error });
      });
  }

  if (req.method === 'POST') {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?access_token=${req.body.access_token}`
      )
      .then((response) => {
        const jwt = response.data.jwt;
        const id = response.data.user.id;
        res.setHeader('Set-Cookie', [
          cookie.serialize('token', jwt, cookieConfig),
          cookie.serialize('userid', id, cookieConfig),
        ]);
        return res
          .status(200)
          .json({ message: response.data.user, token: jwt });
      })
      .catch((error) => {
        res
          .status(405)
          .json({ message: 'already registered with another provider', error });
      });
  }
};

export default callback;
