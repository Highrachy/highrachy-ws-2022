import { storeToken } from '@/utils/localStorage';
import axios from 'axios';
import { useState, createContext } from 'react';
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  async function checkLogin() {
    try {
      const resp = await axios.get(`/api/auth/callback/google`);
      setUser(resp.data.user);
      setEmail(resp.data.email);
      setId(resp.data.id);
      return resp;
    } catch (error) {
      clearToken();
      return error.response;
    }
  }

  const doLogout = async () => {
    const resp = await axios.post(`/api/auth/logout`, {
      method: 'POST',
    });
    if (resp.data.message == 'success') {
      clearToken();
    }
  };

  async function doGoogleCallback(values) {
    try {
      const resp = await axios.post(`/api/auth/callback/google`, values);
      storeToken(resp?.data?.token || null);
      return ['OK', resp.data.message];
    } catch (error) {
      clearToken();
      return ['error', error?.response?.data?.message || error];
    }
  }

  function clearToken() {
    storeToken(null);
    setUser('');
    setEmail('');
    setId('');
  }

  const useract = {
    user: user,
    setUser: setUser,
    checkLogin: checkLogin,
    doGoogleCallback: doGoogleCallback,
    doLogout: doLogout,
  };

  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
