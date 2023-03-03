import useWindowSize from '@/hooks/useWindowSize';
import { getMenuStateFromStore, getTokenFromStore } from '@/utils/localStorage';
import React from 'react';
import { Overlay } from 'react-bootstrap';
import Sidebar from './Sidebar';
import TopTitle from './TopTitle';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { useRouter } from 'next/router';
import NoContent from './NoContent';
import HighrachyLogo from '../utils/HighrachyLogo';

const Backend = ({ children, title }) => {
  const { width } = useWindowSize();
  const isDesktop = width > 991;

  const menuState = getMenuStateFromStore();

  const [isFolded, setIsFolded] = React.useState(true);

  const { checkLogin, doLogout } = useContext(UserContext);
  const router = useRouter();
  const token = getTokenFromStore();

  React.useEffect(() => {
    async function confirmPreviousLogin() {
      const response = await checkLogin();
      if (response.status !== 200) {
        router.push('/admin');
      }
    }
    if (!token) {
      doLogout();
      router.push('/admin');
    } else {
      confirmPreviousLogin();
    }
  }, [checkLogin, doLogout, token, router]);

  React.useEffect(() => {
    isDesktop && setIsFolded(menuState);
  }, [menuState, isDesktop]);

  return (
    <section className="admin-container">
      {!isDesktop && !isFolded && <Overlay />}
      <Sidebar
        isFolded={isFolded}
        setIsFolded={setIsFolded}
        isDesktop={isDesktop}
      />
      <div
        className={`content-wrapper px-3 px-md-6 py-md-5 py-2 min-vh-100 bg-light ${
          isFolded ? 'content-folded' : ''
        }`}
      >
        {!isDesktop && (
          <div className="d-flex d-md-none justify-content-between pb-2 border-bottom mt-3 mb-4">
            <HighrachyLogo />
            <div
              className="btn-link icon-md2"
              onClick={() => setIsFolded(!isFolded)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
              </svg>
            </div>
          </div>
        )}
        {!token ? (
          // <NoContent text="Loading..." />
          <></>
        ) : (
          <>
            {title && <TopTitle>{title}</TopTitle>}
            {children}
          </>
        )}
      </div>
    </section>
  );
};

export default Backend;
