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
      return error.response;
    }
  }

  const doLogout = async () => {
    const resp = await axios.post(`/api/auth/logout`, {
      method: 'POST',
    });
    if (resp.data.message == 'success') {
      storeToken(null);
      setUser('');
      setEmail('');
      setId('');
    }
  };

  async function doGoogleCallback(values) {
    try {
      const resp = await axios.post(`/api/auth/callback/google`, values);
      storeToken(resp?.data?.token || null);
      return ['OK', resp.data.message];
    } catch (error) {
      return ['error', error?.response?.data?.message || error];
    }
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
