import Overlay from '@/components/common/Overlay';
import GoogleLogin from '@/components/utils/GoogleLogin';
import Image from 'next/image';
import React from 'react';

import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../context/user';
import HighrachyLogo from '@/components/utils/HighrachyLogo';

const Login = () => {
  const [error, setError] = useState();
  const router = useRouter();
  const { checkLogin, doGoogleCallback, user, setUser } =
    useContext(UserContext);

  useEffect(() => {
    async function confirmPreviousLogin() {
      await checkLogin();
    }
    confirmPreviousLogin();
  }, [checkLogin]);

  useEffect(() => {
    async function confirmGoogleLogin() {
      if (router.query.access_token) {
        const res = await doGoogleCallback({
          access_token: router.query.access_token,
        });
        if (res[0] === 'error') {
          setError(res[1]);
        }
        setUser(res[1].username);
      }
    }
    confirmGoogleLogin();
  }, [router, doGoogleCallback, setUser]);

  if (user) {
    router.push('/admin/dashboard');
  }

  return (
    <div className="auth-fluid">
      {error && <p className="text-danger">{JSON.stringify(error)}</p>}
      <div className="auth-fluid-form-box">
        <div className="align-items-center d-flex h-100">
          <div className="card-body text-center">
            {/* Logo */}
            <div className="auth-brand text-center mb-3">
              <HighrachyLogo />
            </div>
            <h2 className="mb-5">Admin Panel</h2>
            <GoogleLogin />
          </div>
          {/* end .card-body */}
        </div>
      </div>
      <div className="auth-fluid-right text-center">
        <Overlay />
      </div>
    </div>
  );
};

export default Login;
